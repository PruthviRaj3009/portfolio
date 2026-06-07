# Connecting this React UI to your Backend — A Hands-On Guide

This portfolio is **already a React app** (Vite + React 18 + TypeScript + Tailwind v4 + shadcn/ui + Framer Motion). You don't need to "convert" anything. What you need is to **connect it to a backend** so that:

1. The **Contact form** actually sends messages to your server (instead of faking it).
2. Sections like **Projects / Experience / Skills** can load their data from an API instead of being hard-coded.

This guide teaches you the *concepts* and gives you *copy-paste-ready code* for this exact project. Examples use **Django REST Framework (DRF)** as the backend (your project mentions Django a lot), but every frontend pattern works with **any** backend — Node/Express, FastAPI, Spring, PHP, etc. Only the URLs and the server code change.

---

## Table of Contents

1. [Mental model: how a React frontend talks to a backend](#1-mental-model)
2. [The request lifecycle, end to end](#2-request-lifecycle)
3. [Project setup: env variables + a reusable API client](#3-project-setup)
4. [CORS — the #1 thing that will block you](#4-cors)
5. [Wiring the Contact form (POST request)](#5-contact-form)
6. [Loading dynamic data, e.g. Projects (GET request)](#6-loading-data)
7. [Loading & error states the right way](#7-loading-error-states)
8. [Authentication (when you add a login / admin)](#8-auth)
9. [The Django backend side (reference implementation)](#9-django-backend)
10. [Debugging checklist](#10-debugging)
11. [Going deeper — concepts & resources](#11-going-deeper)

---

<a name="1-mental-model"></a>
## 1. Mental model: how a React frontend talks to a backend

Your **frontend** (this React app) and your **backend** are two **separate programs**, usually running on **two different ports** during development:

```
┌─────────────────────────┐         HTTP request          ┌──────────────────────────┐
│  React app (browser)    │  ───────────────────────────► │  Backend server          │
│  http://localhost:5173  │   GET /api/projects/           │  http://localhost:8000   │
│  (Vite dev server)      │   POST /api/contact/  {json}   │  (Django / Node / etc.)  │
│                         │  ◄─────────────────────────── │                          │
└─────────────────────────┘         JSON response          └──────────────────────────┘
                                                                      │
                                                                      ▼
                                                              ┌──────────────┐
                                                              │   Database   │
                                                              └──────────────┘
```

Key facts to internalize:

- **They communicate over HTTP** by sending **requests** and receiving **responses**. The body is almost always **JSON**.
- The browser's `fetch()` (built in) or the `axios` library is what *sends* the request from React.
- A request has: a **method** (GET, POST, PUT, PATCH, DELETE), a **URL**, **headers** (metadata like `Content-Type: application/json`), and optionally a **body** (the JSON you send).
- A response has: a **status code** (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error), **headers**, and a **body** (JSON).
- **REST** is just a convention for naming those URLs and choosing methods:

  | Goal                  | Method | URL example            |
  |-----------------------|--------|------------------------|
  | List all projects     | GET    | `/api/projects/`       |
  | Get one project       | GET    | `/api/projects/3/`     |
  | Create a project      | POST   | `/api/projects/`       |
  | Update a project      | PUT/PATCH | `/api/projects/3/`  |
  | Delete a project      | DELETE | `/api/projects/3/`     |
  | Send a contact message| POST   | `/api/contact/`        |

That's the whole game. Everything below is detail.

---

<a name="2-request-lifecycle"></a>
## 2. The request lifecycle, end to end

When the user clicks **"Send Message"** in the contact form, here is *exactly* what happens:

1. **React** builds an object: `{ name, email, subject, message }`.
2. React calls `fetch("http://localhost:8000/api/contact/", { method: "POST", body: JSON.stringify(data), headers: {...} })`.
3. The browser opens a TCP connection to the backend and sends the HTTP request.
4. **(CORS preflight)** Because it's a cross-origin POST with a JSON body, the browser first sends an automatic `OPTIONS` request asking "are you allowed to talk to me?". The backend must answer yes (see §4).
5. The **backend** receives the request, validates the data, saves it to the database (or emails it), and returns a JSON response like `{ "status": "ok", "id": 42 }` with status `201`.
6. The **browser** hands the response back to your `fetch()` promise.
7. React reads the JSON (`await res.json()`), updates state (`setSent(true)`), and the UI re-renders to show "Message Sent ✓".

If *any* step fails (network down, CORS blocked, validation error, server crash), you get an error you must handle (see §7).

---

<a name="3-project-setup"></a>
## 3. Project setup: env variables + a reusable API client

### 3a. Store the backend URL in an env variable (don't hard-code it)

Create a file **`.env`** in the project root (next to `package.json`):

```bash
# .env  — used by Vite. Variables MUST start with VITE_ to be exposed to the browser.
VITE_API_BASE_URL=http://localhost:8000/api
```

> When you deploy, you'll set this to your real backend URL, e.g. `https://api.yoursite.com/api`. Vite reads `.env` automatically. **Restart `npm run dev` after editing `.env`** — changes are not hot-reloaded.

Also add `.env` to a `.gitignore` if it ever holds secrets. (Frontend env vars are *not* secret — they ship to the browser — but it's good hygiene. Real secrets, like API keys for third-party services, belong on the **backend** only.)

### 3b. Create one reusable API client

Don't scatter `fetch()` calls across components. Make a single file. Create **`src/lib/api.ts`**:

```ts
// src/lib/api.ts
// One place that knows how to talk to the backend.

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

// A small typed wrapper around fetch that:
//  - prefixes the base URL
//  - sets JSON headers
//  - throws on non-2xx responses (so callers can try/catch)
//  - parses the JSON body for you
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!res.ok) {
    // Try to read a JSON error body; fall back to status text.
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail ?? JSON.stringify(body);
    } catch {
      /* response had no JSON body */
    }
    throw new Error(`API ${res.status}: ${detail}`);
  }

  // 204 No Content has an empty body.
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
```

Now every component just calls `api.get("/projects/")` or `api.post("/contact/", data)`. If the backend URL or auth changes, you edit **one file**.

> **fetch vs axios:** `fetch` is built into the browser (zero dependencies) — this guide uses it. `axios` is a popular library that adds conveniences (automatic JSON, interceptors, request cancellation). Either is fine. To use axios instead: `npm i axios`, then `axios.create({ baseURL })`. Stick with `fetch` while learning — you'll understand what axios does for you.

---

<a name="4-cors"></a>
## 4. CORS — the #1 thing that will block you

**CORS** (Cross-Origin Resource Sharing) is a browser security rule. Because your React app runs on `http://localhost:5173` and your backend on `http://localhost:8000`, they are **different origins**. By default the browser **blocks** the response and you'll see this in the console:

```
Access to fetch at 'http://localhost:8000/api/contact/' from origin
'http://localhost:5173' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**This is fixed on the BACKEND, not the frontend.** The backend must send a header saying "I allow requests from localhost:5173". For Django:

```bash
pip install django-cors-headers
```

```python
# settings.py
INSTALLED_APPS = [
    # ...
    "corsheaders",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",   # must be near the TOP, before CommonMiddleware
    "django.middleware.common.CommonMiddleware",
    # ...
]

# During development, allow your Vite dev server:
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
# In production, list your real frontend domain instead.
```

> **Alternative: a dev proxy.** Instead of CORS, you can make Vite proxy `/api` to your backend so the browser thinks it's the *same* origin. Add to `vite.config.ts`:
> ```ts
> server: {
>   proxy: {
>     "/api": { target: "http://localhost:8000", changeOrigin: true },
>   },
> },
> ```
> Then set `VITE_API_BASE_URL=/api` (no host). This sidesteps CORS in dev. You still need real CORS config in production.

---

<a name="5-contact-form"></a>
## 5. Wiring the Contact form (POST request)

Right now `src/app/components/Contact.tsx` **fakes** the submit:

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setSent(true);                                   // ← just flips a flag, sends nothing
  setTimeout(() => setSent(false), 3000);
  setForm({ name: "", email: "", subject: "", message: "" });
};
```

Replace it with a real POST. Here's the upgraded version — note the added `sending` and `error` states so the UI can show progress and failures:

```tsx
// At the top of Contact.tsx, add the import:
import { api } from "../../lib/api";

// Inside the component, expand the state:
const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
const [sent, setSent] = useState(false);
const [sending, setSending] = useState(false);     // NEW
const [error, setError] = useState<string | null>(null);  // NEW

// Replace handleSubmit with an async version:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSending(true);
  setError(null);
  try {
    // POST /api/contact/  with the form as JSON.
    await api.post("/contact/", form);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
  } finally {
    setSending(false);
  }
};
```

Then update the submit button so it reflects the new states (find the `<button type="submit">` near the bottom):

```tsx
<button
  type="submit"
  disabled={sending}                                 // prevent double-submit
  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition-all duration-300 hover:opacity-90 hover:scale-[1.01] disabled:opacity-60"
  style={{
    background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
    color: "#fff",
    fontFamily: "'Space Grotesk', sans-serif",
    boxShadow: "0 4px 24px rgba(108,99,255,0.4)",
  }}
>
  <Send size={16} />
  {sending ? "Sending..." : sent ? "Message Sent! ✓" : "Send Message"}
</button>

{/* Show an error message under the button if something failed */}
{error && (
  <p style={{ color: "#FF6B6B", fontSize: "0.8rem", marginTop: "0.5rem" }}>
    {error}
  </p>
)}
```

**What you just learned:** the four states every form submission has — *idle → sending → success / error* — and how to drive the UI from them. This pattern is identical for login, comments, checkout, anything.

---

<a name="6-loading-data"></a>
## 6. Loading dynamic data, e.g. Projects (GET request)

Right now `Projects.tsx` has a hard-coded array:

```tsx
const projects = [ { title: "E-Commerce Platform", ... }, ... ];
```

To load it from the backend instead, fetch it when the component mounts using `useEffect`. The key React hook for "run code after render" is **`useEffect`**:

```tsx
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

// Describe the shape your API returns (good TypeScript habit):
type Project = {
  title: string;
  description: string;
  tags: string[];
  color: string;
  emoji: string;
  github: string;
  live: string;
};

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This runs once after the component first renders.
    let cancelled = false;     // guard against setting state after unmount

    api.get<Project[]>("/projects/")
      .then((data) => { if (!cancelled) setProjects(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };   // cleanup
  }, []);   // [] = run only once, on mount

  if (loading) return <p style={{ color: "#A0A0B8", textAlign: "center" }}>Loading projects…</p>;
  if (error)   return <p style={{ color: "#FF6B6B", textAlign: "center" }}>Failed to load: {error}</p>;

  // ...then render exactly as before, mapping over `projects`.
}
```

**Tip — migrate gradually:** keep the hard-coded array as a *fallback* while you build the backend:

```tsx
.catch(() => { if (!cancelled) setProjects(FALLBACK_PROJECTS); })
```

That way the site never looks broken while your API is still in progress.

> **Why `useEffect` and not just call the API in the function body?** A React component function runs on *every* render. If you fetched directly in the body, you'd fire an infinite loop of requests. `useEffect(fn, [])` tells React "run this side-effect **once**, after mount." Understanding this is core to React.

---

<a name="7-loading-error-states"></a>
## 7. Loading & error states the right way

Every network call has **three** outcomes you must design for:

| State    | What the user sees                 | React state           |
|----------|------------------------------------|-----------------------|
| Loading  | spinner / skeleton / "Loading…"    | `loading === true`    |
| Success  | the data                           | `data` is populated   |
| Error    | a friendly message + retry option  | `error !== null`      |

Beginners only build the success path, then are surprised when the UI hangs forever on a slow network or shows a blank screen on failure. **Always handle all three.** This project already ships shadcn `skeleton.tsx` and `sonner.tsx` (toasts) components you can use:

```tsx
import { toast } from "sonner";
// on error:
toast.error("Couldn't send your message. Please try again.");
// on success:
toast.success("Message sent!");
```

(`<Toaster />` from `sonner` needs to be mounted once, e.g. in `App.tsx`.)

---

<a name="8-auth"></a>
## 8. Authentication (when you add a login / admin)

You don't need this for a public portfolio, but here's the model for when you add a dashboard to manage projects/messages.

**Token-based auth (JWT)** is the common approach with DRF + React:

1. User submits email+password → `POST /api/auth/login/`.
2. Backend verifies and returns a **token** (a signed string).
3. Frontend stores the token (in memory, or `localStorage` for simplicity).
4. Every subsequent request includes it in a header: `Authorization: Bearer <token>`.
5. Backend checks the token on protected endpoints.

Wire it into your API client so you never repeat it:

```ts
// In src/lib/api.ts, read the token and attach it:
function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
// then in request():
headers: { "Content-Type": "application/json", ...authHeaders(), ...(options.headers ?? {}) }
```

> Security note: `localStorage` tokens are vulnerable to XSS. For higher security, backends issue **httpOnly cookies** instead (JavaScript can't read them). Start simple, learn the tradeoff later.

---

<a name="9-django-backend"></a>
## 9. The Django backend side (reference implementation)

So the picture is complete, here's a minimal DRF backend that the frontend above talks to. (Adapt freely — this is just to show the *other half*.)

```python
# models.py
from django.db import models

class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    tags = models.JSONField(default=list)     # ["Django", "React", ...]
    color = models.CharField(max_length=9, default="#6C63FF")
    emoji = models.CharField(max_length=8, default="🚀")
    github = models.URLField(blank=True)
    live = models.URLField(blank=True)
```

```python
# serializers.py — turns model objects into JSON and validates incoming JSON
from rest_framework import serializers
from .models import ContactMessage, Project

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "subject", "message"]

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "title", "description", "tags", "color", "emoji", "github", "live"]
```

```python
# views.py
from rest_framework import generics
from .models import ContactMessage, Project
from .serializers import ContactMessageSerializer, ProjectSerializer

class ContactCreateView(generics.CreateAPIView):       # handles POST /api/contact/
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

class ProjectListView(generics.ListAPIView):           # handles GET /api/projects/
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
```

```python
# urls.py
from django.urls import path
from .views import ContactCreateView, ProjectListView

urlpatterns = [
    path("api/contact/", ContactCreateView.as_view()),
    path("api/projects/", ProjectListView.as_view()),
]
```

Now `POST /api/contact/` saves a message and `GET /api/projects/` returns the list — exactly what the frontend expects. **The contract between the two sides is the JSON shape.** Keep the serializer `fields` and your TypeScript `type` in sync.

---

<a name="10-debugging"></a>
## 10. Debugging checklist

When something doesn't work, open the browser **DevTools → Network tab** and click the failing request. It tells you almost everything.

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `CORS policy` error in console | Backend didn't allow your origin | Configure `django-cors-headers` (§4) or use the Vite proxy |
| `Failed to fetch` / `ERR_CONNECTION_REFUSED` | Backend not running, or wrong URL/port | Start the backend; check `VITE_API_BASE_URL` |
| `404 Not Found` | URL path typo or route not registered | Compare frontend path with backend `urls.py` |
| `400 Bad Request` | Validation failed | Look at the response body — DRF lists which fields are wrong |
| `403 Forbidden` / `401` | Missing/invalid auth or CSRF | Add the auth header; for cookie auth handle CSRF |
| `500 Server Error` | Backend crashed | Read the backend terminal logs / Django traceback |
| Got data but UI didn't update | Forgot `setState`, or stale closure | Verify state is set inside `.then()` |
| Empty `.env` value | Var doesn't start with `VITE_`, or didn't restart dev server | Rename to `VITE_…`, restart `npm run dev` |

**Two tools you should master:**
- **Browser DevTools → Network tab:** see every request, its status, headers, payload, and response. This is your X-ray vision.
- **Postman / Thunder Client / `curl`:** test your backend *without* the frontend, to isolate which side is broken:
  ```bash
  curl -X POST http://localhost:8000/api/contact/ \
       -H "Content-Type: application/json" \
       -d '{"name":"Test","email":"t@t.com","subject":"Hi","message":"Hello"}'
  ```
  If `curl` works but the React app doesn't, the bug is in the frontend (usually CORS). If `curl` fails too, the bug is in the backend.

---

<a name="11-going-deeper"></a>
## 11. Going deeper — concepts & resources

To truly understand connectivity, study these in order:

1. **HTTP fundamentals** — methods, status codes, headers, request/response. *(MDN: "An overview of HTTP")*
2. **JSON** — the data format crossing the wire. `JSON.stringify` / `JSON.parse`.
3. **Promises & async/await** — `fetch` returns a Promise; everything network is async. *(MDN: "Using Promises")*
4. **The `fetch` API** — the browser's native HTTP client. *(MDN: "Using the Fetch API")*
5. **React hooks** — `useState` (data that changes), `useEffect` (side-effects like fetching). *(react.dev: "Synchronizing with Effects")*
6. **CORS** — why cross-origin requests are blocked and how servers opt in. *(MDN: "Cross-Origin Resource Sharing (CORS)")*
7. **REST API design** — resource naming, methods, status codes as a contract.
8. **Environment variables in Vite** — *(vitejs.dev: "Env Variables and Modes")*
9. **Authentication** — JWT vs session cookies, where to store tokens, XSS/CSRF.
10. **(Level up) React Query / TanStack Query** — once you've done manual `fetch` a few times, this library handles caching, loading/error states, refetching, and deduping for you. Learn the manual way *first* (this guide) so you understand what it automates.

### The minimal path to a working connection
1. Add `.env` with `VITE_API_BASE_URL` (§3a).
2. Create `src/lib/api.ts` (§3b).
3. Get the backend running and enable CORS (§4).
4. Test the backend alone with `curl`/Postman (§10).
5. Wire the Contact form (§5) — your first real round-trip.
6. Open DevTools → Network and watch the request succeed. 🎉
7. Then convert Projects to load from the API (§6).

---

**Summary:** Frontend and backend are two programs talking over HTTP in JSON. React sends requests with `fetch` (wrapped in your `api.ts`), the backend responds, and React updates state to re-render the UI. Get CORS right, handle loading/error states, keep the JSON shape in sync between the TypeScript types and the backend serializers, and use the Network tab to debug. Master that loop once and you can connect *any* React UI to *any* backend.

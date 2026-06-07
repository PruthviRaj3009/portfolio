// src/lib/api.ts
// One place that knows how to talk to the backend.
// Every component should call api.get / api.post etc. instead of using fetch directly.

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

// Optional: attach an auth token if one is stored (used once you add login).
function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// A small typed wrapper around fetch that:
//  - prefixes the base URL
//  - sets JSON headers
//  - throws on non-2xx responses (so callers can try/catch)
//  - parses the JSON body for you
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
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

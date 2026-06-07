# Running this React frontend with Docker

This guide explains the Docker setup, **where each file goes**, **how to build the image**, and **how to run it**. It's written so a beginner can follow it end to end.

---

## 1. What Docker does here (the idea)

Docker packages your app + everything it needs (Node to build it, Nginx to serve it) into one **image**. Anyone with Docker can run that image as a **container** — no need to install Node, npm, or worry about "works on my machine." 

This project uses a **multi-stage build**:

```
Stage 1 (node:20-alpine)        Stage 2 (nginx:1.27-alpine)
┌────────────────────────┐      ┌────────────────────────────┐
│ npm install            │      │ copies the built /dist      │
│ npm run build          │ ───► │ serves it on port 80 via    │
│ → produces /app/dist   │      │ Nginx (a fast web server)   │
└────────────────────────┘      └────────────────────────────┘
   (heavy, ~400MB)                 (final image, ~50MB — Node is thrown away)
```

The first stage compiles your React code into plain static HTML/CSS/JS. The second stage is a tiny web server that just serves those files. Node is **not** in the final image — that's why it's small and fast.

---

## 2. Where the files go

All Docker files live in the **project root**, right next to `package.json`:

```
Raj Portfolio figma/
├── Dockerfile            ← the build recipe          (created)
├── .dockerignore         ← files to exclude          (created)
├── nginx.conf            ← web-server config         (created)
├── docker-compose.yml    ← optional one-command run  (created)
├── package.json
├── index.html
├── vite.config.ts
└── src/...
```

You don't move anything — they're already in the right place.

---

## 3. Prerequisite: install Docker

Install **Docker Desktop**: https://www.docker.com/products/docker-desktop/ (Windows/Mac) or Docker Engine (Linux). After installing, verify:

```bash
docker --version
```

Make sure **Docker Desktop is running** (the whale icon in the system tray) before building.

---

## 4. Build the image

Open a terminal **in the project root** (the folder with the `Dockerfile`):

```bash
cd "D:\Cp\Raj Portfolio figma (2)\Raj Portfolio figma"
```

Then build, giving the image a name (`-t` = tag):

```bash
docker build -t raj-portfolio-frontend .
```

> The `.` at the end means "use the current folder as the build context." Don't omit it.

First build takes a few minutes (it downloads base images + runs `npm install`). Later builds are faster thanks to layer caching.

**To point at a real backend URL** (baked in at build time, because Vite inlines env vars):

```bash
docker build --build-arg VITE_API_BASE_URL=https://api.yoursite.com/api -t raj-portfolio-frontend .
```

---

## 5. Run the container

```bash
docker run -d -p 8080:80 --name raj-portfolio raj-portfolio-frontend
```

What the flags mean:
- `-d` — run in the background (detached).
- `-p 8080:80` — map **port 8080 on your machine** → **port 80 inside the container** (where Nginx listens).
- `--name raj-portfolio` — a friendly name so you can stop it later.

Now open **http://localhost:8080** in your browser. 🎉

---

## 6. Stop / start / clean up

```bash
docker stop raj-portfolio          # stop the running container
docker start raj-portfolio         # start it again
docker rm raj-portfolio            # delete the container (must stop first)
docker rmi raj-portfolio-frontend  # delete the image
docker ps                          # list running containers
docker ps -a                       # list all containers (incl. stopped)
docker logs raj-portfolio          # see the container's logs
```

---

## 7. Even simpler: docker compose

Instead of separate build/run commands, use the included `docker-compose.yml`:

```bash
docker compose up --build     # build + run in one go
docker compose up -d --build  # same, in background
docker compose down           # stop and remove
```

This serves the app on **http://localhost:8080** (configured in `docker-compose.yml`).

---

## 8. About the backend / Contact form

Same as the non-Docker version: the UI renders fully, but the **"Send Message"** button will error unless a backend is reachable at the `VITE_API_BASE_URL` you built with. Two ways to connect a backend:

1. **CORS approach** — build with `--build-arg VITE_API_BASE_URL=http://your-backend:8000/api` and enable CORS on the backend (see `BACKEND_INTEGRATION_GUIDE.md` §4).
2. **Same-origin proxy** — uncomment the `location /api/` block in `nginx.conf`, point `proxy_pass` at your backend, and build with `--build-arg VITE_API_BASE_URL=/api`. Then no CORS is needed because the browser sees one origin.

To run frontend **and** a backend together, add a second service to `docker-compose.yml` and let Nginx proxy `/api/` to it (the proxy block references `http://backend:8000`, where `backend` is the compose service name).

---

## 9. Sharing the image (no source code needed)

To let someone run it without the source:

**Option A — push to a registry (Docker Hub):**
```bash
docker tag raj-portfolio-frontend yourusername/raj-portfolio-frontend
docker push yourusername/raj-portfolio-frontend
# they run:  docker run -d -p 8080:80 yourusername/raj-portfolio-frontend
```

**Option B — export to a file:**
```bash
docker save raj-portfolio-frontend -o raj-portfolio-frontend.tar
# send the .tar; they load it:
docker load -i raj-portfolio-frontend.tar
docker run -d -p 8080:80 raj-portfolio-frontend
```

---

## 10. Quick reference (copy-paste)

```bash
# build
docker build -t raj-portfolio-frontend .

# run on http://localhost:8080
docker run -d -p 8080:80 --name raj-portfolio raj-portfolio-frontend

# stop & remove
docker stop raj-portfolio && docker rm raj-portfolio
```

---

## 11. Troubleshooting

| Problem | Fix |
|---------|-----|
| `Cannot connect to the Docker daemon` | Start Docker Desktop and wait for it to be ready |
| `port is already allocated` | Something else uses 8080 — use `-p 3000:80` and open :3000 |
| Build fails at `npm install` | Check internet; retry. Delete any local `node_modules` (it's ignored anyway) |
| Page loads but is blank | Check `docker logs raj-portfolio`; usually a build error |
| Contact form errors | Expected without a backend — see §8 |
| Changes not showing | Rebuild the image (`docker build ...`) — images are snapshots, not live |
```

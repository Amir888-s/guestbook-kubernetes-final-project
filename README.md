# Guestbook Kubernetes Final Project

A simple Guestbook web application packaged with Docker and prepared for deployment, autoscaling, rollout, and rollback on IBM Cloud Kubernetes Service.

## Project files

- `Dockerfile` — production container with COPY and EXPOSE instructions
- `server.js` — Express web server and Guestbook API
- `public/index.html` — final Guestbook v2 page
- `public/index-v1.html` — Guestbook v1 reference for Task 3 evidence
- `deployment.yml` — Kubernetes Deployment with CPU resource requests
- `service.yml` — public LoadBalancer Service
- `hpa.yml` — Horizontal Pod Autoscaler
- `load-generator.yml` — optional load generator
- `EVIDENCE-GUIDE.md` — exact commands and evidence checklist for Tasks 1–10

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000.

## Build locally

```bash
docker build -t guestbook:v2 .
docker run --rm -p 3000:3000 guestbook:v2
```

## IBM Cloud submission

Follow [EVIDENCE-GUIDE.md](EVIDENCE-GUIDE.md). Replace `<namespace>` and `<cluster-name>` with the values from your IBM Cloud lab. Save real command output for every task; do not submit example or invented output.

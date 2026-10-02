# Deployment

Tally is a single Node.js process with no external dependencies, so it runs anywhere Node.js 20 runs.

## Build and run

```bash
npm ci
npm run build
NODE_ENV=production TALLY_API_KEY=... npm start
```

## Docker

A minimal image:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev
ENV PORT=4000
EXPOSE 4000
CMD ["node", "dist/index.js"]
```

```bash
docker build -t tally .
docker run -p 4000:4000 -e TALLY_API_KEY=change-me tally
```

## Health checks

Point your load balancer or orchestrator at `GET /health`. It always returns `200` with `{"status":"ok"}` and never requires an API key.

## Things to keep in mind

- Run a single instance. Counters are stored in each process's memory and are not shared between replicas.
- Restarts reset all counters. Read and store anything you need to keep before deploying a new version.

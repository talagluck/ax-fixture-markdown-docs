import express, { type NextFunction, type Request, type Response } from "express";
import type { Config } from "./config.js";
import { CounterStore } from "./counters.js";

const NAME_PATTERN = /^[a-z0-9][a-z0-9._-]*$/;

export function createApp(config: Config, store = new CounterStore()) {
  const app = express();
  app.use(express.json());

  if (config.logRequests) {
    app.use((req, _res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });
  }

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  function requireKey(req: Request, res: Response, next: NextFunction) {
    if (config.apiKey && req.header("x-api-key") !== config.apiKey) {
      res.status(401).json({ error: "missing or invalid API key" });
      return;
    }
    next();
  }

  app.use(requireKey);

  app.post("/events", (req, res) => {
    const { name, value } = req.body ?? {};

    if (typeof name !== "string" || !NAME_PATTERN.test(name) || name.length > config.maxNameLength) {
      res.status(400).json({
        error: `name must match ${NAME_PATTERN} and be at most ${config.maxNameLength} characters`,
      });
      return;
    }
    if (value !== undefined && (!Number.isInteger(value) || value < 1)) {
      res.status(400).json({ error: "value must be a positive integer" });
      return;
    }

    res.status(202).json(store.record(name, value));
  });

  app.get("/counters", (req, res) => {
    const prefix = typeof req.query.prefix === "string" ? req.query.prefix : undefined;
    res.json(store.list(prefix));
  });

  app.get("/counters/:name", (req, res) => {
    const counter = store.get(req.params.name);
    if (!counter) {
      res.status(404).json({ error: "counter not found" });
      return;
    }
    res.json(counter);
  });

  app.delete("/counters/:name", (req, res) => {
    if (!store.reset(req.params.name)) {
      res.status(404).json({ error: "counter not found" });
      return;
    }
    res.status(204).end();
  });

  return app;
}

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import { createApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

let server: Server;
let base: string;
const headers = { "content-type": "application/json", "x-api-key": "test-key" };

before(async () => {
  server = createApp(loadConfig({ TALLY_API_KEY: "test-key" })).listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  base = `http://localhost:${(server.address() as AddressInfo).port}`;
});

after(() => {
  server.close();
});

test("health check does not need a key", async () => {
  const res = await fetch(`${base}/health`);
  assert.equal(res.status, 200);
});

test("requests without a key are rejected", async () => {
  const res = await fetch(`${base}/counters`);
  assert.equal(res.status, 401);
});

test("events increment counters", async () => {
  for (const value of [1, 4]) {
    const res = await fetch(`${base}/events`, {
      method: "POST",
      headers,
      body: JSON.stringify({ name: "signup.completed", value }),
    });
    assert.equal(res.status, 202);
  }

  const counter = await (await fetch(`${base}/counters/signup.completed`, { headers })).json();
  assert.equal(counter.total, 5);
  assert.equal(counter.events, 2);

  const reset = await fetch(`${base}/counters/signup.completed`, { method: "DELETE", headers });
  assert.equal(reset.status, 204);
});

test("invalid names are rejected", async () => {
  const res = await fetch(`${base}/events`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name: "Not Valid!" }),
  });
  assert.equal(res.status, 400);
});

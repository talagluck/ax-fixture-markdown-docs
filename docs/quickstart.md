# Quickstart

This guide gets Tally running on your machine and walks you through recording and reading your first counter. It takes about five minutes.

## Prerequisites

- Node.js 20 or later
- `curl`, or any other HTTP client

## 1. Install

Clone the repository and install the dependancies:

```bash
git clone <your-fork-url> tally
cd tally
npm install
```

## 2. Start the server

```bash
npm run dev
```

You should see:

```
tally listening on http://localhost:4000
```

## 3. Record an event

```bash
curl -X POST http://localhost:4000/events \
  -H 'content-type: application/json' \
  -d '{"name":"signup.completed"}'
```

Tally responds with `202 Accepted` and the updated counter:

```json
{
  "name": "signup.completed",
  "total": 1,
  "events": 1,
  "lastSeenAt": "2026-01-15T10:24:03.120Z"
}
```

## 4. Read your counters

```bash
curl http://localhost:4000/counters
```

## Next steps

- [Recording events](guides/recording-events.md) covers names, values and validation rules.
- [Authentication](guides/authentication.md) shows how to require an API key.

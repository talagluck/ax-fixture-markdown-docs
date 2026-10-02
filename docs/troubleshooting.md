# Troubleshooting

## `401 missing or invalid API key`

`TALLY_API_KEY` is set on the server, and the request didn't send a matching `x-api-key` header. See [Authentication](guides/authentication.md).

## `400 name must match ...`

Event names must be lowercase, start with a letter or digit, and only contain letters, digits, `.`, `_` and `-`. See [Recording events](guides/recording-events.md#naming-rules).

## `EADDRINUSE` on startup

Another process is already using the port. Stop it, or start Tally on a different port:

```bash
PORT=4100 npm run dev
```

## My counters disappeared

Counters are stored in memory and reset whenever the process restarts, including on every file change while `npm run dev` is running. This is expected. See [Deployment](guides/deployment.md) for running Tally as a long-lived process.

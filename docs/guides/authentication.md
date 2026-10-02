# Authentication

By default Tally accepts requests from anyone who can reach it. To require a key, set `TALLY_API_KEY` before starting the server:

```bash
TALLY_API_KEY=s3cret npm start
```

Every request except `GET /health` must then include the key in the `x-api-key` header:

```bash
curl http://localhost:4000/counters -H 'x-api-key: s3cret'
```

Requests without a valid key receive `401 Unauthorized`:

```json
{ "error": "missing or invalid API key" }
```

## Choosing a key

Use a long random value, for example:

```bash
openssl rand -hex 32
```

## Rotating a key

Tally supports one key at a time. To rotate it, update `TALLY_API_KEY` and restart the process, then update your clients. Because counters are kept in memory, a restart also resets them.

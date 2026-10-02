# tally

A small self-hosted API for counting events. Send it an event name, and it keeps a running total you can query later. It's useful for lightweight product metrics, feature usage counts and smoke-test dashboards when a full analytics stack is overkill.

Counters are kept in memory and reset when the process restarts.

## Quick start

```bash
npm install
npm run dev
```

Then record an event:

```bash
curl -X POST http://localhost:4000/events \
  -H 'content-type: application/json' \
  -d '{"name":"signup.completed"}'
```

See the [`docs/`](docs/) folder for the full guide, starting with [Introduction](docs/introduction.md).

## Scripts

- `npm run dev` – start with reload on change
- `npm run build` – compile TypeScript to `dist/`
- `npm start` – run the compiled server
- `npm test` – run the test suite

## License

MIT

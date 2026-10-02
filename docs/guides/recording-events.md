# Recording events

Send events to `POST /events` with a JSON body.

```bash
curl -X POST http://localhost:4000/events \
  -H 'content-type: application/json' \
  -d '{"name":"export.started","value":3}'
```

| Field   | Type    | Required | Description |
| ------- | ------- | -------- | ----------- |
| `name`  | string  | yes      | The counter to increment. |
| `value` | integer | no       | Amount to add. Defaults to `1`. Must be a positive integer. |

A successful request returns `202 Accepted` with the updated counter.

## Naming rules

Event names must:

- be lowercase
- start with a letter or a digit
- contain only letters, digits, `.`, `_` and `-`
- be at most `TALLY_MAX_NAME_LENGTH` characters long (64 by default)

Dots are a good way to group related counters, for example `billing.invoice_sent` and `billing.invoice_paid`. You can then read the whole group with a prefix filter. See [Querying counters](querying-counters.md).

## Sending events from code

```ts
await fetch("http://localhost:4000/events", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ name: "report.generated" }),
});
```

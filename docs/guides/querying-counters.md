# Querying counters

## List all counters

```bash
curl http://localhost:4000/counters
```

Counters are returned in alphabetical order:

```json
[
  { "name": "billing.invoice_paid", "total": 12, "events": 12, "lastSeenAt": "..." },
  { "name": "billing.invoice_sent", "total": 15, "events": 15, "lastSeenAt": "..." }
]
```

## Filter by prefix

```bash
curl 'http://localhost:4000/counters?prefix=billing.'
```

## Get one counter

```bash
curl http://localhost:4000/counters/billing.invoice_paid
```

Returns `404` if no event with that name has been recorded yet.

## Reset a counter

```bash
curl -X DELETE http://localhost:4000/counters/billing.invoice_paid
```

Returns `204 No Content`. The next event with that name starts again from zero.

## Counter fields

| Field        | Description |
| ------------ | ----------- |
| `name`       | The counter's name. |
| `total`      | Sum of all recorded values. |
| `events`     | Number of events recorded. |
| `lastSeenAt` | ISO 8601 timestamp of the most recent event. |

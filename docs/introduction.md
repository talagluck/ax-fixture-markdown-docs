# Introduction

Tally is a small, self-hosted HTTP API for counting things. You send it named events, such as `signup.completed` or `export.started`, and it keeps a running total for each name.

It is designed for teams that want simple usage numbers without adopting a full analytics platform:

- **One endpoint to write.** `POST /events` with a name and an optional value.
- **Plain JSON to read.** List every counter, filter by prefix, or fetch a single one.
- **No database.** Counters live in memory, which keeps Tally fast and dependency-free.
- **Optional API key.** Lock down every endpoint except the health check with a single environment variable.

## When to use Tally

Tally works well for:

- Counting feature usage during a beta
- Tracking smoke-test or cron job runs
- Feeding a quick internal dashboard

Tally is not a good fit when you need per-user analytics, long-term retention or historical time series. Counters reset when the process restarts.

## Next steps

- Follow the [Quickstart](quickstart.md) to run Tally locally and record your first event.
- Read [Configuration](configuration.md) for the available environment variables.

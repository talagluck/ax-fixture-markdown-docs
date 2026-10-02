# Configuration

Tally is configured entirely through environment variables. All of them are optional.

| Variable                | Default | Description |
| ----------------------- | ------- | ----------- |
| `PORT`                  | `4000`  | Port the HTTP server listens on. |
| `TALLY_API_KEY`         | unset   | When set, every request except `GET /health` must send this value in the `x-api-key` header. |
| `TALLY_MAX_NAME_LENGTH` | `64`    | Maximum length of an event name. |
| `TALLY_LOG_REQUESTS`    | `false` | Set to `true` to log the method and path of each request. |

## Example

```bash
PORT=8080 TALLY_API_KEY=change-me TALLY_LOG_REQUESTS=true npm start
```

## Using a `.env` file

Tally does not load `.env` files on its own. If you keep settings in a file, load it with your process manager or with Node's built-in flag:

```bash
node --env-file=.env dist/index.js
```

`.env` is listed in `.gitignore`, so it won't be committed by accident.

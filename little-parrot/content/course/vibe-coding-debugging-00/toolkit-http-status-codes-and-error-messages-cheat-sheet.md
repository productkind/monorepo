---
challenge: "3 - How Developers Investigate Bugs"
---
## HTTP Status Codes and Error Messages Cheat Sheet

A quick-reference guide for the error codes and messages you'll see most often while debugging your Lovable app. Keep this open alongside your browser DevTools.

### HTTP status codes (Network tab)

These appear in the Network tab of your browser DevTools. They tell you whether a request from your app to the backend succeeded or failed, and why.

#### Success

| Code | Name | What it means |
|------|------|--------------|
| 200 | OK | Everything worked. If the bug persists, the problem is elsewhere. |
| 201 | Created | A new record was successfully created (e.g., a new row in the database). |

#### Client errors (the app sent something wrong)

| Code | Name | What it means | Common cause in Lovable |
|------|------|--------------|------------------------|
| 400 | Bad Request | The data sent to the backend is missing or formatted incorrectly. | A required field is empty, or the data type is wrong (e.g., sending text where a number is expected). |
| 401 | Unauthorised | The user isn't logged in, or the session has expired. | The user's login session timed out. Try logging out and back in. |
| 403 | Forbidden | The user is logged in but doesn't have permission. | Row Level Security (RLS) policies are blocking the request. This is the most common 403 cause in Lovable apps. |
| 404 | Not Found | The app is trying to reach something that doesn't exist. | A backend function was renamed or deleted, or the URL path is wrong. |
| 409 | Conflict | The request conflicts with existing data. | Trying to create a duplicate record where only one is allowed (e.g., voting twice). |

#### Server errors (something crashed on the backend)

| Code | Name | What it means | Common cause in Lovable |
|------|------|--------------|------------------------|
| 500 | Internal Server Error | Something went wrong in the backend code. | A bug in a backend function. Check the Cloud logs for the specific error. |
| 502 | Bad Gateway | The server received an invalid response from another service. | An external API (payment provider, email service) is down or misconfigured. |
| 503 | Service Unavailable | The server is temporarily overloaded or down. | Usually temporary. Wait a moment and try again. |

### Common Console errors (Console tab)

These appear in the Console tab of your browser DevTools. They come from the frontend code running in the browser.

| Error message | What it usually means | What to tell Lovable |
|---|---|---|
| `TypeError: Cannot read properties of undefined (reading 'X')` | The code is trying to use data that hasn't loaded yet or doesn't exist. | "I'm getting a TypeError for 'X' on the [page]. The data might not be loading before the component tries to use it." |
| `TypeError: X is not a function` | The code is trying to call something that isn't a function. | "I'm getting 'X is not a function' on the [page]. Check that the function exists and is imported correctly." |
| `ReferenceError: X is not defined` | A variable or function name is misspelt or was never created. | "I'm getting 'X is not defined' on the [page]. The variable or function might be misspelt or missing." |
| `SyntaxError: Unexpected token` | The code has a formatting mistake (missing bracket, extra comma). | Copy the full error including the file name and line number and share it with Lovable. |
| `Failed to fetch` | A network request failed entirely (no response at all). | "A request is failing with 'Failed to fetch'. Check if the backend function exists and the URL is correct." |
| `CORS error` / `Access-Control-Allow-Origin` | The browser is blocking a request to an external service for security reasons. | "I'm getting a CORS error when trying to reach [service]. The backend might need to proxy this request instead of calling it from the frontend." |
| `ResizeObserver loop completed with undelivered notifications` | A layout is recalculating in a loop. | Usually harmless. Only worth investigating if the page is visibly flickering or slowing down. |

### How to use this cheat sheet

1. **Reproduce the bug** with DevTools open (F12 on Windows, Cmd+Option+I on Mac).
2. **Check the Console tab** first for red error messages. Find the error in the table above.
3. **Check the Network tab** for failed requests (anything not 200/201). Find the status code in the table above.
4. **Share what you found** with Lovable using the "What to tell Lovable" phrasing as a starting point.

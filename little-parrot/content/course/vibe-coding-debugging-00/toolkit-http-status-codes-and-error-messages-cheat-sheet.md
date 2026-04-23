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
| 401 | Unauthorised | The user isn't logged in, or the session has expired. | The user's login session timed out. Possibly you can try logging out and back in. |
| 403 | Forbidden | The user is logged in but doesn't have permission. | Row Level Security (RLS) policies are blocking the request. This is the most common 403 cause in Lovable apps. |
| 404 | Not Found | The app is trying to reach something that doesn't exist. | A backend function was renamed or deleted. |
| 409 | Conflict | The request conflicts with existing data. | Trying to create a duplicate record where only one is allowed (e.g., voting twice). |
| 429 | Too Many Requests | The app is sending too many requests in a short time. | An external API is rate-limiting you, this means that it was called too many times in a short period. Check with Lovable if you have a loop or repeated action that's triggering it. |

#### Server errors (something crashed on the backend)

| Code | Name | What it means | Common cause in Lovable |
|------|------|--------------|------------------------|
| 500 | Internal Server Error | Something went wrong in the backend code. | A bug in a backend function. Check the Cloud logs for the specific error. |
| 502 | Bad Gateway | The server received an invalid response from another service. | Lovable or an external API (payment provider, email service) is down or misconfigured. Usually temporary, and you cannot really do something about it. Wait a moment, refresh and try again. |
| 503 | Service Unavailable | The server is temporarily overloaded or down. | Usually temporary. Wait a moment, refresh and try again. |

### Common Console errors (Console tab)

These appear in the Console tab of your browser DevTools or in the Cloud logs. They indicate problems in the frontend code (Console) or backend code (Cloud logs).

| Error message | What it usually means |
|---|---|---|
| `TypeError: Cannot read properties of undefined (reading 'X')` | The code is trying to use data that hasn't loaded yet or doesn't exist. |
| `TypeError: X is not a function` | The code is trying to execute something that isn't executeable or doesn't exist. |
| `ReferenceError: X is not defined` | A variable or function name is misspelt or was never created. |
| `SyntaxError: Unexpected token` | The code or some received data has a formatting mistake (missing bracket, extra comma). |
| `Failed to fetch` | A network request failed entirely (no response at all). |

### How to use this cheat sheet

1. **Reproduce the bug** with DevTools open (F12 on Windows, Cmd+Option+I on Mac).
2. **Check the Console tab** first for red error messages. Find the error in the table above.
3. **Check the Network tab** for failed requests (anything not 200/201). Find the status code in the table above.
4. **Share what you found** with Lovable. For example, "I see a 403 error in the Network tab when I try to submit the form, which means it's likely an RLS issue. Can you check the RLS policies for that table?" or "I see a `TypeError: Cannot read properties of undefined (reading 'name')` in the Console, which means something is trying to access data that isn't there. Can you check where that data is supposed to be coming from?"

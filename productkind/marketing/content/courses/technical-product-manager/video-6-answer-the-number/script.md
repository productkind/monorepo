---
status: drafted
channels: [linkedin, tiktok, instagram, youtube-shorts]
account: little-parrot
---

# Answer the number question yourself

**Runs:** about 79 seconds. **Search phrase:** "SQL for product managers".
**Learning path step:** 5, SQL and product analytics.

**Treatment:** narration over a screen recording of a short SQL query being
written and run against a Little Parrot test database.

| Beat | Narration | Visual | On-screen text |
|---|---|---|---|
| Hook (0-8s) | "'Nothing is more frustrating than being blocked by analytics on a business decision.' A product manager wrote that about waiting for a number." | Text card | **"blocked by analytics on a business decision"** |
| The situation (8-22s) | "The questions that get stuck are rarely hard ones. How many people finished the second step last month. How many of them came back. You ask, you go into a queue, and by the time it arrives you've had the meeting." | A request in a queue behind other tickets | A one-line question, and you still wait days for the number |
| What SQL is (22-34s) | "SQL, or Structured Query Language, is how you ask a database a question, and the simple version reads almost like a sentence. Which table, which rows, and what you want counted. Here's a real one." | Screen recording: the query being typed slowly | SQL (Structured Query Language) asks a database a question |
| The query (34-50s) | "Count the users, from the signups table, where they signed up last month. Four lines. Run it, and there's your number. If you can read those four lines you can change them, and the two things worth changing are which rows you're asking about and what you're counting." | The query running, the result appearing as a single number, then one line edited and rerun | select count · from · where |
| The judgement (50-71s) | "Knowing what the number includes takes longer than writing the query. Does the signups table hold the people who never confirmed their email? Does it hold our own test accounts? Ask that before you quote the number in a meeting, because a wrong number you've already quoted is much harder to undo than waiting another day for the right one." | Two results side by side, one with test accounts included | Check what the number includes |
| CTA (71-79s) | "Step five of our learning path is writing a query against your own product and checking what it counts. Not open yet, link's in the comments." | Waitlist page, step 5 in frame | littleparrot.app/guides/technical-product-manager |

## Short cut for TikTok, Reels and Shorts (about 45 seconds)

Keep the hook, "What SQL is" and "The query". Cut "The situation" to one line
and hold "The judgement" to its first two questions. The screen recording of
four lines returning a number is the whole appeal, so give it room.

## Production notes

- **Screen recording needed:** a real query against a Little Parrot test
  database, typed at readable speed. Use test data, and never a query that
  returns real customer rows.
- **Show the number, not a table of people.** One count is the point and it
  avoids showing anything personal.
- **Say "last month", not a date range in SQL syntax.** The date filter is the
  ugliest part of a real query and it will lose people who could have followed
  the rest.

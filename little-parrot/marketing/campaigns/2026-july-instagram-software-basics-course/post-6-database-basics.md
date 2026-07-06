# Post 6: Your app's memory is a spreadsheet

**Pillar:** the method, shown, with a safety thread.
**Research trace:** the spreadsheet analogy meets the audience in a tool
they already master; SQL verbs taught as recognise-don't-write is
teach-real-terms without overwhelm; the no-undo warning and RLS close with
the safety habits that make an app "production ready real". Draws on the
course's Challenge 5 and the database section of the Software Vocabulary
Cheat Sheet.

## Format

**Carousel, 7 slides, 1080 x 1350 (4:5 portrait).** Spreadsheet style: a
friendly spreadsheet that gains labels slide by slide, SQL verbs as four
big stamps, a gentle warning slide with no alarm-red.

| Slide | Visual | Text on slide |
| --- | --- | --- |
| 1 (cover) | A spreadsheet morphing into a database cylinder | "Your app's memory is a set of spreadsheets. You already understand more of this than you think. 👇" |
| 2 | A labelled sheet: headers and one highlighted row | "A TABLE is a spreadsheet. COLUMNS are its headers (name, email, created_at). A ROW is one record: one user, one order, one book suggestion." |
| 3 | Two sheets connected by a drawn line | "Tables connect through keys. The PRIMARY KEY is each row's unique id. A FOREIGN KEY is a column pointing at another table's id: the user_id in the orders table is what makes an order belong to a user." |
| 4 | Four stamps: SELECT, INSERT, UPDATE, DELETE | "SQL is the language databases speak, and four verbs carry most of it: SELECT gets data, INSERT adds, UPDATE changes, DELETE removes. Your job is recognising them when your builder shows you its plan, never writing them." |
| 5 | A keyboard with no Ctrl+Z key, a calm face | "The rule that keeps your data safe: database changes have NO undo. Before approving any SQL your builder proposes (especially UPDATE or DELETE), read which table and which rows it touches. Backups exist, and not needing them is better." |
| 6 | Rows with little shields, one user seeing only hers | "RLS (Row Level Security): the rules deciding which rows each user can see or change. It's what keeps one member's data private from another, and it's the security finding you'll meet most often. Always worth enabling." |
| 7 (CTA) | Brand card | "Tables, keys, four verbs, one no-undo rule, and RLS: that's working database literacy. Full cheat sheet: Basics of Software for Vibe Coding, on LittleParrot.app. First challenge free 🟪 Save this 🔖" |

**Alt text (for the post):** A database-literacy carousel: tables as
spreadsheets with columns and rows, primary and foreign keys connecting
them, the four SQL verbs to recognise, the no-undo rule for database
changes, and Row Level Security keeping each user's rows private.

## Caption (exact)

Of everything under your app's bonnet, the database is the friendliest, because you've used one for years. It's spreadsheets: columns for the fields, rows for the records, and links between sheets so an order knows which customer it belongs to. 🗄️

Two parts of the carousel earn a special mention. The four SQL verbs (SELECT, INSERT, UPDATE, DELETE) are for recognising, never writing: when your builder shows a plan that says DELETE, you'll know to read carefully, because database changes have no undo button. And RLS, Row Level Security, is the set of rules keeping each user's rows private, the single most common security finding in Lovable apps and always worth enabling.

That's the safety net and the vocabulary in one sitting.

The full cheat sheet comes with our Basics of Software for Vibe Coding course. Find it on LittleParrot.app; the first challenge is free.

Save this before your next database change. 🔖

.
.
.
#vibecoding #buildwithai #womenwhobuild #techliteracy #shebuilds

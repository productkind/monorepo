# Toolkit: Basics of Software for Vibe Coding

---

## 1. Software Vocabulary Cheat Sheet
**Challenge 5: Databases for Vibe Coders**

A quick-reference guide to every term covered in the Basics of Software for Vibe Coding course. Bookmark it and come back whenever you need the right word for your prompt.

### Architecture (how apps are built)

| Term | What it means | Bakery analogy |
|------|--------------|----------------|
| **Frontend** | Everything your users see and interact with (buttons, forms, images). Runs on the user's device. Also called the **client**. | The front counter where customers order |
| **Backend** | The behind-the-scenes brain: saves data, sends emails, processes payments. Runs on a **server**. | The kitchen where baking happens |
| **Database** | Where your app remembers things: user profiles, orders, posts. A program on the server that stores and organises information. | The storage room for ingredients |
| **Server** | A powerful computer that runs your backend and database. You don't own one; cloud computing handles this for you. | The building the bakery operates in |
| **Cloud computing** | Renting space on someone else's servers instead of buying your own. Lovable handles this automatically. | Renting a commercial kitchen instead of building one |
| **Infrastructure** | All the servers, networks, and services working together. You won't manage this, but it's good to know the word. | The plumbing, electricity, and delivery trucks |
| **API** | Application Programming Interface. How apps talk to each other over the internet. | The phone line between bakeries to share orders |
| **API key** | A secret token that identifies your app to an external service. Never put these in your prompts. | The access code to the shared kitchen |

### Design (how apps look)

| Term | What it means | How to use it in a prompt |
|------|--------------|--------------------------|
| **Wireframe** | A quick sketch showing where things go on a screen. No colours, just structure. | "Here's my wireframe [attach image]" |
| **Component** | A reusable building block: button, card, input field, modal, dropdown. | "Add a card component for each item" |
| **Design system** | A ready-made kit of components that all look good together. Most AI app builders use **shadcn/ui**. | "Use a shadcn accordion for the FAQ" |
| **Hex code** | A colour written as code, like `#fdb226`. AI app builders also understand plain words like "warm yellow". | "Use #fdb226 for the accent colour" |
| **Serif font** | A font with small decorative lines at the ends of letters (e.g. Times New Roman). Feels classic and trustworthy. | "Use a serif font for headings" |
| **Sans-serif font** | A font without decorative lines (e.g. Arial, Inter). Feels clean and modern. | "Use Inter for body text" |
| **Monospace font** | A font where each letter takes equal space (e.g. Courier New). Looks techy. | "Use monospace for code snippets" |

### Components (the building blocks you'll use most)

| Component | What it does | Example prompt |
|-----------|-------------|----------------|
| **Button** | Triggers an action. **Primary** = main action (colourful). **Secondary** = less prominent (outline). **Tertiary** = just text. | "Add a primary 'Save' button in the bottom right of the /profile page" |
| **Input field** | A single line where users type text. | "Add an email input field with placeholder 'Enter your email'" |
| **Textarea** | A multi-line text input. | "Add a textarea for the description, 4 rows tall" |
| **Card** | Groups related content together (image, title, description, button). | "Show each recipe as a card with title, image, and a View button" |
| **Navigation bar** | Links at the top (or side) for moving between screens. | "Add a top nav bar with links to Home, About, and Contact" |
| **Modal** | A pop-up window that appears over everything else. | "Show a confirmation modal when the user clicks Delete" |
| **Dropdown** | Reveals a list of options when clicked. | "Add a dropdown to select the category: Work, Personal, or Ideas" |
| **Icon** | A small symbol (trash can, heart, magnifying glass). | "Add a heart icon button to let users favourite items" |

### Frontend (how screens are built)

| Term | What it means |
|------|--------------|
| **HTML** | The skeleton of every page. Defines what's on the page: headings, paragraphs, images, buttons. |
| **CSS** | The styling. Controls colours, fonts, spacing, and layout. |
| **JavaScript** | The behaviour. Handles clicks, form submissions, animations, and loading data. |
| **Box model** | Every element is a box with **content**, **padding** (inner space), **border**, and **margin** (outer space). |
| **Semantic HTML** | Using the right HTML element for the right purpose (helps accessibility and SEO). |
| **Responsive design** | Making your app look good on all screen sizes (mobile, tablet, desktop). |

### Backend (what happens behind the scenes)

| Term | What it means |
|------|--------------|
| **Backend function** | A small program that performs a specific job: validate an email, save data, send a notification. |
| **Third-party service** | An external tool your app connects to (Stripe for payments, Resend for emails). |
| **Supabase** | The backend toolkit most AI app builders use. Handles databases, authentication, and more. |
| **Authentication** | "Who are you?" Signing up and logging in. |
| **Authorisation** | "What are you allowed to do?" Permissions and access control. |

### Database (how your app remembers things)

| Term | What it means |
|------|--------------|
| **Table** | Like a spreadsheet. Has columns (headers) and rows (individual records). |
| **Column** | A field in a table (e.g. name, email, created_at). Each column has a data type. |
| **Row** | A single record (e.g. one user, one order). |
| **Primary key** | A unique identifier for each row (usually called `id`). |
| **Foreign key** | A column that links to another table's primary key (e.g. `user_id` in an orders table). |
| **Relationship** | How tables connect to each other through primary and foreign keys. |
| **SQL** | The language databases speak. **SELECT** = get data, **INSERT** = add data, **UPDATE** = change data, **DELETE** = remove data. |
| **RLS (Row Level Security)** | A Supabase feature that controls which rows each user can access. Keeps data private. |

---

## 2. Component Prompt Library
**Challenge 2: Design Elements for Vibe Coders**

Ready-to-use prompts that use the correct component names. Copy, adjust the details in brackets, and paste into Lovable.

### Buttons

```
Add a primary [action, e.g. "Save"] button [position, e.g. "below the form"]. Add a secondary "Cancel" button next to it.
```

### Input fields and forms

```
Add a form with the following fields:
- [Field name] input field with placeholder "[example text]"
- [Field name] textarea (4 rows) with placeholder "[example text]"
- A primary "Submit" button below the form
```

### Cards

```
Display each [item, e.g. "recipe"] as a card with:
- [Image/icon] at the top
- [Title] in bold
- [Short description] in lighter text below
- A [action, e.g. "View Details"] button at the bottom
Add a subtle shadow to each card.
```

### Navigation

```
Add a top navigation bar with links to [page 1, e.g. "Newsletter"], [page 2, e.g. "Pricing"], and [page 3, e.g. "About"]. Highlight the active page. On mobile, collapse the nav into a hamburger menu.
```

### Modals

```
When the user clicks [trigger, e.g. "Delete"], show a confirmation modal with the message "[message, e.g. 'Are you sure you want to delete this?']" and two buttons: "Cancel" (secondary) and "[Confirm action, e.g. 'Delete']" (primary, red).
```

### Dropdowns

```
Replace the [current input] with a dropdown. Options: [option 1], [option 2], [option 3]. Default to "[default option]".
```

### Search and filter

```
Add a search bar above the [list/grid of items]. Filter [items] by [field, e.g. "title"] as the user types. Show "No results found" if nothing matches.
```

### Icons

```
Add a [icon description, e.g. "trash can"] icon button next to each [item] for [action, e.g. "deleting"]. Show a tooltip on hover that says "[tooltip text, e.g. 'Delete item']".
```

### Responsive layout

```
On desktop, display the [items] in a 3-column grid. On tablet, switch to 2 columns. On mobile, stack them in a single column. Keep consistent spacing between items.
```

### Design and styling

```
Update the design of [section/page]:
- Background colour: [colour or hex code]
- Heading font: [font name]
- Body font: [font name]
- Card style: rounded corners, subtle shadow
- Primary button colour: [colour]
- Overall feel: [describe the vibe, e.g. "clean and minimal" or "warm and playful"]
```

---

## 3. "Where Is the Problem?" Troubleshooting Guide
**Challenge 1: Building Blocks of an Application**

When something goes wrong with your app, this guide helps you point your AI app builder in the right direction. Knowing which part of the app is affected makes your bug report clearer and the fix faster.

### How to use this guide

Look at the symptom, find which part of the app is likely causing it, then use the suggested prompt to ask for help in your app builder.

### Visual problems (something looks wrong)

**Symptoms:** Button is the wrong colour. Text is overlapping. Spacing is off. Layout looks broken on mobile.

**Where the problem is:** Frontend (CSS)

**What to say:**
```
The [element] on the [page name] looks wrong. [Describe what you see, e.g. "The cards overlap on mobile" or "The heading text is too small"]. Fix the styling so that [describe what you want instead].
```

### Nothing happens when I click something

**Symptoms:** A button doesn't respond. A form submits but nothing changes. An interaction that used to work has stopped.

**Where the problem is:** Frontend (JavaScript) or Backend

**What to say:**
```
When I click [element] on [page], nothing happens. I expected [what should happen]. Check the frontend logic and backend function for this interaction.
```

### Data isn't showing up

**Symptoms:** The page loads but the list is empty. Content you saved earlier has disappeared. Another user can't see what you added.

**Where the problem is:** Backend or Database

**What to say:**
```
The [page/section] is not showing any data. I added [items] earlier but the list appears empty. Check if the data is being saved to the database correctly and if the query is fetching it.
```

### Data isn't saving

**Symptoms:** You fill out a form and submit, but the data doesn't persist. Closing and reopening the browser loses everything.

**Where the problem is:** Backend or Database (or you haven't connected Lovable Cloud yet)

**What to say:**
```
When I submit the [form name], the data doesn't save. After refreshing the page, the [items] I added are gone. Check the database connection and the save function.
```

### An external service isn't working

**Symptoms:** Emails aren't sending. Payments aren't processing. A connected service shows errors.

**Where the problem is:** API / API key

**What to say:**
```
The [service, e.g. "email sending"] feature isn't working. I've added the API key for [service name]. Check if the API key is configured correctly and if the backend function is calling the service properly.
```

---

## 4. Third-Party Services Quick Reference
**Challenge 4: Backend for Vibe Coders**

Common external services you might want to connect to your app, what they do, and how to prompt for them.

### Payments

| Service | What it does | Free tier? |
|---------|-------------|------------|
| **Stripe** | Process payments, subscriptions, and invoices | Pay after each transaction (no monthly fee) |

```
Integrate Stripe for payments. Users should be able to [describe, e.g. "pay a one-time fee of $10 to unlock premium features"]. Show a payment button on the [page]. After successful payment, [what happens next, e.g. "unlock the premium section"].
```

### Email

| Service | What it does | Free tier? |
|---------|-------------|------------|
| **Resend** | Send transactional emails (confirmations, notifications) | 100 emails/day free |
| **Mailtrap** | Send transactional emails (confirmations, notifications) | 100 emails/day free |

```
Integrate Resend for email. Send a [type, e.g. "welcome"] email when a user [trigger, e.g. "signs up"]. The email should include [what content, e.g. "their name and a link to get started"].
```

### Authentication

| Service | What it does | Free tier? |
|---------|-------------|------------|
| **Supabase Auth** | User signup, login, and social login (Google, GitHub) | Included with Supabase |

```
Add Google Authentication. Users should be able to sign in with their Google account. Show a "Sign in" button in the header. Once signed in, show their name and a "Sign out" button.
```

### File storage

| Service | What it does | Free tier? |
|---------|-------------|------------|
| **Supabase Storage** | Store images, documents, and other files uploaded by users | 1GB free |

```
Let users upload a [file type, e.g. "profile photo"]. Store it using Supabase Storage. Show a preview of the uploaded image on their [page, e.g. "profile page"].
```

### Analytics

| Service | What it does | Free tier? |
|---------|-------------|------------|
| **PostHog** | Track how users interact with your app | 1M events/month free |

```
Integrate PostHog for analytics. Track when users [event 1, e.g. "sign up"], [event 2, e.g. "create a new item"], and [event 3, e.g. "complete a purchase"].
```

### AI features

| Service | What it does | Free tier? |
|---------|-------------|------------|
| **OpenAI API** | Add AI-powered features (text generation, summaries, chat) | Pay-as-you-go |

```
Integrate OpenAI to [describe feature, e.g. "generate a summary of each book suggestion"]. When a user [trigger, e.g. "adds a book"], use the API to [action] and display the result on the [page/section].
```

### How to connect any third-party service

The process is always similar:

1. **Create an account** on the service's website
2. **Find the API key** in their dashboard (usually under Settings or API)
3. **Add the API key** to Lovable when it asks (in the "Add Secret" panel, never in your prompt)
4. **Prompt Lovable** to integrate the service using one of the templates above

If the service's dashboard looks confusing, search YouTube for "how to set up [service name]" or ask Lovable in Plan mode: "How do I get an API key from [service name]?"

---

## 5. Database Safety Checklist
**Challenge 5: Databases for Vibe Coders**

Your database doesn't have an undo button. Go through this checklist whenever your AI app builder proposes database changes.

### Before approving any database change

- [ ] **Read what Lovable wants to do.** It shows you the SQL before running it. Look for the key words: CREATE (making something new, usually safe), ALTER (changing structure), DELETE or DROP (removing data or tables, be careful).
- [ ] **If you don't understand the SQL, ask.** Prompt: `Explain what this SQL will do in plain English.` A few seconds of checking can save hours of rebuilding.
- [ ] **Check if it's destructive.** Does the SQL contain `DELETE`, `DROP`, or `TRUNCATE`? These remove data permanently. Make sure that's what you want.

### Before launching a feature that writes data

- [ ] **Test with fake data first.** Add a test entry, check it appears, try editing it, try deleting it. Don't test with real user data.
- [ ] **Check who can see what.** If your app has user accounts, verify that users can only see their own data. Log in with your test user, add test data, log out, then log in with another test user to see what they see.
- [ ] **Verify data persists.** Add something, close the browser, reopen it. Is the data still there?

### Ongoing habits

- [ ] **Export important data regularly.** Even a spreadsheet copy is better than nothing. Supabase lets you export tables from its dashboard.
- [ ] **Bookmark your app version before big database changes.** If the change causes problems, you can revert the code. (Note: reverting code doesn't undo database changes, but it gives you a stable app to work from.)
- [ ] **Ask before you change existing columns.** Renaming or changing the type of a column that already has data can cause problems. Prompt: `I want to change [column] in [table]. Will this affect existing data?`

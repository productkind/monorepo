# Course Outline: Basics of Software for Vibe Coding

**Full title:** Basics of Software for Vibe Coding

## Overview

This micro-course teaches non-developers the vocabulary and mental models they need to communicate with AI app builders like Lovable. Instead of writing code, learners build fluency in describing what they want.

The narrative moves from the outside in: start with the visible (what users see), then go deeper into the invisible (backend, databases). By the end, learners can point the AI to the right part of the system and ask precise questions.

---

## Structure

### 1. Building Blocks of an Application
Understand how apps are structured so you can direct your AI builder to the right place.

- What vibe coding is: building with words, not code
- The bakery analogy: frontend (counter), backend (kitchen), database (storage)
- Frontend vs backend: what runs where
- Cloud computing: servers without owning hardware
- Infrastructure: the term to recognise
- Database: where apps remember things
- Quizzes: identify which part handles what

### 2. Design Elements for Vibe Coders
Get the vocabulary to describe how you want things to look.

- Wireframes: sketch before you prompt
- Components: buttons, input fields, cards, nav bars, modals, dropdowns, icons
- Design systems: pre-built kits like shadcn/ui
- Colours: hex codes vs plain language (both work)
- Fonts: serif, sans-serif, monospace
- Resources: component.gallery, coolors.co, fonts.google.com, fontpair.co
- Quizzes: match components to use cases

### 3. Frontend for Vibe Coders
Understand what the AI builder generates so you can give better feedback.

- The three languages: HTML (structure), CSS (style), JavaScript (behaviour)
- HTML elements: headings, paragraphs, links, images, lists, divs
- Semantic HTML: why it matters for accessibility and SEO
- The box model: content, padding, border, margin
- Reusable components: build once, reference everywhere
- Quizzes: identify what each technology does

### 4. Backend for Vibe Coders
Learn to prompt for features that go beyond what users see.

- Supabase: the backend toolkit most AI builders use
- Backend functions: small workers that perform specific jobs
- Third-party services: email (Resend), payments (Stripe), and why you use them
- APIs: how apps talk to each other
- API keys: what they are, where to put them, and why never in prompts
- Authentication vs authorisation: who you are vs what you can do
- Quizzes: distinguish auth concepts, understand API purpose

### 5. Databases for Vibe Coders
Understand how your app stores and remembers data.

- Tables, columns, and rows: data organised like structured spreadsheets
- Data types: text, numbers, dates, booleans
- Relationships: primary keys, foreign keys, connecting tables
- SQL basics: SELECT, INSERT, UPDATE, DELETE (recognise, don't write)
- The no-undo reality: why you review SQL before running it
- Backups: your safety net
- Row Level Security (RLS): keeping users' data protected
- Quizzes: identify database concepts and risks

---

## Narrative Arc

The course follows a depth progression:

1. **Surface:** What's an app made of? (frontend, backend, database)
2. **Visual layer:** How do I describe what I see? (components, design terms)
3. **Under the hood:** What's actually being generated? (HTML, CSS, JS)
4. **Behind the scenes:** How does the invisible stuff work? (APIs, auth, functions)
5. **The memory:** How does data get stored and protected? (tables, relationships, SQL)

Each module builds on the previous. By the end, learners have a mental model of the full stack and the vocabulary to communicate with it.

---

## Teaching Approach

- **Analogies first:** Bakery for app architecture, boxes for HTML elements
- **Recognise, don't memorise:** Learners spot patterns in generated code, they don't write it
- **Prompt examples throughout:** Each concept includes a sample prompt showing how to use the term
- **Resources linked:** External tools (coolors.co, fonts.google.com, component.gallery) for practical use
- **Safety emphasis:** API key handling, SQL review, backup awareness

---

## Skills Covered

- App architecture (frontend, backend, database, infrastructure)
- Design vocabulary (components, wireframes, design systems, colours, fonts)
- Frontend fundamentals (HTML, CSS, JavaScript, box model)
- Backend concepts (APIs, API keys, authentication, authorisation)
- Database literacy (tables, relationships, SQL recognition, RLS)

---

## Timing

Total estimated time: ~46 minutes (designed for active learning with quizzes and reflection prompts)

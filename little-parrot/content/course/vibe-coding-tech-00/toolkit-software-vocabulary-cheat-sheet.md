---
challenge: "5 - Databases for Vibe Coders"
---
## Software Vocabulary Cheat Sheet

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

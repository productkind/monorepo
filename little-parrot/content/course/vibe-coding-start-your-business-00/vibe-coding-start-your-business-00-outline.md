# Course Outline: Build a Business

**Full title:** Build a Business: From Vibe Coded Product to Paying Users

## Overview

This micro-course helps learners who have already built a digital product with an AI app builder take the next step: turning it into a real business. It covers validation, audience building, choosing a domain, getting traffic, understanding usage with analytics, and pricing.

The learner will go from "I built something cool" to "I have paying users and a plan to grow." No company registration required. No investors needed. By the end, the learner will have validated their idea, claimed a professional domain, started getting real traffic, and chosen a pricing model.

The narrative follows Dalmie, who built the Book Club Organiser app with Lovable as a hobby project for her friend's book club. Other book clubs have started asking if they can use it too, and Dalmie realises she might have something people would pay for. This course follows her journey from "free tool I made for friends" to "product with paying customers."

---

## Structure

### 1. Find Your One-Line Pitch
Discover the words that make people say "I need that" by testing your message on real people.

- The pitch test formula: "I built [product] that helps [who] do [what] without [pain point]." Try different versions and notice which one gets a reaction.
- How to run a pitch test: tell five people what your product does, one-on-one, using a different version of your pitch each time. Write down their exact reaction. Which version made them ask a follow-up question? That's your pitch.
- The "you don't need" list: a company, investors, a perfect product. You need customers getting value from what you built.
- Consider pivoting early if there's no traction
- Reference to "Build a Valuable Product: How to Break Down Your Idea for Vibe Coding" for deeper product thinking
- Example: Dalmie tries three versions of her pitch. "I built a book club app" gets polite nods. "I built an app that helps book clubs pick their next read without endless WhatsApp debates" gets people leaning in and asking how it works. She's found her pitch.
- Exercise: Write three versions of your pitch using the formula. Test each one on a different person. Write down their reactions and pick the version that sparked the most interest.

### 2. Build Your Audience Before You Launch
Start collecting the people who'll become your first customers.

- Wait lists: why they work and how to set one up (collect emails before your product is "ready")
- Lead magnets: what they are and how to use a simple one to attract sign-ups
- Small, consistent effort each week adds up
- Example: Dalmie adds a wait list to the Book Club Organiser's landing page and offers a free "Book Club Starter Kit" PDF (discussion questions and a reading schedule template) to attract sign-ups. Within two weeks, she has 40 email addresses from book club organisers she's never met.
- Exercise: Choose one audience-building tactic (wait list or lead magnet) and add it to your product

### 3. Choose Your Domain
Pick the right name and set up a professional presence without overspending.

- How to choose a domain name: keep it short, memorable, and easy to spell. Avoid hyphens and numbers.
- Top-level domain trade-offs: .com is the most recognised but often taken or expensive. .co, .app, .io are alternatives at different price points. Compare what's available for your product name and what fits your budget.
- Why you need a professional email: sending from a gmail.com address undermines trust when you're emailing customers. Google Workspace lets you send from your own domain (e.g., hello@yourdomain.com).
- Budget rule: domain + email shouldn't cost more than $20-30 at this stage
- Register on Google Business Profile to improve your visibility in search
- Toolkit reference: a step-by-step technical setup guide (domain DNS, Google Workspace, SPF/DKIM, email verification with MX Toolbox) is available in the toolkit for this course
- Example: Dalmie considers bookclub.app ($14/year) and bookcluborganiser.com ($12/year). She goes with the .com because her audience isn't technical and .com feels more familiar. She sets up hello@bookcluborganiser.com through Google Workspace and registers her Google Business Profile. Total cost: under $25.
- Exercise: Search for available domains for your product. Compare at least two top-level domain options on price and fit. Purchase your domain and set up a professional email.

### 4. Get Your First Visitors
Drive real people to your product without paying for ads.

- Where to list your product: Product Hunt, BetaList, and startup directories. What each platform expects and how to choose which ones fit your product.
- What a good directory submission looks like: a clear one-line description (use your pitch from Challenge 1), a screenshot that shows the product in action, and a short "why this exists" paragraph. Walk through a before/after example of a weak vs strong submission.
- How to share your product in online communities without being spammy: lead with the problem you solve, not a link. Contribute to the community first. Share your product when it's relevant to a conversation, not as a cold announcement. Include a template for a community post that feels helpful rather than promotional.
- Why talking to people one-on-one is still your best marketing at this stage
- Mention the "Launch and Grow Your Lovable App" course for deeper publishing and growth strategies
- Example: Dalmie writes a community post in a book lovers' forum: "We run a monthly book club and used to lose track of suggestions in WhatsApp. I built a free tool to collect and vote on book picks. Would love feedback from other book club organisers." She gets 20 visitors in the first week. Her Product Hunt listing uses her pitch from Challenge 1 and a screenshot of the voting feature.
- Exercise: Write a directory submission and a community post for your product using the templates. Submit to at least one directory and share in one community where your users spend time.

### 5. Listen to Your First Users
Turn early visitors into a conversation that improves your product.

- Add a feedback or "report a bug" feature into your product so visitors can tell you what's broken or confusing. This turns one-way traffic into a conversation.
- How to ask for feedback: a short message or email is enough. "What did you use it for? What was confusing?" Ask after someone has used your product at least once or twice, not on their first visit.
- Collecting testimonials: if someone shares something positive, ask if you can use it on your landing page. Don't generate fake testimonials with AI. One honest sentence from a real person is worth more than ten polished fake ones.
- Example: Dalmie adds a small "Send feedback" button to the Book Club Organiser. She also emails five book club organisers who signed up in the first week. Three reply with bug reports and suggestions. One writes: "We finally stopped arguing in the group chat about what to read next." Dalmie adds this to her landing page with permission.
- Exercise: Add a feedback feature to your product. Reach out to three people who have used it and ask what worked and what was confusing. If anyone shares something positive, ask to use it as a testimonial.

### 6. Understand What Your Visitors Do
Set up Posthog so you can see how people use your product, not guess.

- What is Posthog? A free analytics tool that shows you what visitors do inside your app
- Key concepts explained simply: sessions (one visit), pageviews (each page someone opens), custom events (specific actions like clicking a button or submitting a form)
- How to prompt your AI app builder to add Posthog correctly. Common mistakes: the tracking code gets added but doesn't fire, or events are named inconsistently. Include a prompt template that avoids these issues.
- Prompt template for adding Posthog: walk the learner through what to include in their prompt (where to place the script, how to name events clearly, how to verify it works)
- What to look at first: which pages get visited, where people drop off, which features get used
- Don't get lost in data. At this stage, you're answering one question: "Are people using the thing I built, and which parts?"
- Example: Dalmie adds Posthog to the Book Club Organiser. She discovers that most visitors create a book club but never add a second book suggestion. She realises the "add a book" flow is confusing and fixes it with one prompt. Usage jumps the next week.
- Exercise: Add Posthog to your product using the prompt template. Wait a few days, then check which pages get the most visits and where people stop using your app.

### 7. Decide What to Charge
Choose a pricing model that fits your product and your audience.

- Pricing strategies for a first product: free vs freemium vs paid
- Pricing psychology basics: how to pick a number that feels right
- How to use what you learned from Posthog and user feedback to inform your pricing: which features do people use most? That's what they'd pay for.
- Example: Dalmie looks at her Posthog data and feedback. The voting feature and reading deadlines are what people use most. She chooses a freemium model: free for book clubs with up to 5 members, $5/month for unlimited members and features like reading stats.
- Exercise: Write down your pricing model and the reasoning behind it. Connect it to what you've learned from your analytics and user feedback.

### 8. Get Ready to Accept Payment
Set up the financial and legal basics so you can receive your first payment.

- What Stripe is and what you need to set it up (e.g., tax number). A separate course covers Stripe integration in detail.
- Simple, free banking solutions for receiving payments: Wise, Revolut
- Before you accept your first payment: find the easiest and cheapest legal framework in your location. Only register a company when you have solid revenue or a deal requires it. Setting up and running a company is costly. Talk to an accountant about your tax situation and the best structure for where you live.
- When to invest more in your business vs keep it as a side project
- When (and whether) to quit your job: recommendations based on traction, not hope
- Example: Dalmie signs up for Stripe and connects a Wise account. She doesn't register a company yet. She books a one-hour call with an accountant to understand her tax obligations as a sole trader and keeps her day job, dedicating five hours a week to growing the Book Club Organiser.
- Exercise: If you're ready, create a Stripe account. Research the simplest legal framework for your location. Book a call with an accountant if you're earning (or about to earn) revenue.

---

## Narrative Arc

The course follows a practical progression from pitch to payment:

1. **Test:** Find the words that make people care
2. **Gather:** Start building your audience before you're "ready"
3. **Claim:** Choose your domain and set up a professional presence
4. **Attract:** Get real visitors to your product
5. **Listen:** Learn from your first users and earn a real testimonial
6. **Measure:** Understand what visitors actually do with analytics
7. **Price:** Choose how to charge based on what you've learned
8. **Launch:** Set up payments and handle the business basics

Each challenge builds on the previous one. Dalmie's Book Club Organiser serves as the running example throughout, showing how a hobby project built for friends can become a real product with paying customers.

---

## Teaching Approach

- **Validation-first mindset:** Don't spend money or time on setup before confirming people want what you built
- **Budget-conscious throughout:** Every recommendation considers cost. The learner shouldn't spend more than $20-30 until they have traction.
- **Action over theory:** Each challenge ends with a concrete exercise the learner completes with their own product
- **No premature complexity:** Legal structures, company registration, and investor conversations are explicitly deferred until they're needed
- **Cross-references to other courses:** "Build a Valuable Product" for idea validation, "Launch and Grow Your Lovable App" for publishing, and a future Stripe integration course
- **Toolkit for technical steps:** Domain DNS setup, Google Workspace configuration, and email verification are covered in a separate toolkit guide, keeping the course focused on business decisions

---

## Skills Covered

- Idea and message validation (pitch testing)
- Audience building (wait lists, lead magnets)
- Domain selection and professional email
- Product distribution and traffic generation (directories, community posts)
- Collecting user feedback and real testimonials
- Product analytics with Posthog
- Pricing strategy for first products
- Legal and financial basics for solo founders

---

## Timing

Total estimated time: ~3 hours (designed for immediate application with real exercises, not passive reading)

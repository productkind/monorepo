---
status: drafted
channels: [events]
account: little-parrot
---

# Portugal Tech Week submission: the Mission 1 workshop

The listing text for the free workshop (Mission 1 in the [learning journey design](../../../../../little-parrot/content/course/technical-skills-for-product-managers-learning-journey-design.md)), ready to paste into the Portugal Tech Week event form.

## Before submitting

- **Where:** https://portugaltechweek.com/submit-event/ (you need to log in to see the form). Published events show a title, categories, date, time, venue, the event content and tags.
- **Their rules, checked on 11 October 2026:**
  - They won't accept events that "try to sell product and services". The text below only teaches and doesn't mention the paid learning path.
  - They prefer in-person events.
  - "Organizer should be related to Portugal." Kinga and Tamas live in Portugal, which covers it. A co-host such as Product Management Society Lisbon or the Volkswagen Lisbon office is optional: it would help with a venue and bring their members.
  - The registration link has to go in the event content.
- **Submit after the decision on Friday 16 October.** This version promises that attendees set up their own development environment and fix the bug with GitHub Copilot, which needs Codespaces. If the trial checks fail and Lisbon runs on one shared copy, remove the "First" and "Finally" paragraphs, the second outcome and the GitHub account, and change the length back to 90 minutes.
- **The trial also has to confirm the Copilot comparison.** The "Finally" paragraph says Copilot does better with the bug report than with a one-line complaint. If the trial runs don't show that, cut the sentence that starts "You'll also see".
- **Images:** a logo at 512 × 512, and a featured image at 1920 × 1080 (1080 × 540 at the very least). The featured image is [`workshop-event-images/export/featured-image-1920x1080.png`](workshop-event-images/export/featured-image-1920x1080.png), with its alt text in the [spec](workshop-event-images/spec.md). The same folder has the square Luma cover.
- **Fill in before submitting:** the date, the time, the venue, the registration link and the number of places.

## Title

How web apps work: for product managers who want to follow the technical conversation

If the form has a short character limit: **How web apps work: a hands-on workshop for product managers**

## Categories and tags

- **Categories:** Information Technologies (IT). Add Artificial Intelligence or Innovation if a second one is allowed. Pick an education or product category instead if the form offers one.
- **Tags:** Product Management, Workshop, Web Apps, Engineering, AI, GitHub Copilot, Web Summit

## Short description

For listings and social posts:

> A hands-on workshop for product managers without an engineering background. You'll see how a web app works by running one yourself and following a failed save through the browser, the server and the database. The next time an engineer explains why something isn't working, you'll know which part of the app they mean and what to ask them.

## Event content

> You know what your product does. When something breaks and your engineers start talking about requests, servers and databases, it's harder to follow what went wrong, and even harder to know what to ask them.
>
> In this 2-hour workshop, you'll learn how a web app works by running one yourself and investigating a bug in it. A customer clicks Save, the app spins, and their new record never appears.
>
> **First, you'll set up your own development environment.** It's the copy of an app that engineers run and change without affecting real customers. Yours runs in GitHub's cloud and opens in your browser, so you won't install anything on your laptop. You'll start the app yourself and watch its parts start up: the database, the server and the frontend.
>
> **Then you'll follow the failed save through every part of the app:**
>
> 1. Open your browser's developer tools and find the request that failed: what it sent and what came back.
> 2. Read the server log, where you'll see the same request arrive and fail, just as an engineer would.
> 3. Check the database and confirm nothing was saved.
> 4. Find the rule that rejected the save, and work out where the bug really is.
>
> You'll draw a map of how the browser, the server and the database connect, and write a bug report with the evidence an engineer needs to fix it.
>
> **Finally, you'll fix the bug with AI.** You'll give your bug report to GitHub Copilot, an AI agent that can change the app's code, and test its fix in your copy of the app. You'll also see why the evidence an engineer asks for helps an AI agent fix the bug too.
>
> The app you'll run is Twenty, a real open-source CRM. It has the same parts as most business software: a frontend, an API, a server and a database.
>
> **By the end, you'll be able to:**
>
> - explain what happens between clicking Save and the data reaching the database;
> - run Twenty in your own development environment, and explain how that differs from the live product your customers use;
> - find a request in your browser's network tab and read its status code and response;
> - tell whether a problem starts in the browser, on the server or in the database;
> - write a bug report with the evidence engineers ask for, and give it to an AI agent to fix.
>
> **Who it's for:** product managers and product owners without an engineering background. You won't write code yourself, and you don't need any technical knowledge.
>
> **What to bring:** a laptop and a free, personal GitHub account. Before the workshop, we'll email you instructions for setting up the account and turning on GitHub Copilot's free plan, plus a short check that your laptop can open your development environment and GitHub Copilot (some company laptops can't).
>
> **Your hosts**
>
> Kinga Magyar spent over a decade in the tech industry, learned to code, moved into product management and worked as a lead product manager. She has mentored product managers and holds an executive coaching diploma.
>
> Tamas Kokeny spent 15+ years as a software engineer and engineering leader. He co-founded Green Fox Academy, a coding school that graduated over 3,000 students into tech careers.
>
> Between them, they've worked at Datadog, Citrix, Volkswagen and Cloudera. In the workshop, they'll guide you through how each part of a web app works, and you'll be able to apply the knowledge to your own product.
>
> Free, in English, with [30] places. Run by LittleParrot.app.
>
> Register here: [registration link]

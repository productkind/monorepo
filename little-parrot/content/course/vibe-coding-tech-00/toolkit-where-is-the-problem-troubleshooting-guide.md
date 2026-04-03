# "Where Is the Problem?" Troubleshooting Guide
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

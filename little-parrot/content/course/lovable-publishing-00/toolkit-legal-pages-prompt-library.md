---
challenge: "3 - Build Trust: Legal Pages That Protect You and Your Users"
---
## Legal Pages Prompt Library

Copy-paste prompts for generating and adding the legal pages your product needs. Adjust the details in brackets to match your app.

*Important: These prompts are for educational purposes and help you get started. They are not legal advice. If your product handles sensitive data or processes payments, consider consulting a lawyer.*

### Generate a privacy policy and terms of use with AI

Use this prompt with an AI assistant like Claude, Gemini, or ChatGPT. It will ask you follow-up questions to create documents tailored to your product.

```
You are an expert lawyer. What information do you need from me to write a Privacy Policy and Terms of Use for my [brief description of your product] where I collect [data you collect, e.g., email addresses, customers' payment methods]?

The Privacy Policy must describe the information collected, its purpose of use, to whom and how to disclose it and reasonable security practices followed to safeguard such information.
```

**Common data you might be collecting** (mention these if they apply):
- Email addresses (for login or contact)
- Names and profile information
- Payment details (through Stripe or similar)
- Usage data (through Google Analytics or PostHog)
- Cookies (for login sessions, analytics, or preferences)

**Alternative approach:** Use [Termly](https://termly.io/) to generate legal documents by answering a questionnaire. It's free for one document and produces more reliable results than a generic AI response.

### Add footer links to your legal pages

Once you have your legal documents, prompt Lovable to make them accessible:

```
Add a footer to all pages with links to:
- Privacy Policy: [attach your privacy policy document]
- Terms of Use: [attach your terms of use document]
- Contact: [your email address]
Use a subtle design that doesn't distract from the main content. Open the links in a new tab.
```

### Add a GDPR-compliant cookie banner

You need a cookie banner if you have users in the EU or UK and use analytics or tracking tools (like Google Analytics). When in doubt, adding one is the safer choice.

```
Add a GDPR compliant cookie consent banner that appears at the bottom of the screen when a user first visits.
- It should have a brief message about using cookies
- An "Accept" button
- A "Customise cookies" feature where they can select which types of cookies to allow (e.g., essential, analytics, marketing)
- Tracking cookies (like Google Analytics) should be disabled until the user gives consent
- Save the user's choice so the banner doesn't appear again on their next visit.
```

### When do you need what?

| Your situation | What you need |
|---------------|---------------|
| Your app has user login (email or Google) | Privacy policy + Terms of use |
| You use Google Analytics or PostHog | Privacy policy + Cookie banner (if users are in EU/UK) |
| You process payments (Stripe) | Privacy policy + Terms of use |
| Your app only shows static content, no login, no tracking | You may not need legal pages, but a privacy policy is still good practice |

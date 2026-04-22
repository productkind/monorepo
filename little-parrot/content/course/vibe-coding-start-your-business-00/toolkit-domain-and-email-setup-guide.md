---
challenge: "2 - Choose Your Domain"
---
## Domain and Email Setup Guide

A step-by-step guide for purchasing your domain, setting up Google Workspace, and configuring your email. Follow these steps after you've decided on your domain name.

### Step 1: Buy your domain

1. Go to [GoDaddy](https://www.godaddy.com/) (or another registrar)
2. Search for the domain name you chose
3. Compare prices across top-level domains (.com, .co, .app)
4. See different variations of the domain name (e.g. bookclub.com, bookcluborganiser.com)
5. Purchase the domain. Avoid upsells for extras like "domain privacy", "domain security" or "website builder". You only need the domain itself.

### Step 2: Set up Google Workspace

1. Go to [Google Workspace](https://workspace.google.com/) and click "Get started"
2. Enter your business name (your product name is fine)
3. Choose "Just you" for the number of employees
4. Enter the email address you want. **Tip:** use your name (e.g., sarah@yourproduct.com). You can add **aliases** later without paying for extra accounts. An alias is an additional email address (like hello@yourproduct.com or support@yourproduct.com) that delivers to your same inbox. This way you have one inbox but multiple addresses for different purposes.
5. Choose the Business Starter plan (around $7/month)
6. Complete the sign-up and payment

**To add aliases after setup:** In [Google Workspace Admin](https://admin.google.com/), go to **Directory > Users**, click your name, then **User information > Alternative email addresses**. Add hello@, support@, or any other alias you need. Emails sent to any alias will arrive in your main inbox.

### Step 3: Connect your domain to Google Workspace

Google Workspace will ask you to verify that you own your domain. It does this by giving you a **TXT record** (a small piece of text) that you add to your domain's settings. This proves to Google that the domain is yours.

**If you bought your domain on GoDaddy, here's how to add it:**

1. Google Workspace gives you a TXT record to copy (it looks like a long string of characters)
2. Log into your [GoDaddy account](https://www.godaddy.com/)
3. Go to **My Products > Domains** and click **DNS** on your domain
4. On the the **DNS Records** tab, click **Add New Record**
5. Select **TXT** as the record type
6. In the **Name** field, add `@`
7. In the **Value** field, paste the TXT record that Google Workspace gave you
8. Leave TTL as the default
9. Click **Save**
10. Go back to Google Workspace and click "Verify". It can take a few minutes, but sometimes up to 48 hours.

**Using a different registrar?** The process is similar: find the DNS settings for your domain, add a new TXT record, and paste the value Google gave you. Search for "[your registrar name] add TXT record" for specific instructions.

### Step 4: Set up email delivery (MX records)

For email to work, you need to point your domain's email to Google's servers. **MX records** tell other email services where to deliver emails sent to your domain.

Google Workspace MX records look like this:

| Priority | Mail server |
|----------|------------|
| 1 | ASPMX.L.GOOGLE.COM |
| 5 | ALT1.ASPMX.L.GOOGLE.COM |
| 5 | ALT2.ASPMX.L.GOOGLE.COM |
| 10 | ALT3.ASPMX.L.GOOGLE.COM |
| 10 | ALT4.ASPMX.L.GOOGLE.COM |

**If you're using GoDaddy:**

1. Log into your [GoDaddy account](https://www.godaddy.com/)
2. Go to **My Products > Domains** and click **DNS** on your domain
3. On the **DNS Records** tab, click **Add New Record** and select **MX** as the type
4. In the **Name** field, add `@`
5. In the **Value** field, enter `ASPMX.L.GOOGLE.COM`
6. Set **Priority** to `1`
7. Leave TTL as the default and click **Save**
8. Repeat steps 3-7 for the remaining four mail servers from the table above, using the matching priority values
9. Verify your MX records are active by going to [MX Toolbox](https://mxtoolbox.com/), entering your domain, and checking that all five Google servers show up

**Using a different registrar?** The process is similar: find your DNS settings, and add the five Google records from the table above. Search for "[your registrar name] add MX records" for specific instructions.

### Step 5: Set up SPF and DKIM

These settings help ensure your emails don't end up in spam folders. Both require adding TXT records to your domain's DNS settings (the same way you did in Step 3).

**SPF (Sender Policy Framework)** tells email services that Google is allowed to send emails on behalf of your domain.

1. Go to your domain registrar's DNS settings (on GoDaddy: **My Products > Domains > DNS** on your domain)
2. Click **Add New Record** and select **TXT** as the type
3. In the **Name** field, add `@`
4. In the **Value** field, paste exactly: `v=spf1 include:_spf.google.com ~all`
5. Leave TTL as the default and click **Save**

**DKIM (DomainKeys Identified Mail)** adds a digital signature to your emails so recipients can verify they really came from you.

1. Go to [Google Workspace Admin](https://admin.google.com/)
2. Navigate to **Apps > Google Workspace > Gmail**
3. Click **Authenticate email**
4. Select your domain and click **Generate new record**
5. Keep the default settings and copy the TXT record value that Google generates
6. Go to your domain registrar's DNS settings and add a new **TXT** record
7. In the **Name** field, enter `google._domainkey` (Google provides this)
8. In the **Value** field, paste the value you copied from Google Workspace
9. Save the record
10. Go back to Google Workspace Admin and click **Start authentication**

It can take up to 48 hours for SPF and DKIM to start working.

### Step 6: Verify everything works

1. Send a test email from your new address (e.g., hello@yourproduct.com) to a personal email
2. Check that it arrives and doesn't land in spam
3. Verify your records using MX Toolbox:
   - **MX records:** Go to [MX Lookup](https://mxtoolbox.com/MXLookup.aspx), enter your domain, and check that all five Google mail servers appear
   - **SPF record:** Go to [SPF Check](https://mxtoolbox.com/spf.aspx), enter your domain, and check that it shows your Google SPF record without errors
   - **DKIM record:** Go to [DKIM Check](https://mxtoolbox.com/dkim.aspx), enter your domain and the selector `google` (formatted as `yourdomain.com:google`), and check that it finds your DKIM key

### Troubleshooting

- **Email not arriving?** MX records can take up to 48 hours to propagate. Wait and try again.
- **Email going to spam?** Check that SPF and DKIM are set up correctly using MX Toolbox.
- **Can't find DNS settings?** Search for "[your registrar name] DNS settings" for specific instructions.

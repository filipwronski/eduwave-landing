# Google Sheets Integration - Security Guide

## Is It Safe? ✅ Yes, with proper measures

### Security Measures Implemented:

#### 1. **Server-Side Protection (Apps Script)**
- ✅ Rate limiting (3 requests per 5 minutes per user)
- ✅ Input validation and sanitization
- ✅ Length limits (max 500 characters per field)
- ✅ Sheet size protection (max 10,000 rows)
- ✅ Polish phone number validation
- ✅ Email format validation

#### 2. **Client-Side Protection (Vue)**
- ✅ Honeypot field (catches bots)
- ✅ Form validation before submission
- ✅ Required fields enforcement

## Setup Instructions:

### Step 1: Create Google Sheet
1. Create new Google Sheet at sheets.google.com
2. Name it "Eduwave Leads"
3. **IMPORTANT:** The script will automatically create headers on first run, OR you can manually add them in row 1:
   ```
   lead_id | created_at | name | phone | email | subject | level | message |
   source | experiment_variant | consent | status | notes |
   utm_source | utm_medium | utm_campaign | utm_term | utm_content
   ```

   **Column descriptions:**
   - `lead_id` - Unique lead identifier (auto-generated)
   - `created_at` - ISO timestamp when form was submitted
   - `name` - User's name
   - `phone` - User's phone number
   - `email` - User's email (optional)
   - `subject` - Selected subject (matematyka, fizyka, etc.)
   - `level` - Education level (matura, IB, A-levels, etc.)
   - `message` - Additional information from user
   - `source` - Traffic source (UTM or GA client ID or "direct")
   - `experiment_variant` - Growthbook A/B test variant
   - `consent` - Cookie consent categories accepted
   - `status` - Lead status (default: "new") - for manual management
   - `notes` - Notes field - for manual management
   - `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` - UTM tracking parameters

### Step 2: Deploy Apps Script
1. In Google Sheet: **Extensions → Apps Script**
2. Copy code from `google-apps-script.js` file
3. Save project (name it "Contact Form Handler")
4. Click **Deploy → New deployment**
5. Settings:
   - Type: **Web app**
   - Execute as: **Me (your email)**
   - Who has access: **Anyone**
6. Click **Deploy**
7. Copy the Web App URL (looks like: `https://script.google.com/macros/s/.../exec`)

### Step 3: Update Vue Component
1. Open `src/components/ContactForm.vue`
2. Find line 279: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'`
3. Replace with your actual URL from Step 2

### Step 4: Test
1. Run your Vue app
2. Fill and submit the form
3. Check Google Sheet for new row

## What Can Still Go Wrong?

### Low Risk:
- **Spam submissions** - Mitigated by rate limiting + honeypot
- **URL discovery** - URL is public but hard to guess

### How to Further Improve:

1. **Add Google reCAPTCHA v3** (Recommended for production)
   ```bash
   npm install @vue-recaptcha/core
   ```

2. **Email Notifications**
   Uncomment the email notification section in `google-apps-script.js` (around line 165):
   ```javascript
   MailApp.sendEmail({
     to: 'your-email@example.com',
     subject: `New Lead: ${validatedData.name}`,
     body: `
       New lead submitted:

       Lead ID: ${validatedData.lead_id}
       Name: ${validatedData.name}
       Phone: ${validatedData.phone}
       Email: ${validatedData.email}
       Subject: ${validatedData.subject}
       Level: ${validatedData.level}
       Source: ${validatedData.source}
       Consent: ${validatedData.consent}
     `
   });
   ```

3. **Use Environment Variables**
   Instead of hardcoding URL, use `.env`:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
   ```

4. **Backend API (Most Secure)**
   - Create Node.js/PHP backend
   - Use Google Sheets API with OAuth
   - Keep credentials server-side
   - Add more complex validation

## Comparison with Other Methods:

| Method | Security | Ease | Cost |
|--------|----------|------|------|
| **Apps Script (Current)** | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Easy | Free |
| Backend + Sheets API | ⭐⭐⭐⭐⭐ Best | ⭐⭐⭐ Medium | Hosting cost |
| Zapier/Make | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Easy | $15+/month |

## Conclusion:

**Yes, it's safe enough for a contact form!**

The Apps Script approach is:
- ✅ Used by thousands of websites
- ✅ Protected against common attacks
- ✅ Free and easy to maintain
- ✅ No sensitive data exposure
- ✅ Rate limited and validated

The worst case scenario is spam submissions, which can be easily cleaned up from the sheet.

For a production site with high traffic, consider adding reCAPTCHA.

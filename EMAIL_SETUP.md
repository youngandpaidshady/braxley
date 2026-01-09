# Email Setup Guide

The contact form now uses server-side email sending instead of client-side `mailto:` links. This provides a better user experience and ensures emails are sent automatically.

## Setup Options

### Option 1: Resend (Recommended)

Resend is a modern email API that's easy to set up and works great with Next.js.

1. **Sign up for Resend**
   - Go to [resend.com](https://resend.com)
   - Create a free account (100 emails/day free tier)
   - Complete the onboarding process

2. **Get your API Key** (Important: Copy immediately!)
   
   **If you're on the onboarding screen:**
   - The API key is shown only ONCE during onboarding
   - **Right-click and select "Copy"** or use `Ctrl+C` (Windows) / `Cmd+C` (Mac)
   - If you can't copy, try selecting the text and copying manually
   - **Save it immediately** - you won't see it again!
   
   **If you missed it or need a new key:**
   - Go to [resend.com/api-keys](https://resend.com/api-keys)
   - Click **"Create API Key"** button
   - Give it a name (e.g., "Braxley Nevim Website")
   - Select permissions: **"Sending access"**
   - Click **"Add"**
   - **IMMEDIATELY copy the key** - it starts with `re_` and looks like: `re_123456789abcdef...`
   - Store it securely (you won't see it again!)

3. **Set Environment Variables**
   Create a `.env.local` file in your project root:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   CONTACT_EMAIL=Braxleynevimllc@outlook.com
   FROM_EMAIL=noreply@braxleynevim.com
   ```
   
   **Note:** For testing, you can use Resend's test domain:
   ```env
   FROM_EMAIL=onboarding@resend.dev
   ```
   This works without domain verification!

4. **For Vercel Deployment**
   - Go to your Vercel project settings
   - Navigate to Environment Variables
   - Add the same variables:
     - `RESEND_API_KEY`
     - `CONTACT_EMAIL`
     - `FROM_EMAIL`

### Option 2: SendGrid

1. **Sign up for SendGrid**
   - Go to [sendgrid.com](https://sendgrid.com)
   - Create a free account (100 emails/day free tier)

2. **Get your API Key**
   - Go to Settings > API Keys
   - Create a new API key with "Mail Send" permissions

3. **Update the API Route**
   Replace the Resend code in `app/api/contact/route.ts` with SendGrid:

   ```typescript
   const sgMail = require('@sendgrid/mail');
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);

   const msg = {
     to: TO_EMAIL,
     from: FROM_EMAIL,
     replyTo: email,
     subject: emailSubject,
     text: emailBody,
     html: `...` // HTML version
   };

   await sgMail.send(msg);
   ```

4. **Install SendGrid**
   ```bash
   npm install @sendgrid/mail
   ```

5. **Set Environment Variables**
   ```env
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
   CONTACT_EMAIL=Braxleynevimllc@outlook.com
   FROM_EMAIL=noreply@braxleynevim.com
   ```

### Option 3: Nodemailer (SMTP)

For custom SMTP servers (Gmail, Outlook, custom email server):

1. **Install Nodemailer**
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

2. **Update the API Route**
   Replace the email sending code in `app/api/contact/route.ts`:

   ```typescript
   import nodemailer from 'nodemailer';

   const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: parseInt(process.env.SMTP_PORT || '587'),
     secure: false, // true for 465, false for other ports
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASSWORD,
     },
   });

   await transporter.sendMail({
     from: FROM_EMAIL,
     to: TO_EMAIL,
     replyTo: email,
     subject: emailSubject,
     text: emailBody,
     html: `...` // HTML version
   });
   ```

3. **Set Environment Variables**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   CONTACT_EMAIL=Braxleynevimllc@outlook.com
   FROM_EMAIL=noreply@braxleynevim.com
   ```

## Testing

### Development Mode
Without an API key set, the form will:
- Still accept submissions
- Log the email to console
- Return success (for testing UI)
- Show a note that email wasn't sent

### Production Mode
With an API key set:
- Emails will be sent automatically
- Users get immediate confirmation
- No email client required

## Security Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use environment variables** - Never hardcode API keys
3. **Rate limiting** - Consider adding rate limiting for production
4. **Spam protection** - Consider adding reCAPTCHA or similar

## Rate Limiting (Optional)

To prevent spam, you can add rate limiting:

```bash
npm install @upstash/ratelimit @upstash/redis
```

Then add to your API route before processing the request.

## Current Implementation

The current setup uses Resend by default, but falls back to console logging if no API key is set. This allows:
- Development without email service
- Easy production setup with just an API key
- No breaking changes during development

## Troubleshooting

### Emails not sending
1. Check environment variables are set correctly
2. Verify API key is valid
3. Check email service dashboard for errors
4. Review server logs for error messages

### CORS errors
- API routes don't have CORS issues in Next.js
- If you see CORS errors, check your fetch URL is correct

### Form submission fails
- Check browser console for errors
- Verify API route is accessible at `/api/contact`
- Check network tab for request/response details

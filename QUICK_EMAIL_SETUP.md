# Quick Email Setup - Resend API Key

## Problem: Can't Copy API Key from Onboarding Screen

If you're stuck on Resend's onboarding screen and can't copy the API key, here's how to fix it:

## Solution 1: Copy from Onboarding (Try These Methods)

1. **Manual Selection:**
   - Click and drag to select the entire API key text
   - Press `Ctrl+C` (Windows) or `Cmd+C` (Mac)
   - Or right-click and select "Copy"

2. **Keyboard Shortcut:**
   - Click on the API key text field
   - Press `Ctrl+A` to select all
   - Press `Ctrl+C` to copy

3. **Browser DevTools (If above doesn't work):**
   - Press `F12` to open DevTools
   - Go to Console tab
   - Type: `document.querySelector('[data-api-key]')?.textContent` or look for the key in Elements tab

## Solution 2: Create a New API Key (Recommended)

If you missed copying the key, just create a new one:

1. **Skip/Complete Onboarding:**
   - Click "Skip" or "Continue" to finish onboarding
   - You'll be taken to the dashboard

2. **Create New API Key:**
   - Go to: https://resend.com/api-keys
   - Click the **"Create API Key"** button (top right)
   - Name it: `Braxley Nevim Website`
   - Permission: Select **"Sending access"**
   - Click **"Add"**
   - **IMMEDIATELY copy the key** - it starts with `re_`
   - Paste it somewhere safe (Notes, text file, password manager)

3. **Add to Your Project:**
   - Create `.env.local` in your project root:
   ```env
   RESEND_API_KEY=re_paste_your_key_here
   CONTACT_EMAIL=Braxleynevimllc@outlook.com
   FROM_EMAIL=onboarding@resend.dev
   ```

4. **Test It:**
   - Restart your dev server: `npm run dev`
   - Submit the contact form
   - Check your email!

## Quick Setup (No Domain Verification Needed)

For testing, use Resend's test domain - no verification required:

```env
RESEND_API_KEY=re_your_key_here
CONTACT_EMAIL=Braxleynevimllc@outlook.com
FROM_EMAIL=onboarding@resend.dev
```

This works immediately without any domain setup!

## Troubleshooting

**"API key not working":**
- Make sure it starts with `re_`
- Check for extra spaces when copying
- Verify the key is in `.env.local` (not `.env`)
- Restart your dev server after adding the key

**"Can't find API Keys page":**
- Go directly to: https://resend.com/api-keys
- Or: Dashboard → Settings → API Keys

**"Still showing onboarding":**
- Complete the onboarding steps
- Or skip if there's a skip option
- Then go to API Keys section

## Next Steps

Once you have the API key:
1. Add it to `.env.local`
2. Restart dev server
3. Test the contact form
4. For production, add the same variables to Vercel

That's it! Your contact form will now send emails automatically.

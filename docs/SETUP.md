# Google Sheets Integration Setup Guide

This guide will help you set up the Google Sheets webhook integration for the waitlist form.

## Prerequisites

- A Google account
- Access to Google Sheets
- Access to Google Apps Script

## Step-by-Step Setup

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Waitlist Submissions" (optional)
4. The script will automatically create the header row when the first submission is received

### 2. Set Up Google Apps Script

1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any default code in the editor
3. Copy the entire contents of `docs/google-apps-script.js` from this repository
4. Paste it into the Apps Script editor
5. (Optional) Update the `SHEET_NAME` constant if your sheet tab has a different name (default is "Sheet1")
6. Click **Save** (💾) or press `Ctrl+S` / `Cmd+S`
7. Give your project a name (e.g., "Waitlist Webhook")

### 3. Deploy as Web App

1. In the Apps Script editor, click **Deploy** > **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Configure the deployment:
   - **Description**: "Waitlist Form Webhook" (optional)
   - **Execute as**: Select **Me** (your email address)
   - **Who has access**: Select **Anyone**
4. Click **Deploy**
5. **Important**: You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** > **Go to [Project Name] (unsafe)**
   - Click **Allow**
6. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

### 4. Configure Environment Variables

1. In the project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace the placeholder URL with your actual web app URL:
   ```
   VITE_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec
   ```

3. Save the file

### 5. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Fill out the waitlist form on your site

3. Submit the form

4. Check your Google Sheet - you should see a new row with the submitted data

5. Check the browser console for any errors

## Troubleshooting

### Form submission fails with "Webhook URL is not configured"

- Make sure you've created a `.env` file (not just `.env.example`)
- Verify the `VITE_GOOGLE_SHEETS_WEBHOOK_URL` is set correctly
- Restart your development server after creating/updating `.env`

### Form submission fails with CORS errors

- Make sure you deployed the web app with "Who has access" set to **Anyone**
- Verify the web app URL is correct
- Check that the script is deployed (not just saved)

### Data not appearing in Google Sheet

- Check the Apps Script execution log:
  1. Go to Apps Script editor
  2. Click **Executions** (clock icon) in the left sidebar
  3. Look for any errors
- Verify the `SHEET_NAME` constant matches your sheet tab name
- Make sure you authorized the script when deploying

### Testing the Script Manually

You can test the Google Apps Script directly:

1. In the Apps Script editor, select the `testDoPost` function from the function dropdown
2. Click **Run** ▶️
3. Check the **Execution log** (View > Logs or `Ctrl+Enter`)
4. Verify the test data appears in your sheet

## Sheet Structure

The script automatically creates these columns:

| Column | Description |
|--------|-------------|
| Timestamp | When the form was submitted |
| Full Name | User's full name |
| Email | User's email address |
| WhatsApp | User's WhatsApp number |
| LinkedIn | User's LinkedIn profile URL (optional) |
| Profession | User's profession |
| AI Knowledge | Level: beginner, intermediate, or advanced |
| Tools Used | Comma-separated list of AI tools |
| Computer Type | windows, mac, linux, or other |
| Specs | Computer specifications (optional) |
| Primary Goal | voice-agents, chatbots, content-workflows, or all |
| Specific Outcome | User's specific goal description |
| Consent | Yes or No |

## Security Notes

- The web app URL is public and can be called by anyone
- Consider adding rate limiting or authentication if needed
- The script validates all required fields before writing to the sheet
- Sensitive data (emails, phone numbers) will be stored in Google Sheets - ensure proper access controls

## Updating the Script

If you need to update the script:

1. Make changes in the Apps Script editor
2. Click **Deploy** > **Manage deployments**
3. Click the pencil icon ✏️ next to your deployment
4. Click **New version**
5. Click **Deploy**
6. The web app URL remains the same - no need to update `.env`


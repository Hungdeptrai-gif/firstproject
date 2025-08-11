# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for order management in your The Luvin Gifts application.

## Prerequisites

1. A Google account
2. Node.js installed on your system
3. Basic knowledge of Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"

## Step 2: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `theluvingifts-orders`
   - Description: `Service account for order management`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 3: Generate Service Account Key

1. In the Credentials page, find your service account
2. Click on the service account email
3. Go to the "Keys" tab
4. Click "Add Key" > "Create new key"
5. Choose "JSON" format
6. Download the JSON file
7. Rename it to `credentials.json` and place it in the `server/` directory

## Step 4: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "The Luvin Gifts Orders"
4. Copy the spreadsheet ID from the URL:
   - The URL will look like: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the `SPREADSHEET_ID` part

## Step 5: Share the Sheet

1. In your Google Sheet, click "Share" (top right)
2. Add your service account email (found in credentials.json) with "Editor" permissions
3. Make sure to uncheck "Notify people" to avoid sending emails

## Step 6: Configure Environment Variables

1. Create a `.env` file in the `server/` directory:
   ```bash
   GOOGLE_SHEET_ID=your_spreadsheet_id_here
   PORT=5000
   ```

2. Replace `your_spreadsheet_id_here` with the actual spreadsheet ID from Step 4

## Step 7: Install Server Dependencies

```bash
cd server
npm install
```

## Step 8: Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## Step 9: Test the Integration

1. Start your React application: `npm start`
2. Go through the order process
3. Check your Google Sheet - you should see the order data appear

## Step 10: Access Admin Dashboard

1. Navigate to `http://localhost:3000/admin` in your browser
2. You should see the order management dashboard
3. You can view, edit, and update order statuses

## Troubleshooting

### Common Issues:

1. **"Invalid credentials" error**
   - Make sure `credentials.json` is in the correct location
   - Verify the service account has access to the sheet

2. **"Spreadsheet not found" error**
   - Check that the spreadsheet ID is correct
   - Ensure the service account has been shared with the sheet

3. **CORS errors**
   - Make sure the server is running on port 5000
   - Check that the React app is configured to connect to the correct URL

4. **"Permission denied" error**
   - Verify the service account has "Editor" permissions on the sheet
   - Check that the Google Sheets API is enabled

### Security Notes:

- Never commit `credentials.json` to version control
- Add `credentials.json` to your `.gitignore` file
- Consider using environment variables for production deployments

## Production Deployment

For production deployment:

1. Set up environment variables on your hosting platform
2. Upload the `credentials.json` file securely
3. Update the API URL in your React app to point to your production server
4. Consider using a more secure authentication method for production

## Features

Once set up, you'll have:

- ✅ Automatic order saving to Google Sheets
- ✅ Real-time order management dashboard
- ✅ Order status tracking
- ✅ Customer information management
- ✅ Customization details logging
- ✅ Order notes and updates

## Support

If you encounter any issues, check:
1. Google Cloud Console logs
2. Server console output
3. Browser developer tools for network errors
4. Google Sheets API documentation

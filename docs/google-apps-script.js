/**
 * Google Apps Script Webhook Handler for Waitlist Form
 * 
 * This script receives POST requests from the frontend waitlist form
 * and writes the data to a Google Sheet.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Open Extensions > Apps Script
 * 3. Replace the default code with this script
 * 4. Update the SHEET_NAME constant to match your sheet name (default: "Sheet1")
 * 5. Save the script
 * 6. Deploy as a web app:
 *    - Click "Deploy" > "New deployment"
 *    - Choose type: "Web app"
 *    - Description: "Waitlist Form Webhook" (optional)
 *    - Execute as: "Me" (YOUR email address)
 *    - Who has access: "Anyone" (CRITICAL: Must be "Anyone", NOT "Anyone with Google account")
 *    - Click "Deploy"
 * 7. Authorize the script when prompted:
 *    - Click "Authorize access"
 *    - Choose your Google account
 *    - Click "Advanced" > "Go to [Project Name] (unsafe)"
 *    - Click "Allow"
 * 8. Copy the web app URL and use it as VITE_GOOGLE_SHEETS_WEBHOOK_URL
 * 
 * CORS TROUBLESHOOTING:
 * If you get CORS errors, verify:
 * - Deployment "Who has access" is set to "Anyone" (not "Anyone with Google account")
 * - The web app URL is correct and accessible
 * - You've authorized the script permissions
 * - After making changes, redeploy as a new version
 * 
 * SHEET STRUCTURE:
 * The script will automatically create headers if they don't exist:
 * Timestamp | Full Name | Email | WhatsApp | LinkedIn | Profession | AI Knowledge | Tools Used | Computer Type | Specs | Primary Goal | Specific Outcome | Consent
 */

// Configuration: Update this to match your Google Sheet tab name
const SHEET_NAME = "Sheet1";

/**
 * Main handler for POST requests
 * @param {Object} e - Event object containing the request data
 * @returns {Object} JSON response
 */
function doPost(e) {
  try {
    // Check if postData exists
    if (!e || !e.postData || !e.postData.contents) {
      return createErrorResponse(400, "No data received in request");
    }
    
    // Parse the JSON payload
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return createErrorResponse(400, "Invalid JSON format: " + parseError.toString());
    }
    
    // Validate required fields
    const validationError = validateData(data);
    if (validationError) {
      return createErrorResponse(400, validationError);
    }
    
    // Get or create the sheet
    const sheet = getOrCreateSheet();
    
    // Ensure headers exist
    ensureHeaders(sheet);
    
    // Prepare row data
    const rowData = prepareRowData(data);
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return createSuccessResponse("Form submitted successfully");
    
  } catch (error) {
    // Log error for debugging (visible in Apps Script execution log)
    console.error("Error processing request:", error);
    
    // Return error response
    return createErrorResponse(500, "Internal server error: " + error.toString());
  }
}

/**
 * Handle GET requests (for testing)
 * Note: CORS is handled automatically by Google Apps Script when deployed correctly
 * Make sure deployment settings are:
 * - Execute as: "Me"
 * - Who has access: "Anyone" (NOT "Anyone with Google account")
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, message: "Webhook is active" }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Validates the incoming data
 * @param {Object} data - The form data object
 * @returns {string|null} Error message or null if valid
 */
function validateData(data) {
  const requiredFields = [
    'fullName',
    'email',
    'whatsapp',
    'profession',
    'aiKnowledge',
    'toolsUsed',
    'computerType',
    'primaryGoal',
    'specificOutcome',
    'consent'
  ];
  
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      return `Missing required field: ${field}`;
    }
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return "Invalid email format";
  }
  
  // Validate consent is true
  if (data.consent !== true) {
    return "Consent must be true";
  }
  
  // Validate toolsUsed is an array with at least one item
  if (!Array.isArray(data.toolsUsed) || data.toolsUsed.length === 0) {
    return "toolsUsed must be a non-empty array";
  }
  
  return null;
}

/**
 * Gets or creates the target sheet
 * @returns {Sheet} The Google Sheet object
 */
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  
  return sheet;
}

/**
 * Ensures the header row exists with correct column names
 * @param {Sheet} sheet - The Google Sheet object
 */
function ensureHeaders(sheet) {
  const headers = [
    "Timestamp",
    "Full Name",
    "Email",
    "WhatsApp",
    "LinkedIn",
    "Profession",
    "AI Knowledge",
    "Tools Used",
    "Computer Type",
    "Specs",
    "Primary Goal",
    "Specific Outcome",
    "Consent"
  ];
  
  // Check if headers already exist
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const headersExist = firstRow.every((cell, index) => cell === headers[index]);
  
  if (!headersExist) {
    // Clear first row and set headers
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format header row (bold, background color)
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4285f4");
    headerRange.setFontColor("#ffffff");
    
    // Freeze header row
    sheet.setFrozenRows(1);
  }
}

/**
 * Prepares row data from form data
 * @param {Object} data - The form data object
 * @returns {Array} Array of values for the row
 */
function prepareRowData(data) {
  return [
    new Date(), // Timestamp
    data.fullName || "",
    data.email || "",
    data.whatsapp || "",
    data.linkedin || "",
    data.profession || "",
    data.aiKnowledge || "",
    data.toolsUsed.join(", "), // Convert array to comma-separated string
    data.computerType || "",
    data.specs || "",
    data.primaryGoal || "",
    data.specificOutcome || "",
    data.consent ? "Yes" : "No"
  ];
}

/**
 * Creates a response with CORS support
 * Note: Google Apps Script web apps handle CORS automatically when deployed with "Anyone" access
 * @param {string} content - The response content
 * @returns {Object} Response object
 */
function createCORSResponse(content) {
  return ContentService
    .createTextOutput(content || "")
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Creates a success JSON response
 * Google Apps Script automatically handles CORS when deployed with "Anyone" access
 * @param {string} message - Success message
 * @returns {Object} JSON response object
 */
function createSuccessResponse(message) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: message
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Creates an error JSON response
 * Google Apps Script automatically handles CORS when deployed with "Anyone" access
 * @param {number} statusCode - HTTP status code
 * @param {string} errorMessage - Error message
 * @returns {Object} JSON response object
 */
function createErrorResponse(statusCode, errorMessage) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: errorMessage,
      statusCode: statusCode
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function for development/debugging
 * Run this function manually in Apps Script editor to test the script
 */
function testDoPost() {
  const testData = {
    fullName: "John Doe",
    email: "john@example.com",
    whatsapp: "+1234567890",
    linkedin: "https://linkedin.com/in/johndoe",
    profession: "Software Engineer",
    aiKnowledge: "intermediate",
    toolsUsed: ["chatgpt", "claude"],
    computerType: "mac",
    specs: "16GB RAM, M1 Chip",
    primaryGoal: "voice-agents",
    specificOutcome: "I want to build a voice agent for customer support",
    consent: true
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}


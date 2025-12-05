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
    // Log the incoming request for debugging
    console.log("Received POST request");
    
    // Check if postData exists
    if (!e || !e.postData || !e.postData.contents) {
      console.error("No data received");
      return createErrorResponse(400, "No data received in request");
    }
    
    console.log("Raw data:", e.postData.contents);
    
    // Parse the JSON payload
    let data;
    try {
      data = JSON.parse(e.postData.contents);
      console.log("Parsed data:", JSON.stringify(data));
    } catch (parseError) {
      console.error("Parse error:", parseError);
      return createErrorResponse(400, "Invalid JSON format: " + parseError.toString());
    }
    
    // Validate required fields
    const validationError = validateData(data);
    if (validationError) {
      console.error("Validation error:", validationError);
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
    console.log("Row appended successfully");
    
    // Return success response
    return createSuccessResponse("Form submitted successfully", {
      timestamp: new Date().toISOString(),
      rowNumber: sheet.getLastRow()
    });
    
  } catch (error) {
    // Log error for debugging
    console.error("Error processing request:", error);
    
    // Return error response
    return createErrorResponse(500, "Internal server error: " + error.toString());
  }
}

/**
 * Handle GET requests (for testing and verification)
 */
function doGet(e) {
  const response = {
    success: true,
    message: "AI Masterclass Form Webhook is active",
    timestamp: new Date().toISOString(),
    sheetName: SHEET_NAME,
    status: "ready"
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response, null, 2))
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
    console.log("Created new sheet:", SHEET_NAME);
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
  
  // Check if sheet is empty - create headers if so
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    formatHeaderRow(sheet, headers.length);
    console.log("Headers created (empty sheet)");
    return;
  }
  
  // Defensive check: Verify headers exist and match expected format
  // This handles cases where headers were deleted or corrupted after data exists
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const headersExist = firstRow.length === headers.length && 
                       firstRow.every((cell, index) => cell === headers[index]);
  
  if (!headersExist) {
    // Headers are missing or don't match - recreate them
    // Insert a new row at the top to preserve existing data
    sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    formatHeaderRow(sheet, headers.length);
    console.log("Headers recreated (headers were missing or corrupted)");
  }
}

/**
 * Formats the header row with styling
 * @param {Sheet} sheet - The Google Sheet object
 * @param {number} headerCount - Number of header columns
 */
function formatHeaderRow(sheet, headerCount) {
  const headerRange = sheet.getRange(1, 1, 1, headerCount);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#4285f4");
  headerRange.setFontColor("#ffffff");
  sheet.setFrozenRows(1);
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
    Array.isArray(data.toolsUsed) ? data.toolsUsed.join(", ") : data.toolsUsed,
    data.computerType || "",
    data.specs || "",
    data.primaryGoal || "",
    data.specificOutcome || "",
    data.consent ? "Yes" : "No"
  ];
}

/**
 * Creates a success JSON response
 * @param {string} message - Success message
 * @param {Object} data - Additional data to include
 * @returns {Object} JSON response object
 */
function createSuccessResponse(message, data = {}) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: message,
      ...data
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Creates an error JSON response
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
 * Run this in Apps Script editor to verify everything works
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
  
  // Also check the sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  Logger.log("Last row number:", sheet.getLastRow());
}


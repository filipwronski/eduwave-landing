// Enhanced Google Apps Script with security measures
// Deploy this in your Google Sheet: Extensions → Apps Script

// Simple rate limiting using Cache Service
function checkRateLimit(identifier) {
  const cache = CacheService.getScriptCache();
  const key = 'ratelimit_' + identifier;
  const attempts = cache.get(key);

  if (attempts && parseInt(attempts) > 3) {
    return false; // Too many requests
  }

  cache.put(key, (parseInt(attempts) || 0) + 1, 300); // 5 minutes
  return true;
}

// Server-side validation
function validateData(data) {
  // Required fields
  if (!data.name || data.name.trim().length < 2) {
    throw new Error('Invalid name');
  }

  if (!data.phone || !/^(\+48)?[1-9]\d{8}$/.test(data.phone.replace(/\s/g, ''))) {
    throw new Error('Invalid phone number');
  }

  // Email validation (if provided)
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new Error('Invalid email');
  }

  // Sanitize inputs to prevent injection
  const sanitize = (str) => {
    if (!str) return '';
    return String(str).substring(0, 500); // Limit length
  };

  return {
    name: sanitize(data.name),
    phone: sanitize(data.phone),
    email: sanitize(data.email),
    subject: sanitize(data.subject),
    curriculum: sanitize(data.curriculum),
    additionalInformation: sanitize(data.additionalInformation)
  };
}

function doPost(e) {
  try {
    // Check rate limit based on a combination of fields
    const data = JSON.parse(e.postData.contents);
    const identifier = data.phone || data.email || 'anonymous';

    if (!checkRateLimit(identifier)) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Too many requests. Please try again later.'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Validate and sanitize data
    const validatedData = validateData(data);

    // Get the sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Check if sheet has too many rows (prevent DoS)
    if (sheet.getLastRow() > 10000) {
      throw new Error('Sheet capacity reached');
    }

    // Add row with validated data
    sheet.appendRow([
      new Date(),
      validatedData.name,
      validatedData.phone,
      validatedData.email,
      validatedData.subject,
      validatedData.curriculum,
      validatedData.additionalInformation
    ]);

    // Optional: Send email notification
    // MailApp.sendEmail({
    //   to: 'your-email@example.com',
    //   subject: 'New Contact Form Submission',
    //   body: `New submission from ${validatedData.name}`
    // });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Submission failed. Please check your data.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

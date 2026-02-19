// Enhanced Google Apps Script for Eduwave Lead Collection
// Deploy this in your Google Sheet: Extensions → Apps Script
//
// SETUP INSTRUCTIONS:
// 1. Create headers in your Google Sheet (row 1):
//    lead_id | created_at | name | phone | email | subject | level | message |
//    source | experiment_variant | consent | status | notes |
//    utm_source | utm_medium | utm_campaign | utm_term | utm_content
//
// 2. Deploy as Web App:
//    - Click "Deploy" → "New deployment"
//    - Type: "Web app"
//    - Execute as: "Me"
//    - Who has access: "Anyone"
//    - Copy the Web App URL to your ContactForm.vue

// Simple rate limiting using Cache Service
function checkRateLimit(identifier) {
  const cache = CacheService.getScriptCache();
  const key = 'ratelimit_' + identifier;
  const attempts = cache.get(key);

  if (attempts && parseInt(attempts) > 5) {
    return false; // Too many requests (max 5 per 5 minutes)
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
    lead_id: sanitize(data.lead_id),
    created_at: data.created_at || new Date().toISOString(),
    name: sanitize(data.name),
    phone: sanitize(data.phone),
    email: sanitize(data.email),
    subject: sanitize(data.subject),
    level: sanitize(data.level),
    message: sanitize(data.message),
    source: sanitize(data.source),
    experiment_variant: sanitize(data.experiment_variant),
    consent: sanitize(data.consent),
    status: sanitize(data.status) || 'new',
    notes: sanitize(data.notes) || '',
    utm_source: sanitize(data.utm_source),
    utm_medium: sanitize(data.utm_medium),
    utm_campaign: sanitize(data.utm_campaign),
    utm_term: sanitize(data.utm_term),
    utm_content: sanitize(data.utm_content)
  };
}

// Initialize sheet with headers if needed
function initializeSheet(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'lead_id',
      'created_at',
      'name',
      'phone',
      'email',
      'subject',
      'level',
      'message',
      'source',
      'experiment_variant',
      'consent',
      'status',
      'notes',
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content'
    ]);

    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, 18);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#671E75');
    headerRange.setFontColor('#FFFFFF');

    // Auto-resize columns
    for (let i = 1; i <= 18; i++) {
      sheet.autoResizeColumn(i);
    }
  }
}

// Handle preflight requests
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'OK', version: '2.0' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    // Parse data from URL-encoded or JSON format
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch {
      // If JSON parsing fails, parse as URL-encoded
      data = e.parameter;
    }

    // Rate limiting
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

    // Initialize headers if needed
    initializeSheet(sheet);

    // Check if sheet has too many rows (prevent DoS)
    if (sheet.getLastRow() > 10000) {
      throw new Error('Sheet capacity reached. Please create a new sheet.');
    }

    // Add row with all data
    sheet.appendRow([
      validatedData.lead_id,
      validatedData.created_at,
      validatedData.name,
      validatedData.phone,
      validatedData.email,
      validatedData.subject,
      validatedData.level,
      validatedData.message,
      validatedData.source,
      validatedData.experiment_variant,
      validatedData.consent,
      validatedData.status,
      validatedData.notes,
      validatedData.utm_source,
      validatedData.utm_medium,
      validatedData.utm_campaign,
      validatedData.utm_term,
      validatedData.utm_content
    ]);

    // Optional: Send email notification
    // MailApp.sendEmail({
    //   to: 'your-email@example.com',
    //   subject: `New Lead: ${validatedData.name}`,
    //   body: `
    //     New lead submitted:
    //
    //     Lead ID: ${validatedData.lead_id}
    //     Name: ${validatedData.name}
    //     Phone: ${validatedData.phone}
    //     Email: ${validatedData.email}
    //     Subject: ${validatedData.subject}
    //     Level: ${validatedData.level}
    //     Source: ${validatedData.source}
    //     Consent: ${validatedData.consent}
    //   `
    // });

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        lead_id: validatedData.lead_id
      }))
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

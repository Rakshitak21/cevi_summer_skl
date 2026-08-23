/**
 * Vision Summer School — Google Apps Script Backend
 * 
 * Instructions:
 * 1. Open a new Google Sheet (e.g. "Vision Summer School Submissions").
 * 2. Click on "Extensions" > "Apps Script".
 * 3. Delete any code in Code.gs and paste this entire file.
 * 4. Click "Deploy" > "New deployment".
 * 5. Select type: "Web app".
 * 6. Set Description: "Vision Tracker Backend".
 * 7. Set Execute as: "Me".
 * 8. Set Who has access: "Anyone". (CRITICAL)
 * 9. Click "Deploy", authorize permissions, and COPY the Web App URL.
 * 10. Paste the URL into `index.html` where it says `SCRIPT_URL`.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for other concurrent requests
  lock.tryLock(30000);

  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Tab name format: e.g. "Ch1 - Regression"
    var tabName = "Ch " + data.chapter_id + " - " + data.chapter_title.split("—")[0].trim();
    if (tabName.length > 30) {
      tabName = tabName.substring(0, 30);
    }

    var sheet = ss.getSheetByName(tabName);

    // If tab doesn't exist, create it and add headers
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
      var headerRow = [
        "Timestamp",
        "USN",
        "Full Name",
        "Chapter",
        "Q1 (Single Line)",
        "Q2 (Single Line)",
        "Q3 (Brief Answer)"
      ];
      
      sheet.appendRow(headerRow);
      
      // Style headers: bold, dark blue background, white text
      var headerRange = sheet.getRange(1, 1, 1, headerRow.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1e3a8a");
      headerRange.setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }

    // Append the student's submission row
    var newRow = [
      data.timestamp || new Date().toLocaleString(),
      data.usn,
      data.name,
      data.chapter_title,
      data.q1,
      data.q2,
      data.q3
    ];

    sheet.appendRow(newRow);

    // Auto-resize columns for readability
    for (var i = 1; i <= 7; i++) {
      sheet.autoResizeColumn(i);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Submission logged for " + data.usn
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Vision Summer School Progress Tracker Backend is running active.");
}

/**
 * Wedding RSVP backend — Google Apps Script
 * ------------------------------------------
 * This script receives RSVP submissions from the website and appends
 * each one as a new row in the bound Google Sheet.
 *
 * SETUP (full steps are in README.md):
 *   1. Create a Google Sheet.
 *   2. Extensions > Apps Script, paste this file.
 *   3. Deploy > New deployment > type "Web app".
 *        - Execute as: Me
 *        - Who has access: Anyone
 *   4. Copy the Web app URL and paste it into app.js (RSVP_ENDPOINT).
 */

// Header row written to the sheet (order must match appendRow below).
const HEADERS = [
  "Timestamp (server)",
  "Submitted At (client)",
  "Name / Family",
  "Attending",
  "Guests",
  "Shuttle",
  "Shuttle Seats",
  "Message",
  "Language"
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const sheet = getSheet_();
    let data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    sheet.appendRow([
      new Date(),
      data.submittedAt || "",
      data.name || "",
      data.attending || "",
      data.guests || "",
      data.shuttle || "",
      data.shuttleSeats || "",
      data.message || "",
      data.language || ""
    ]);

    return jsonResponse_({ result: "success" });
  } catch (err) {
    return jsonResponse_({ result: "error", message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Allows a quick browser test of the deployment URL.
function doGet() {
  return jsonResponse_({ result: "ok", message: "RSVP endpoint is live." });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("RSVPs");
  if (!sheet) {
    sheet = ss.insertSheet("RSVPs");
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

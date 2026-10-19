/**
 * Wedding RSVP backend — Google Apps Script
 * ------------------------------------------
 * - Appends each RSVP as a new row in the bound Google Sheet.
 * - If the guest supplied an email, sends them a confirmation email
 *   (in their chosen language) with a summary of their reply and all the
 *   wedding information.
 *
 * SETUP (full steps in README.md):
 *   1. Create a Google Sheet.
 *   2. Extensions > Apps Script, paste this file.
 *   3. Deploy > New deployment > "Web app"
 *        - Execute as: Me
 *        - Who has access: Anyone
 *   4. Copy the Web app URL into app.js (RSVP_ENDPOINT).
 *
 *   NOTE: after changing this file you must redeploy a NEW VERSION
 *   (Deploy > Manage deployments > edit > Version: New version).
 *   The first time it sends an email, Google will ask for extra
 *   authorization (to send mail on your behalf) — allow it.
 */

const HEADERS = [
  "Timestamp (server)",
  "Submitted At (client)",
  "Name / Family",
  "Email",
  "Attending",
  "Guests",
  "Shuttle",
  "Shuttle Seats",
  "Message",
  "Language"
];

/* Fixed wedding details reused in the confirmation email. */
const WEDDING = {
  coupleEl: "Περικλής & Γένεσις",
  couple: "Periklis & Génesis",
  churchMapLink: "https://maps.app.goo.gl/PeHwk2jD9yUeCwbf6",
  venueMapLink: "https://maps.app.goo.gl/vVzLNeqgdw6FoMfp8"
};

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
      data.email || "",
      data.attending || "",
      data.guests || "",
      data.shuttle || "",
      data.shuttleSeats || "",
      data.message || "",
      data.language || ""
    ]);
    console.log("Row appended. Spreadsheet: " + SpreadsheetApp.getActiveSpreadsheet().getName() +
                " | URL: " + SpreadsheetApp.getActiveSpreadsheet().getUrl() +
                " | rows now: " + sheet.getLastRow());

    if (data.email && /\S+@\S+\.\S+/.test(data.email)) {
      try { sendConfirmation_(data); } catch (mailErr) { console.error("Email failed: " + mailErr); }
    }

    return jsonResponse_({ result: "success" });
  } catch (err) {
    return jsonResponse_({ result: "error", message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Run this manually from the editor to verify storage works against the
 * spreadsheet you are looking at. It appends a clearly-marked test row and
 * logs which spreadsheet it wrote to.
 */
function testStore() {
  const sheet = getSheet_();
  sheet.appendRow([new Date(), "", "STORE TEST", "", "test", "", "", "", "", ""]);
  Logger.log("Wrote STORE TEST to: " + SpreadsheetApp.getActiveSpreadsheet().getName() +
             " (" + SpreadsheetApp.getActiveSpreadsheet().getUrl() + "), rows now: " + sheet.getLastRow());
}

function doGet() {
  return jsonResponse_({ result: "ok", message: "RSVP endpoint is live." });
}

/**
 * Run this manually from the Apps Script editor (select "testEmail" in the
 * function dropdown, click Run). It will:
 *   1. Prompt you to authorize sending email (the missing permission).
 *   2. Send a sample confirmation to your own Gmail so you can see it works.
 * Check your inbox AND spam folder afterwards.
 */
function testEmail() {
  const me = Session.getActiveUser().getEmail();
  sendConfirmation_({
    name: "Test Guest",
    email: me,
    attending: "yes",
    guests: "3",
    shuttle: "yes",
    shuttleSeats: "2",
    message: "This is a test.",
    language: "el"
  });
  Logger.log("Test email sent to: " + me);
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("RSVPs");
  if (!sheet) sheet = ss.insertSheet("RSVPs");
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

/* ============================================================
   CONFIRMATION EMAIL
   ============================================================ */
function sendConfirmation_(data) {
  const lang = EMAIL_I18N[data.language] ? data.language : "el";
  const t = EMAIL_I18N[lang];
  const attending = data.attending === "yes";
  const yn = (v) => (v === "yes" ? t.yes : t.no);
  const couple = lang === "el" ? WEDDING.coupleEl : WEDDING.couple;

  const rows = [];
  rows.push(row_(t.lblAttending, attending ? t.yes : t.no));
  if (attending) {
    rows.push(row_(t.lblGuests, data.guests || "1"));
    rows.push(row_(t.lblShuttle, yn(data.shuttle)));
    if (data.shuttle === "yes") rows.push(row_(t.lblSeats, data.shuttleSeats || "0"));
  }
  if (data.message) rows.push(row_(t.lblMessage, escapeHtml_(data.message)));

  const html =
    '<div style="font-family:Georgia,serif;max-width:600px;margin:auto;color:#3a3530;">' +
      '<h1 style="font-size:28px;color:#7a5d3d;text-align:center;margin-bottom:4px;">' + couple + '</h1>' +
      '<p style="text-align:center;color:#8a8077;font-style:italic;margin-top:0;">' + t.date + '</p>' +
      '<p>' + t.hi.replace("{name}", escapeHtml_(data.name || "")) + '</p>' +
      '<p>' + t.received + '</p>' +
      '<h3 style="color:#7a5d3d;border-bottom:1px solid #e4dacd;padding-bottom:6px;">' + t.summaryTitle + '</h3>' +
      '<table style="width:100%;border-collapse:collapse;">' + rows.join("") + '</table>' +
      '<h3 style="color:#7a5d3d;border-bottom:1px solid #e4dacd;padding-bottom:6px;margin-top:28px;">' + t.detailsTitle + '</h3>' +
      '<p><strong>' + t.ceremony + '</strong> — 18:00<br>' + t.church + '<br>' +
        '<a href="' + WEDDING.churchMapLink + '">' + t.openMap + '</a></p>' +
      '<p><strong>' + t.reception + '</strong> — 20:00<br>' + t.venue + '<br>' +
        '<a href="' + WEDDING.venueMapLink + '">' + t.openMap + '</a></p>' +
      '<h3 style="color:#7a5d3d;border-bottom:1px solid #e4dacd;padding-bottom:6px;margin-top:28px;">' + t.ferryTitle + '</h3>' +
      '<p>' + t.ferryIntro + '</p>' +
      '<p><strong>' + t.ferry1name + '</strong><br>' + t.ferry1desc + '</p>' +
      '<p><strong>' + t.ferry2name + '</strong><br>' + t.ferry2desc + '</p>' +
      '<p style="text-align:center;color:#8a8077;margin-top:30px;">' + t.closing + '</p>' +
    '</div>';

  MailApp.sendEmail({
    to: data.email,
    subject: t.subject.replace("{couple}", couple),
    htmlBody: html,
    name: couple
  });
}

function row_(label, value) {
  return '<tr>' +
    '<td style="padding:6px 10px 6px 0;color:#8a8077;white-space:nowrap;vertical-align:top;">' + label + '</td>' +
    '<td style="padding:6px 0;font-weight:bold;">' + value + '</td>' +
    '</tr>';
}

function escapeHtml_(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const EMAIL_I18N = {
  el: {
    subject: "Επιβεβαίωση RSVP – {couple}",
    date: "Σάββατο, 24 Ιουλίου 2027",
    hi: "Αγαπητέ/ή {name},",
    received: "Λάβαμε την απάντησή σας — σας ευχαριστούμε! Ακολουθεί μια σύνοψη:",
    summaryTitle: "Η απάντησή σας",
    lblAttending: "Παρουσία",
    lblGuests: "Άτομα",
    lblShuttle: "Λεωφορείο",
    lblSeats: "Θέσεις λεωφορείου",
    lblMessage: "Μήνυμα",
    yes: "Ναι",
    no: "Όχι",
    detailsTitle: "Στοιχεία γάμου",
    ceremony: "Μυστήριο",
    church: "Παναγία Ελευθερώτρια, Λόφος Πατρίς – Ευριπίδειο Θέατρο, Σαλαμίνα 18900",
    reception: "Δεξίωση",
    venue: "Ακταία, Άγγελου Σικελιανού 22, Αιάντειο 18900",
    openMap: "Άνοιγμα στο Google Maps",
    ferryTitle: "Πώς θα φτάσετε στη Σαλαμίνα",
    ferryIntro: "Τόσο το μυστήριο όσο και η δεξίωση γίνονται στο νησί της Σαλαμίνας. Δύο γραμμές ferry boat το συνδέουν με την ηπειρωτική χώρα:",
    ferry1name: "Νέα Πέραμος (Μέγαρα) – Φανερωμένη",
    ferry1desc: "Διάρκεια ~10 λεπτά. Λειτουργεί μόνο κατά τη διάρκεια της ημέρας – δεν εκτελεί δρομολόγια τη νύχτα.",
    ferry2name: "Πέραμα – Παλούκια",
    ferry2desc: "Διάρκεια ~15 λεπτά. Λειτουργεί 24 ώρες: κάθε 15΄ τα Σαββατοκύριακα (05:30–00:00) και κάθε 30΄ τη νύχτα (00:00–05:30).",
    closing: "Ανυπομονούμε να σας δούμε! — Περικλής & Γένεσις"
  },
  es: {
    subject: "Confirmación RSVP – {couple}",
    date: "Sábado, 24 de julio de 2027",
    hi: "Querido/a {name}:",
    received: "Hemos recibido tu respuesta — ¡gracias! Aquí tienes un resumen:",
    summaryTitle: "Tu respuesta",
    lblAttending: "Asistencia",
    lblGuests: "Personas",
    lblShuttle: "Autobús",
    lblSeats: "Plazas en el autobús",
    lblMessage: "Mensaje",
    yes: "Sí",
    no: "No",
    detailsTitle: "Detalles de la boda",
    ceremony: "Ceremonia",
    church: "Panagía Eleftherótria, Colina Patrís – Teatro Euripideo, Salamina 18900",
    reception: "Recepción",
    venue: "Aktaía, Ángelou Sikelianoú 22, Aiánteio 18900",
    openMap: "Abrir en Google Maps",
    ferryTitle: "Cómo llegar a Salamina",
    ferryIntro: "Tanto la ceremonia como la recepción se celebran en la isla de Salamina. Dos líneas de ferry la conectan con el continente:",
    ferry1name: "Nea Péramos (Mégara) – Faneroméni",
    ferry1desc: "Duración ~10 minutos. Funciona solo de día: no opera de noche.",
    ferry2name: "Pérama – Palúkia",
    ferry2desc: "Duración ~15 minutos. Funciona 24 horas: cada 15 min los fines de semana (05:30–00:00) y cada 30 min por la noche (00:00–05:30).",
    closing: "¡Estamos deseando veros! — Periklis & Génesis"
  },
  fr: {
    subject: "Confirmation RSVP – {couple}",
    date: "Samedi 24 juillet 2027",
    hi: "Cher/Chère {name},",
    received: "Nous avons bien reçu votre réponse — merci ! Voici un récapitulatif :",
    summaryTitle: "Votre réponse",
    lblAttending: "Présence",
    lblGuests: "Personnes",
    lblShuttle: "Navette",
    lblSeats: "Places dans la navette",
    lblMessage: "Message",
    yes: "Oui",
    no: "Non",
    detailsTitle: "Détails du mariage",
    ceremony: "Cérémonie",
    church: "Panagía Eleftherótria, Colline Patrís – Théâtre d'Euripide, Salamine 18900",
    reception: "Réception",
    venue: "Aktaía, Ángelou Sikelianoú 22, Aiánteio 18900",
    openMap: "Ouvrir dans Google Maps",
    ferryTitle: "Comment rejoindre Salamine",
    ferryIntro: "La cérémonie et la réception ont toutes deux lieu sur l'île de Salamine. Deux lignes de ferry la relient au continent :",
    ferry1name: "Néa Péramos (Mégare) – Faneroméni",
    ferry1desc: "Durée ~10 minutes. En service le jour uniquement : ne circule pas la nuit.",
    ferry2name: "Pérama – Paloúkia",
    ferry2desc: "Durée ~15 minutes. En service 24h/24 : toutes les 15 min le week-end (05:30–00:00) et toutes les 30 min la nuit (00:00–05:30).",
    closing: "Nous avons hâte de vous voir ! — Periklis & Génesis"
  }
};

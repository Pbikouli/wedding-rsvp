/* ============================================================
   CONFIG — paste your Google Apps Script Web App URL here
   (see README.md, step "Google Sheets backend").
   ============================================================ */
const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbwX5mZPgQdE1yVCNc_Iy4grZzQ1reOhs3U6ryI3QoJpfv_Eqopt4iif5psTui1BB4AyBA/exec";

/* Addresses used for the embedded maps (shown in all languages). */
const CHURCH_ADDRESS = "Παναγία Ελευθερώτρια, Λόφος Πατρίς-Ευρυπίδειο Θέατρο, Σαλαμίνα 18900";
const VENUE_ADDRESS  = "Ακταία, Άγγελου Σικελιανού 22, Αιάντειο 18900";
const CHURCH_MAPS_LINK = "https://maps.app.goo.gl/PeHwk2jD9yUeCwbf6";
const VENUE_MAPS_LINK  = "https://maps.app.goo.gl/vVzLNeqgdw6FoMfp8";

/* Ceremony date/time (Greek local time, summer = UTC+3) — used by the countdown. */
const WEDDING_DATETIME = new Date("2027-07-24T18:00:00+03:00");

/* Bank accounts for wedding gifts (shown in all languages + the email). */
const GIFT_ACCOUNTS = [
  { flag: "🇪🇸", beneficiary: "GENESIS STEPHANIE SANCHEZ PIGUAVE", bank: "Banco Santander · BSCHESMMXXX", iban: "ES70 0049 4437 6828 9001 9401" },
  { flag: "🇫🇷", beneficiary: "SANCHEZ PIGUAVE GENESIS", bank: "BNP Paribas · BNPAFRPPXXX", iban: "FR76 3000 4010 2700 0003 6873 652" },
  { flag: "🇬🇷", beneficiary: "ΜΠΙΚΟΥΛΗΣ ΠΕΡΙΚΛΗΣ ΚΩΝΣΤΑΝΤΙΝΟΣ SANCHEZ PIGUAVE GENESIS STEPHANIE YOFFRE ALCIDES", bank: "Eurobank · ERBKGRAAXXX", iban: "GR02 0260 0270 0003 5010 1963 835" }
];

/* ============================================================
   TRANSLATIONS
   ============================================================ */
const I18N = {
  el: {
    _htmlLang: "el",
    pretitle: "Παντρευόμαστε",
    names: "Περικλής & Γένεσις",
    heroDate: "Σάββατο, 24 Ιουλίου 2027",
    intro: "Με χαρά σας προσκαλούμε να γιορτάσετε μαζί μας αυτή την τόσο ξεχωριστή μέρα για μας. Η παρουσία σας είναι το πολυτιμότερο δώρο.",
    countdownTitle: "Αντίστροφη μέτρηση",
    cdDays: "Ημέρες",
    cdHours: "Ώρες",
    cdMinutes: "Λεπτά",
    cdSeconds: "Δευτερόλεπτα",
    countdownOver: "Η μεγάλη μέρα έφτασε! 💍",
    detailsTitle: "Λεπτομέρειες",
    ceremonyTitle: "Μυστήριο",
    ceremonyTime: "18:00",
    churchName: "Παναγία Ελευθερώτρια, Λόφος Πατρίς – Ευριπίδειο Θέατρο, Σαλαμίνα 18900",
    receptionTitle: "Δεξίωση",
    receptionTime: "20:00",
    venueName: "Ακταία, Άγγελου Σικελιανού 22, Αιάντειο 18900",
    mapsTitle: "Πώς θα έρθετε",
    churchMapLabel: "Εκκλησία",
    venueMapLabel: "Χώρος Δεξίωσης",
    openInMaps: "Άνοιγμα στο Google Maps",
    ferryTitle: "Πώς θα φτάσετε στη Σαλαμίνα",
    ferryIntro: "Τόσο το μυστήριο όσο και η δεξίωση γίνονται στο νησί της Σαλαμίνας. Δύο γραμμές ferry boat το συνδέουν με την ηπειρωτική χώρα:",
    ferryRoute1Name: "Νέα Πέραμος (Μέγαρα) – Φανερωμένη",
    ferryRoute1Desc: "Διάρκεια ~10 λεπτά. Λειτουργεί μόνο κατά τη διάρκεια της ημέρας – δεν εκτελεί δρομολόγια τη νύχτα.",
    ferryRoute2Name: "Πέραμα – Παλούκια (προτείνεται από τη νύφη)",
    ferryRoute2Desc: "Διάρκεια ~15 λεπτά. Λειτουργεί 24 ώρες: κάθε 15΄ τα Σαββατοκύριακα (05:30–00:00) και κάθε 30΄ τη νύχτα (00:00–05:30).",
    notesTitle: "Λεωφορείο",
    notesBody: "Θα διατίθεται λεωφορείο για τη μετακίνηση των καλεσμένων. Σημείο συνάντησης: Αθήνα (η ακριβής τοποθεσία θα επιβεβαιωθεί αργότερα). Διαδρομή: Αθήνα – Εκκλησία – Χώρος Δεξίωσης – Αθήνα. Εάν επιθυμείτε να κάνετε χρήση αυτής της υπηρεσίας, παρακαλούμε δηλώστε το στη φόρμα επιβεβαίωσης παρουσίας.",
    rsvpTitle: "Επιβεβαίωση Παρουσίας",
    rsvpDeadline: "Παρακαλούμε για την απάντησή σας μέχρι 8 Μαΐου.",
    giftsTitle: "Δώρα",
    giftsIntro: "Αν θέλετε να μας κάνετε ένα δωράκι και να συνεισφέρετε στο ταξίδι του μέλιτος, μπορείτε να το κάνετε με τραπεζική μεταφορά ή από χέρι σε χέρι.",
    lblBeneficiary: "Δικαιούχος",
    lblBank: "Τράπεζα",
    copyBtn: "Αντιγραφή",
    copied: "Αντιγράφηκε!",
    fieldName: "Ονοματεπώνυμο / Οικογένεια",
    fieldEmail: "Email",
    emailHint: "Προαιρετικό – συμπληρώστε το για να λάβετε επιβεβαίωση με όλες τις πληροφορίες.",
    fieldAttending: "Θα παρευρεθείτε;",
    fieldGuests: "Αριθμός ατόμων που θα έρθουν",
    fieldShuttle: "Θα χρησιμοποιήσετε το λεωφορείο;",
    fieldShuttleSeats: "Πόσες θέσεις στο λεωφορείο;",
    fieldMessage: "Μήνυμα (προαιρετικό)",
    optYes: "Ναι",
    optNo: "Όχι",
    submit: "Αποστολή",
    sending: "Αποστολή…",
    credit: "⚡ Powered by Peri's vibecoding — τυχόν bugs θεωρούνται features 💍",
    success: "Ευχαριστούμε! Η απάντησή σας καταχωρήθηκε.",
    alreadySent: "Έχετε ήδη απαντήσει. Μπορείτε να αλλάξετε την απάντησή σας και να στείλετε ξανά.",
    error: "Κάτι πήγε στραβά. Παρακαλούμε δοκιμάστε ξανά.",
    required: "Παρακαλούμε συμπληρώστε το όνομά σας."
  },
  es: {
    _htmlLang: "es",
    pretitle: "Nos casamos",
    names: "Periklis & Génesis",
    heroDate: "Sábado, 24 de julio de 2027",
    intro: "Nos gustaría que nos acompañarás en este día tan especial para nosotros. Vuestra presencia es el regalo más valioso.",
    countdownTitle: "Cuenta atrás",
    cdDays: "Días",
    cdHours: "Horas",
    cdMinutes: "Minutos",
    cdSeconds: "Segundos",
    countdownOver: "¡El gran día ha llegado! 💍",
    detailsTitle: "Detalles",
    ceremonyTitle: "Ceremonia",
    ceremonyTime: "18:00",
    churchName: "Panagía Eleftherótria, Colina Patrís – Teatro Euripideo, Salamina 18900",
    receptionTitle: "Recepción",
    receptionTime: "20:00",
    venueName: "Aktaía, Ángelou Sikelianoú 22, Aiánteio 18900",
    mapsTitle: "Cómo llegar",
    churchMapLabel: "Iglesia",
    venueMapLabel: "Lugar de la recepción",
    openInMaps: "Abrir en Google Maps",
    ferryTitle: "Cómo llegar a Salamina",
    ferryIntro: "Tanto la ceremonia como la recepción se celebran en la isla de Salamina. Dos líneas de ferry la conectan con Atenas:",
    ferryRoute1Name: "Nea Péramos (Mégara) – Faneroméni",
    ferryRoute1Desc: "Duración ~10 minutos. Funciona solo de día: no opera de noche.",
    ferryRoute2Name: "Pérama – Palúkia (recomendación de la novia)",
    ferryRoute2Desc: "Duración ~15 minutos. Funciona 24 horas: cada 15 min los fines de semana (05:30–00:00) y cada 30 min por la noche (00:00–05:30).",
    notesTitle: "Autobús",
    notesBody: "Posibilidad de tomar el autobús que pondremos a disposición de los invitados. Punto de encuentro: Atenas (lugar por determinar). Recorrido: Atenas - Iglesia - lugar de la recepción - Atenas. En caso de necesitarlo, indícalo en el formulario de confirmación.",
    rsvpTitle: "Confirmación de asistencia",
    rsvpDeadline: "Esperamos vuestra confirmación antes del 8 de mayo.",
    giftsTitle: "Regalos",
    giftsIntro: "Si queréis tener un detalle con nosotros y contribuir a nuestro viaje de novios, podéis hacerlo mediante transferencia bancaria o en mano.",
    lblBeneficiary: "Beneficiario",
    lblBank: "Banco",
    copyBtn: "Copiar",
    copied: "¡Copiado!",
    fieldName: "Nombre / Familia",
    fieldEmail: "Correo electrónico",
    emailHint: "Opcional – indícalo para recibir una confirmación con toda la información.",
    fieldAttending: "¿Asistirás?",
    fieldGuests: "Número de personas que asistirán",
    fieldShuttle: "¿Usarás el autobús?",
    fieldShuttleSeats: "¿Cuántas plazas en el autobús?",
    fieldMessage: "Mensaje (opcional)",
    optYes: "Sí",
    optNo: "No",
    submit: "Enviar",
    sending: "Enviando…",
    credit: "⚡ Powered by Peri's vibecoding — cualquier bug es en realidad una función 💍",
    success: "¡Gracias! Tu respuesta ha sido registrada.",
    alreadySent: "Ya has respondido. Puedes cambiar tu respuesta y enviarla de nuevo.",
    error: "Algo salió mal. Por favor, inténtalo de nuevo.",
    required: "Por favor, introduce tu nombre."
  },
  fr: {
    _htmlLang: "fr",
    pretitle: "On se marie",
    names: "Periklis & Génesis",
    heroDate: "Samedi 24 juillet 2027",
    intro: "Nous aimerions vous avoir parmi nous lors de cette journée si spéciale pour nous. Votre présence est le plus précieux des cadeaux.",
    countdownTitle: "Compte à rebours",
    cdDays: "Jours",
    cdHours: "Heures",
    cdMinutes: "Minutes",
    cdSeconds: "Secondes",
    countdownOver: "Le grand jour est arrivé ! 💍",
    detailsTitle: "Détails",
    ceremonyTitle: "Cérémonie",
    ceremonyTime: "18:00",
    churchName: "Panagía Eleftherótria, Colline Patrís – Théâtre d'Euripide, Salamine 18900",
    receptionTitle: "Réception",
    receptionTime: "20:00",
    venueName: "Aktaía, Ángelou Sikelianoú 22, Aiánteio 18900",
    mapsTitle: "Comment venir",
    churchMapLabel: "Église",
    venueMapLabel: "Lieu de la réception",
    openInMaps: "Ouvrir dans Google Maps",
    ferryTitle: "Comment rejoindre Salamine",
    ferryIntro: "La cérémonie et la réception ont toutes deux lieu sur l'île de Salamine. Deux lignes de ferry la relient à Athènes :",
    ferryRoute1Name: "Néa Péramos (Mégare) – Faneroméni",
    ferryRoute1Desc: "Durée ~10 minutes. En service le jour uniquement : ne circule pas la nuit.",
    ferryRoute2Name: "Pérama – Paloúkia (recommandation de la mariée)",
    ferryRoute2Desc: "Durée ~15 minutes. En service 24h/24 : toutes les 15 min le week-end (05:30–00:00) et toutes les 30 min la nuit (00:00–05:30).",
    notesTitle: "Navette",
    notesBody: "Possibilité de prendre le bus que nous mettrons à la disposition des invités. Point de rendez-vous : Athènes (lieu à préciser ultérieurement). Trajet : Athènes – Église – lieu de la réception – Athènes. Si vous en avez besoin, merci de l'indiquer dans le formulaire de confirmation.",
    rsvpTitle: "Confirmation de présence",
    rsvpDeadline: "Veuillez confirmer avant le 8 mai.",
    giftsTitle: "Cadeaux",
    giftsIntro: "Si vous souhaitez nous faire un petit cadeau et contribuer à notre voyage de noces, vous pouvez le faire par virement bancaire ou en main propre.",
    lblBeneficiary: "Bénéficiaire",
    lblBank: "Banque",
    copyBtn: "Copier",
    copied: "Copié !",
    fieldName: "Nom / Famille",
    fieldEmail: "E-mail",
    emailHint: "Facultatif – indiquez-le pour recevoir une confirmation avec toutes les informations.",
    fieldAttending: "Serez-vous présent·e ?",
    fieldGuests: "Nombre de personnes présentes",
    fieldShuttle: "Utiliserez-vous la navette ?",
    fieldShuttleSeats: "Combien de places dans la navette ?",
    fieldMessage: "Message (facultatif)",
    optYes: "Oui",
    optNo: "Non",
    submit: "Envoyer",
    sending: "Envoi…",
    credit: "⚡ Powered by Peri's vibecoding — tout bug est en fait une fonctionnalité 💍",
    success: "Merci ! Votre réponse a bien été enregistrée.",
    alreadySent: "Vous avez déjà répondu. Vous pouvez modifier votre réponse et l'envoyer à nouveau.",
    error: "Une erreur s'est produite. Veuillez réessayer.",
    required: "Veuillez saisir votre nom."
  }
};

let currentLang = "el";

/* ============================================================
   LANGUAGE HANDLING
   ============================================================ */
function applyLanguage(lang) {
  if (!I18N[lang]) lang = "el";
  currentLang = lang;
  const dict = I18N[lang];

  document.documentElement.lang = dict._htmlLang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] === undefined) return;
    if (el.tagName === "OPTION") {
      el.textContent = dict[key];
    } else {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll(".lang-btn").forEach((b) =>
    b.classList.toggle("active", b.dataset.lang === lang)
  );

  try { localStorage.setItem("weddingLang", lang); } catch (e) {}
}

function detectInitialLang() {
  // Default language is Greek; remember the recipient's manual choice.
  let saved = null;
  try { saved = localStorage.getItem("weddingLang"); } catch (e) {}
  if (saved && I18N[saved]) return saved;
  return "el";
}

/* ============================================================
   MAPS
   ============================================================ */
function setupMaps() {
  const embed = (addr) =>
    "https://www.google.com/maps?q=" + encodeURIComponent(addr) + "&output=embed";
  document.getElementById("church-map").src = embed(CHURCH_ADDRESS);
  document.getElementById("venue-map").src = embed(VENUE_ADDRESS);
  document.getElementById("church-link").href = CHURCH_MAPS_LINK;
  document.getElementById("venue-link").href = VENUE_MAPS_LINK;
}

/* ============================================================
   RSVP FORM
   ============================================================ */
function toggleConditionalFields() {
  const attending = document.getElementById("attending").value;
  const shuttle = document.getElementById("shuttle").value;
  const isAttending = attending === "yes";

  document.getElementById("guests-field").classList.toggle("is-hidden", !isAttending);
  document.getElementById("shuttle-field").classList.toggle("is-hidden", !isAttending);
  document
    .getElementById("shuttle-seats-field")
    .classList.toggle("is-hidden", !isAttending || shuttle !== "yes");
}

const RSVP_FIELDS = ["name", "email", "attending", "guests", "shuttle", "shuttleSeats", "message"];

// Remember the guest's answers so the form stays filled in (even after a reload).
function saveFormData() {
  const data = {};
  RSVP_FIELDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) data[id] = el.value;
  });
  try { localStorage.setItem("weddingRSVP", JSON.stringify(data)); } catch (e) {}
}

function restoreFormData() {
  let data = null;
  try { data = JSON.parse(localStorage.getItem("weddingRSVP") || "null"); } catch (e) {}
  if (!data) return false;
  RSVP_FIELDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el && data[id] !== undefined) el.value = data[id];
  });
  return true;
}

function setupForm() {
  const form = document.getElementById("rsvp-form");
  const status = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  document.getElementById("attending").addEventListener("change", toggleConditionalFields);
  document.getElementById("shuttle").addEventListener("change", toggleConditionalFields);
  const hadPrevious = restoreFormData();
  toggleConditionalFields();
  if (hadPrevious) {
    status.textContent = I18N[currentLang].alreadySent;
    status.classList.add("success");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dict = I18N[currentLang];
    status.className = "form-status";
    status.textContent = "";

    const name = document.getElementById("name").value.trim();
    if (!name) {
      status.textContent = dict.required;
      status.classList.add("error");
      return;
    }

    const attending = document.getElementById("attending").value;
    const payload = {
      name: name,
      email: document.getElementById("email").value.trim(),
      attending: attending,
      guests: attending === "yes" ? document.getElementById("guests").value : "0",
      shuttle: attending === "yes" ? document.getElementById("shuttle").value : "no",
      shuttleSeats:
        attending === "yes" && document.getElementById("shuttle").value === "yes"
          ? document.getElementById("shuttleSeats").value
          : "0",
      message: document.getElementById("message").value.trim(),
      language: currentLang,
      submittedAt: new Date().toISOString()
    };

    submitBtn.disabled = true;
    submitBtn.textContent = dict.sending;

    try {
      await fetch(RSVP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      // With mode:"no-cors" the response is opaque; assume success if no network error.
      status.textContent = dict.success;
      status.classList.add("success");
      // Keep the form filled in and remember it for next time (clearer for the guest).
      saveFormData();
    } catch (err) {
      status.textContent = dict.error;
      status.classList.add("error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = dict.submit;
    }
  });
}

/* ============================================================
   COUNTDOWN
   ============================================================ */
function startCountdown() {
  const grid = document.getElementById("countdown-grid");
  const over = document.getElementById("countdown-over");
  if (!grid || !over) return;

  const elDays = document.getElementById("cd-days");
  const elHours = document.getElementById("cd-hours");
  const elMinutes = document.getElementById("cd-minutes");
  const elSeconds = document.getElementById("cd-seconds");

  function tick() {
    const diff = WEDDING_DATETIME.getTime() - Date.now();
    if (diff <= 0) {
      grid.classList.add("is-hidden");
      over.classList.remove("is-hidden");
      return true;
    }
    const sec = Math.floor(diff / 1000);
    elDays.textContent = Math.floor(sec / 86400);
    elHours.textContent = Math.floor((sec % 86400) / 3600);
    elMinutes.textContent = Math.floor((sec % 3600) / 60);
    elSeconds.textContent = sec % 60;
    return false;
  }

  if (tick()) return;
  const timer = setInterval(() => { if (tick()) clearInterval(timer); }, 1000);
}

/* ============================================================
   GIFTS / IBAN
   ============================================================ */
function setupGifts() {
  const grid = document.getElementById("gift-grid");
  if (!grid) return;

  GIFT_ACCOUNTS.forEach((acc) => {
    const card = document.createElement("article");
    card.className = "gift-card";

    const header = document.createElement("div");
    header.className = "gift-head";
    header.innerHTML =
      '<span class="gift-flag">' + acc.flag + "</span>" +
      '<span class="gift-bank"></span>';
    header.querySelector(".gift-bank").textContent = acc.bank;

    const benef = document.createElement("p");
    benef.className = "gift-benef";
    const benefLabel = document.createElement("span");
    benefLabel.className = "gift-field-label";
    benefLabel.setAttribute("data-i18n", "lblBeneficiary");
    const benefValue = document.createElement("span");
    benefValue.className = "gift-field-value";
    benefValue.textContent = acc.beneficiary;
    benef.append(benefLabel, benefValue);

    const ibanRow = document.createElement("div");
    ibanRow.className = "gift-iban-row";
    const ibanValue = document.createElement("code");
    ibanValue.className = "gift-iban";
    ibanValue.textContent = acc.iban;
    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "btn btn-outline gift-copy";
    copyBtn.setAttribute("data-i18n", "copyBtn");
    copyBtn.addEventListener("click", () => copyIban(copyBtn, acc.iban));
    ibanRow.append(ibanValue, copyBtn);

    card.append(header, benef, ibanRow);
    grid.appendChild(card);
  });
}

function copyIban(btn, iban) {
  const plain = iban.replace(/\s+/g, "");
  const done = () => {
    const dict = I18N[currentLang];
    btn.textContent = dict.copied;
    btn.classList.add("copied");
    setTimeout(() => {
      btn.textContent = dict.copyBtn;
      btn.classList.remove("copied");
    }, 1600);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(plain).then(done).catch(() => fallbackCopy(plain, done));
  } else {
    fallbackCopy(plain, done);
  }
}

function fallbackCopy(text, done) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); done(); } catch (e) {}
  document.body.removeChild(ta);
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-btn").forEach((btn) =>
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang))
  );
  setupMaps();
  setupGifts();
  applyLanguage(detectInitialLang());
  setupForm();
  startCountdown();
});

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

/* ============================================================
   TRANSLATIONS
   ============================================================ */
const I18N = {
  el: {
    _htmlLang: "el",
    pretitle: "Παντρευόμαστε",
    names: "Περικλής & Γένεσις",
    heroDate: "Σάββατο, 24 Ιουλίου 2027",
    intro: "Με αγάπη και χαρά σας προσκαλούμε να γιορτάσετε μαζί μας την ημέρα του γάμου μας. Η παρουσία σας είναι το πολυτιμότερο δώρο.",
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
    ferryRoute2Name: "Πέραμα – Παλούκια",
    ferryRoute2Desc: "Διάρκεια ~15 λεπτά. Λειτουργεί 24 ώρες: κάθε 15΄ τα Σαββατοκύριακα (05:30–00:00) και κάθε 30΄ τη νύχτα (00:00–05:30).",
    notesTitle: "Λεωφορείο",
    notesBody: "Θα υπάρχει λεωφορείο που θα μεταφέρει τους καλεσμένους από την Αθήνα στον χώρο της δεξίωσης και πίσω. Παρακαλούμε δηλώστε παρακάτω αν θα το χρειαστείτε και για πόσα άτομα.",
    rsvpTitle: "Επιβεβαίωση Παρουσίας",
    rsvpDeadline: "Παρακαλούμε απαντήστε το συντομότερο δυνατό.",
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
    credit: "⚡ Powered by Peri's vibecoding — τυχόν bugs θεωρούνται χαρακτηριστικά 💍",
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
    intro: "Con amor y alegría os invitamos a celebrar con nosotros el día de nuestra boda. Vuestra presencia es el regalo más valioso.",
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
    ferryIntro: "Tanto la ceremonia como la recepción se celebran en la isla de Salamina. Dos líneas de ferry la conectan con el continente:",
    ferryRoute1Name: "Nea Péramos (Mégara) – Faneroméni",
    ferryRoute1Desc: "Duración ~10 minutos. Funciona solo de día: no opera de noche.",
    ferryRoute2Name: "Pérama – Palúkia",
    ferryRoute2Desc: "Duración ~15 minutos. Funciona 24 horas: cada 15 min los fines de semana (05:30–00:00) y cada 30 min por la noche (00:00–05:30).",
    notesTitle: "Autobús",
    notesBody: "Habrá un autobús que llevará a los invitados desde Atenas al lugar de la recepción y de vuelta. Por favor, indícanos abajo si lo necesitas y para cuántas personas.",
    rsvpTitle: "Confirmación de asistencia",
    rsvpDeadline: "Por favor, responde lo antes posible.",
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
    pretitle: "Nous nous marions",
    names: "Periklis & Génesis",
    heroDate: "Samedi 24 juillet 2027",
    intro: "Avec amour et joie, nous vous invitons à célébrer avec nous le jour de notre mariage. Votre présence est le plus précieux des cadeaux.",
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
    ferryIntro: "La cérémonie et la réception ont toutes deux lieu sur l'île de Salamine. Deux lignes de ferry la relient au continent :",
    ferryRoute1Name: "Néa Péramos (Mégare) – Faneroméni",
    ferryRoute1Desc: "Durée ~10 minutes. En service le jour uniquement : ne circule pas la nuit.",
    ferryRoute2Name: "Pérama – Paloúkia",
    ferryRoute2Desc: "Durée ~15 minutes. En service 24h/24 : toutes les 15 min le week-end (05:30–00:00) et toutes les 30 min la nuit (00:00–05:30).",
    notesTitle: "Navette",
    notesBody: "Une navette transportera les invités d'Athènes jusqu'au lieu de la réception et retour. Merci d'indiquer ci-dessous si vous en aurez besoin et pour combien de personnes.",
    rsvpTitle: "Confirmation de présence",
    rsvpDeadline: "Merci de répondre dès que possible.",
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
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-btn").forEach((btn) =>
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang))
  );
  setupMaps();
  applyLanguage(detectInitialLang());
  setupForm();
});

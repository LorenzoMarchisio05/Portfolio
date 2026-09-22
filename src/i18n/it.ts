import type en from "./en";

const intro =
  "Qui niente prende forma finché non ti fermi in un punto preciso. Di punti così ce ne sono tre, e da ognuno la forma è diversa.";

const it: typeof en = {
  meta: {
    title: "Lorenzo Marchisio · Ingegnere, fondatore, fotografo",
    description:
      "Studente di ingegneria informatica al Politecnico di Torino, vivo a Leuven. Scrivo software, realizzo siti web per piccole attività e scatto fotografie.",
  },

  roles: { engineer: "INGEGNERE", founder: "FONDATORE", photographer: "FOTOGRAFO" },

  language: "Lingua",

  footer: {
    label: "Piè di pagina",
    home: "Portfolio",
    gallery: "Galleria fotografica",
    websites: "Siti web",
    privacy: "Informativa privacy",
  },

  pageBar: {
    trail: "Percorso",
    home: "Home",
    wordmark: "Lorenzo Marchisio, home",
    back: "Indietro",
  },

  skip: "Vai al contenuto",

  hero: {
    status: "IRRISOLTO",
    intro,
    study: "INGEGNERIA INFORMATICA · POLITECNICO DI TORINO",
    city: "LEUVEN",
    region: ", BRABANTE FIAMMINGO",
    hint: "SCORRI PER ORBITARE",
  },

  engineer: {
    headline: 'DA DOVE<br class="narrow-only" /> PARTO<br />SEMPRE',
    intro:
      "Non un linguaggio. Un metodo. Ingegneria mi ha insegnato un ordine delle operazioni molto prima di uno stack, ed è l'ordine la parte che si porta ovunque.",
    method: [
      {
        title: "Trova il vincolo che conta",
        text: "La maggior parte dei problemi è un solo limite travestito. Prima di toccare qualsiasi altra cosa, vado a cercare quello che sposta davvero.",
      },
      {
        title: "Misura prima di discutere",
        text: "Un numero di cui mi fido vale più di una storia che mi piace. Se non si può misurare, non lo affermo.",
      },
      {
        title: "Tolleranze, non perfezione",
        text: "Decidi cosa può essere sbagliato, e di quanto, finché decidere costa ancora poco.",
      },
      {
        title: "Il guasto sta nell'interfaccia",
        text: "I pezzi raramente si rompono da soli. Leggo i passaggi di consegne: tra sistemi, tra team e verso le persone che useranno la cosa.",
      },
      {
        title: "La versione più grezza che regge",
        text: "Prima costruisci ciò che regge al contatto con la realtà, poi ogni aggiunta deve guadagnarsi il suo posto.",
      },
      {
        title: "Lascialo leggibile",
        text: "Qualcuno dovrà modificarlo senza avermi accanto. Fa parte delle specifiche, non è una cortesia.",
      },
    ],
    caption: "DA QUI L'OGGETTO<br />SI LEGGE COME DUE GRAFFE",
    sentence:
      "La forma di qualcosa che deve reggere: ecco cos'è l'ingegneria, prima ancora di qualsiasi strumento.",
    cv: "LEGGI IL CV ↓",
  },

  journey: {
    eyebrow: "CUNEO → LEUVEN",
    headline: "IL TERRENO<br />SI APPIANA",
    note: "Continua a scorrere. Il corridoio corre verso est, mentre la cresta alle sue spalle, il profilo di Cuneo, perde rilievo man mano che vai verso destra.",
  },

  founder: {
    statement:
      "L'angolazione esiste prima nella geometria. Ruotato l'oggetto fin qui, gli stessi punti si leggono come una rete.",
    headline: "COSA STO<br />COSTRUENDO",
    studio: {
      label: "01 · STUDIO WEB",
      title: "Siti web per piccole attività",
      text: "Siti veloci e multilingue per ristoranti, negozi e studi professionali, ovunque nel mondo. Prezzi fissi, online in pochi giorni, costruiti con lo stesso metodo del software che scrivo per l'industria.",
      link: "SCOPRI LO STUDIO →",
    },
    unnamed: {
      label: "02 · SENZA NOME",
      title: "Troppo presto per un nome",
      first:
        "È così presto che descriverlo sarebbe un'affermazione più che un fatto, quindi questa parte tiene la sua forma e aspetta.",
      second:
        "Quello che posso dire: nasce dal lavoro che faccio ogni giorno nel software industriale, e da quanto di quel lavoro si fa ancora a mano. Non sto reclutando nessuno e non sto facendo un pitch. E non deve per forza essere questo: qualsiasi idea, qualsiasi campo. Se quello che stai costruendo ha bisogno di ciò che so fare, ti ascolto.",
    },
  },

  photography: {
    headline: "SEI SCATTI",
    blurb: "Qui niente è in posa. Scegli un'angolazione e scopri cosa ne esce.",
    hint: "SCORRI PER SVILUPPARE ↓",
    all: "GALLERIA COMPLETA →",
    alts: [
      "Pilota con il casco rosso seduto su una moto da enduro arancione sotto foglie che pendono dall'alto, illuminato sullo sfondo scuro",
      "Il castello di Trakošćan sulla sua collina boscosa, riflesso nel lago immobile ai suoi piedi",
      "Allenamento di calcio visto attraverso la rete della porta, con un giocatore in nero in primo piano",
      "Calciatore in maglia nera che si allontana sul campo nella luce della sera",
      "Le cascate di Plitvice che cadono in uno specchio d'acqua turchese tra pareti verdi",
      "Pilota con il casco rosso in sella a una moto da enduro arancione nel buio",
    ],
  },

  contact: {
    headline: "VAI DRITTO<br />AL PUNTO",
    cv: "CV ↓",
    form: "MESSAGGIO DIRETTO",
    privacy: "NIENTE TRACKING · PRIVACY",
    name: "NOME",
    namePlaceholder: "Il tuo nome",
    email: "EMAIL",
    emailPlaceholder: "tu@azienda.it",
    message: "MESSAGGIO",
    messagePlaceholder: "Vai dritto al punto.",
    send: "INVIA →",
    sending: "INVIO",
    errors: {
      invalid: "Compila tutti i campi e inserisci un indirizzo email valido.",
      rate: "Troppi messaggi. Riprova più tardi.",
      failed: "Invio non riuscito. Riprova.",
    },
    resolved: "RISOLTO",
    received: "360° · MESSAGGIO RICEVUTO",
    again: "SCRIVINE UN ALTRO",
  },

  notFound: {
    title: "Pagina non trovata · Lorenzo Marchisio",
    description: "Questa pagina non esiste.",
    eyebrow: "404 · ANGOLAZIONE INESISTENTE",
    headline: "QUI NIENTE<br />PRENDE FORMA",
    lead: "La pagina che cerchi non esiste, o si è spostata in un punto da cui l'oggetto non si legge più.",
    back: "TORNA A 000° ↓",
  },

  gallery: {
    title: "Galleria · Lorenzo Marchisio",
    description:
      "Fotografie di moto, calcio e viaggi in Slovenia e Croazia, scattate da Lorenzo Marchisio.",
    crumb: "Ogni scatto",
    headline: "OGNI<br />SCATTO",
    count: (count) => `${count} SCATTI`,
    filter: "Filtra per categoria",
    all: "TUTTE",
    words: {
      croatia: "Croazia",
      slovenia: "Slovenia",
      motorcycle: "moto",
      sport: "sport",
      football: "calcio",
      zagreb: "Zagabria",
      bled: "Bled",
      trakoscan: "Trakošćan",
      plitvice: "Plitvice",
      ljubljana: "Lubiana",
      portrait: "ritratto",
      cave: "grotta",
      castle: "castello",
    },
    alt: (n, subject) => (subject ? `Fotografia ${n}, ${subject}` : `Fotografia ${n}`),
    viewer: "Fotografia",
    close: "CHIUDI ×",
    keys: "← → SFOGLIA · ESC CHIUDI",
    removal: "CHIEDI LA RIMOZIONE",
    removalSubject: "Richiesta di rimozione foto: {name}",
    removalBody: "Foto: {name}\n\nMotivo:\n",
  },

  privacy: {
    crumb: "Privacy",
    updated: (date) => `Ultimo aggiornamento: ${date}`,
  },

  studio: {
    title: "Siti web per piccole attività · Lorenzo Marchisio",
    description: (fastest, slowest, from) =>
      `Siti web veloci e multilingue per piccole attività. Prezzi fissi da ${from}, online in ${fastest}–${slowest} giorni lavorativi. Prima chiamata di 30\u00a0minuti gratuita.`,
    crumb: "Siti web",
    skip: "Vai al modulo di richiesta",
    start: "Parliamone",
    cta: "Chiamata gratuita di 30\u00a0minuti",
    nav: {
      label: "In questa pagina",
      work: "Lavori",
      prices: "Prezzi",
      process: "Come funziona",
      faq: "Domande",
      gallery: "Galleria",
    },

    hero: {
      eyebrow: "120° · STUDIO WEB",
      title: "Siti web che rendono la tua attività facile da trovare e facile da scegliere.",
      sub: (fastest, slowest, from) =>
        `Nelle lingue dei tuoi clienti. Online tra ${fastest} e ${slowest} giorni lavorativi, a prezzo fisso a partire da ${from}.`,
      work: "Guarda i miei lavori",
    },

    work: {
      title: "Lavori selezionati",
      lead: "Siti recenti, ognuno pensato per aprirsi in fretta sul telefono.",
      all: (count) => (count ? `Vedi tutti i progetti (${count})` : "Vedi tutti i progetti"),
    },

    forYou: {
      title: "Cosa fa un sito web per la tua attività",
      lead: "Prima di venire da te, chiamarti o prenotare, molte persone ti cercano sul telefono. Quello che trovano decide se scelgono te o il locale accanto.",
      items: [
        {
          title: "I nuovi clienti ti trovano su Google",
          text: "Le persone cercano quello che vogliono, come “brunch vicino a me”, non il tuo nome. Il tuo sito dice a Google tutto quello che offri e rafforza il tuo Profilo dell'attività su Google, che ti aiuta a comparire più in alto. Nessuno può promettere una posizione, ma senza un sito parti in svantaggio.",
        },
        {
          title: "Più visitatori diventano clienti",
          text: "Foto, prezzi, orari e un solo pulsante chiaro per chiamare, prenotare o avere le indicazioni stradali. Sul telefono si decide in pochi secondi, e una pagina veloce e chiara rende la scelta facile.",
        },
        {
          title: "Sembri la scelta ovvia",
          text: "Quando le persone confrontano due posti, quello con un sito fatto bene sembra solido e affidabile. Senza un sito, c'è chi si chiederà perfino se sei ancora aperto.",
        },
        {
          title: "Ogni cliente si sente il benvenuto",
          text: "Studenti, turisti ed expat cercano nella loro lingua. Un sito in italiano, inglese o tedesco parla la loro lingua prima ancora che entrino.",
        },
        {
          title: "Meno telefonate con le solite domande",
          text: "Orari, prezzi, parcheggio, se accetti le carte: è tutto sul tuo sito, anche a mezzanotte quando sei chiuso.",
        },
        {
          title: "È tuo, non di una piattaforma",
          text: "Sono i social a decidere chi vede i tuoi post, e capita che gli account vengano hackerati o bloccati. Il tuo sito e il tuo dominio continuano a funzionare, qualunque cosa decida una piattaforma.",
        },
      ],
      unsure:
        "Non sai se un sito conviene alla tua attività? Chiedimelo durante la chiamata gratuita. Se non ti serve, te lo dico.",
    },

    prices: {
      title: "Pacchetti e prezzi",
      lead: "Prezzi fissi, concordati prima di iniziare. Tutti i prezzi si intendono IVA esclusa.",
      onRequest: "Prezzo su richiesta",
      from: (price) => `Da ${price}`,
      days: (days) => `Online in ${days} giorni lavorativi`,
      agreed: "Tempi concordati insieme",
      plus: (name) => `Tutto quello che include ${name}, più:`,
      includes: {
        launch: ["Una pagina", "Una lingua"],
        presence: ["Fino a cinque pagine", "Fino a tre lingue"],
        business: [
          "Menu o listino come vera pagina web, facile da leggere sul telefono (non un PDF)",
          "Pulsante di prenotazione collegato al servizio che usi già per le prenotazioni",
          "Statistiche dei visitatori senza cookie",
        ],
        custom: ["Funzionalità avanzate, progettate e realizzate su misura per il modo in cui lavora la tua attività"],
      },
      allLabel: "Ogni pacchetto include",
      all: [
        "Modulo di contatto",
        "Collegamento al tuo Profilo dell'attività su Google",
        "Configurazione per farti trovare su Google",
        "Dati aziendali obbligatori per legge e informativa privacy",
      ],
      noneLabel: "Nessun pacchetto include",
      none: (domainFee) => [
        "Servizio fotografico professionale",
        "Creazione del logo",
        "Indirizzi email, come info@latuaattivita.it",
        `Il costo annuale del dominio, di solito sotto i ${domainFee}, che paghi direttamente`,
      ],
      extras: "Extra",
      language: (price) => `Lingua aggiuntiva: ${price}.`,
      page: (price) => `Pagina aggiuntiva: ${price}.`,
      payment: "Pagamento",
      split: (deposit, onLaunch) => `${deposit} all'avvio, ${onLaunch} alla messa online.`,
      vat: "IVA",
      vatText: "I prezzi non includono l'IVA, che si aggiunge se dovuta.",
    },

    process: {
      title: "Come funziona",
      steps: (deposit, onLaunch) => [
        {
          title: "Videochiamata gratuita",
          text: "Parliamo della tua attività e di cosa serve al sito.",
        },
        {
          title: `Approvi e paghi il ${deposit}`,
          text: "Ricevi un preventivo scritto con cosa è incluso, il prezzo e le condizioni. Quando lo approvi, paghi l'acconto.",
        },
        { title: "Anteprima", text: "Realizzo il sito e ti mando un link di anteprima." },
        { title: "Modifiche", text: "Hai a disposizione due giri di modifiche." },
        { title: "Messa online", text: `Il sito va online e paghi il restante ${onLaunch}.` },
      ],
      timing: (launch, presence, business) =>
        `Per Launch servono ${launch} giorni lavorativi, per Presence ${presence} e per Business ${business}, contati da quando approvi il preventivo e mi mandi testi e foto. I giorni in cui l'anteprima aspetta un tuo riscontro non contano.`,
    },

    care: {
      title: "Piano di assistenza",
      lead: "Niente da gestire, e una sola persona a cui chiedere.",
      covers: (minutes) =>
        `Hosting, aggiornamenti di sicurezza, backup, monitoraggio della disponibilità, le impostazioni del tuo dominio con un promemoria prima del rinnovo, e ${minutes} minuti di modifiche al mese, aggiornamenti del menu compresi. I minuti non usati non passano al mese successivo.`,
      price: (price) => `${price} al mese.`,
      vat: "IVA esclusa, da aggiungere se dovuta.",
      notice: (months) => (months === 1 ? "un mese di preavviso" : `${months} mesi di preavviso`),
      term: (months, notice) => `Minimo ${months} mesi, poi puoi disdire quando vuoi con ${notice}.`,
      optional:
        "Il piano di assistenza è facoltativo. Se non lo attivi, o dopo averlo disdetto, ti consegno il sito finito e la gestione di hosting, modulo di contatto e modifiche passa a te.",
    },

    why: {
      title: "Perché un ingegnere del software",
      fast: {
        title: "Veloce sul telefono",
        text: "Le pagine sono in HTML semplice, con pochissimo JavaScript, quindi si aprono in fretta anche con i dati mobili.",
      },
      secure: {
        title: "Sicuro, senza plugin da bucare",
        text: "Il tuo sito è un insieme di file statici su una rete globale, senza pannello di amministrazione né plugin, quindi c'è molto meno da violare.",
      },
      languages: {
        title: "Realizzato in più lingue",
        text: "Ogni lingua ha i suoi testi scritti apposta, non un widget di traduzione.",
      },
      integrations: {
        title: "Può collegare prenotazioni, menu e ordini",
        text: "Il codice lo scrivo io, quindi il tuo sito può funzionare con gli strumenti che usi già.",
      },
      example: (name) => `Guarda un esempio: ${name}`,
      about: "Chi sono",
    },

    faq: {
      title: "Domande",
      items: (domainFee, minimumMonths, notice) => [
        {
          question: "Di chi sono il sito e il dominio?",
          answer: `Tuoi, una volta saldato il sito. Il dominio è registrato a tuo nome e ne paghi direttamente il costo annuale, di solito sotto i ${domainFee}. Puoi portare entrambi dove vuoi.`,
        },
        {
          question: "Cosa devo fornire?",
          answer:
            "Foto e un logo che hai il diritto di usare, e i dati della tua attività. Posso scrivere i testi partendo da quello che mi racconti, e tu controlli ogni pagina prima che vada online.",
        },
        {
          question: "Usi l'intelligenza artificiale?",
          answer: "Sì, per lavorare più in fretta. Poi ogni pagina la rivedo, la correggo e la rifinisco io.",
        },
        {
          question: "Posso disdire il piano di assistenza?",
          answer: `Sì, dopo i primi ${minimumMonths} mesi, con ${notice}.`,
        },
        {
          question: "E se più avanti voglio delle modifiche?",
          answer:
            "Le piccole modifiche rientrano nel piano di assistenza. Per quelle più grandi ti faccio prima un preventivo, e non si parte finché non sei d'accordo.",
        },
        {
          question: "Lavori con attività fuori dal Belgio?",
          answer:
            "Sì, in tutto il mondo. Lavoriamo a distanza, in videochiamata e via email, e se sei in zona possiamo anche incontrarci di persona.",
        },
        {
          question: "Le informazioni obbligatorie per legge sono incluse?",
          answer:
            "Sì. Aggiungo i dati che la legge chiede di mostrare sul sito di un'attività, come ragione sociale e partita IVA, e un'informativa privacy per il modulo di contatto, usando le informazioni che mi dai. È una configurazione standard, non una consulenza legale.",
        },
      ],
    },

    schema: {
      catalog: "Pacchetti per siti web",
      offer: (name) => `Sito ${name}`,
    },
  },

  start: {
    title: "Parliamo del tuo sito",
    lead: "Parlami della tua attività. Ti rispondo entro un giorno lavorativo per fissare una videochiamata gratuita.",
    direct: "Preferisci l'email? Scrivi a",
    sent: "Richiesta inviata",
    sentText:
      "Grazie. Ti rispondo entro un giorno lavorativo per fissare una videochiamata, e nella tua casella email sta arrivando una conferma.",
    failed: "La tua richiesta non è stata inviata",
    failedText: "C'è stato un problema da parte mia. Riprova, oppure scrivimi direttamente a",
    name: "Il tuo nome",
    email: "Email",
    business: "Nome dell'attività",
    phone: "Telefono o WhatsApp",
    optional: "(facoltativo)",
    message: "La tua attività in poche parole",
    messageHint: "Cosa fai, dove sei e cosa vorresti che facesse il sito.",
    send: "Invia",
    sending: "Invio…",
    note: "Uso i tuoi dati solo per risponderti.",
    privacy: "Informativa privacy",
    errors: {
      required: "Compila questo campo.",
      email: "Inserisci un indirizzo email valido.",
      tooLong: "Il testo è troppo lungo.",
      rate: "Troppe richieste dalla tua connessione. Riprova tra qualche minuto.",
    },
  },

  projects: {
    title: "Progetti di siti web · Lorenzo Marchisio",
    description:
      "I siti web che ho realizzato per piccole attività: com'era prima, cosa fa ora il sito e le schermate su computer e telefono.",
    crumb: "Galleria",
    heading: "Progetti di siti web",
    lead: "Tutti i siti che ho realizzato, ognuno con la sua storia.",
    empty:
      "I primi progetti sono in lavorazione proprio ora. Nella pagina dello studio trovi i prezzi, come funziona il lavoro e le risposte alle domande più comuni.",
    studio: "Vai alla pagina dello studio",
    ctaTitle: "Vuoi un sito per la tua attività?",
    ctaLead: "Parlamene, e ti rispondo entro un giorno lavorativo.",
    schema: "Progetti di siti web",

    concept: "Concept",
    named: (name) => `${name} (Concept)`,
    story: "Leggi tutta la storia",
    site: (concept, domain) =>
      `${concept ? "Sito concept" : "Sito online"}: ${domain} (si apre in una nuova scheda)`,

    pageTitle: (name) => `${name} · Sito realizzato da Lorenzo Marchisio`,
    visit: (domain) => `Visita ${domain}`,
    facts: {
      status: "Stato",
      live: "Online",
      package: "Pacchetto",
      languages: "Lingue",
      delivered: "Consegnato in",
      days: (days) => `${days} giorni`,
      launched: "Online da",
    },
    desktop: "Desktop",
    phone: "Telefono",
    brief: "Il brief",
    before: "Prima",
    built: "Cosa ho realizzato",
    inside: "Dentro il sito",
    results: "Risultati",
    measured: (date, source) => `Misurato il ${date}. Fonte: ${source}`,
    quote: "Cosa dice il cliente",
    stack: (tools) => `Realizzato con: ${tools}`,
    similar: "Vuoi qualcosa di simile?",
    similarLead: "Parlami della tua attività, e ti rispondo entro un giorno lavorativo.",
    all: "← Tutti i progetti",
  },

  email: {
    subject: "La tua richiesta di progetto",
    text: "Ciao,\n\ngrazie per la tua richiesta. Ti rispondo entro un giorno lavorativo per fissare una videochiamata gratuita di 30 minuti.\n\nSe nel frattempo vuoi aggiungere qualcosa, rispondi a questa email.\n\nLorenzo Marchisio\nhttps://lorenzomarchisio.me/it/websites",
  },
};

export default it;

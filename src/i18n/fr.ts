import type en from "./en";

// French typography: a no-break space ( ) before : ; ? ! and inside « »,
// and between a number and its unit. Not the narrow one (U+202F), which the
// trimmed fonts leave out.

const intro =
  "Ici, rien ne prend forme tant que vous ne vous placez pas à un endroit précis. Il y en a trois, et la forme change d'un endroit à l'autre.";

const fr: typeof en = {
  meta: {
    title: "Lorenzo Marchisio · Ingénieur, fondateur, photographe",
    description:
      "Étudiant en génie informatique au Politecnico di Torino, installé à Louvain. Logiciels, sites web pour petites entreprises et photographie.",
  },

  roles: { engineer: "INGÉNIEUR", founder: "FONDATEUR", photographer: "PHOTOGRAPHE" },

  language: "Langue",

  footer: {
    label: "Pied de page",
    home: "Portfolio",
    gallery: "Galerie photo",
    websites: "Sites web",
    privacy: "Politique de confidentialité",
  },

  pageBar: {
    trail: "Fil d'Ariane",
    home: "Accueil",
    wordmark: "Lorenzo Marchisio, accueil",
    back: "Retour",
  },

  skip: "Aller au contenu",

  hero: {
    status: "NON RÉSOLU",
    intro,
    study: "GÉNIE INFORMATIQUE · POLITECNICO DI TORINO",
    city: "LOUVAIN",
    region: ", BRABANT FLAMAND",
    hint: "DÉFILEZ POUR ORBITER",
  },

  engineer: {
    headline: 'MON<br class="narrow-only" /> PREMIER<br />RÉFLEXE',
    intro:
      "Pas un langage. Une méthode. L'école d'ingénieurs m'a appris un ordre des opérations bien avant de m'apprendre une stack, et c'est cet ordre qui se transpose partout.",
    method: [
      {
        title: "Trouver la contrainte qui bloque",
        text: "La plupart des problèmes ne sont qu'une seule limite déguisée. Je cherche celle qui fait vraiment bouger les choses avant de toucher à quoi que ce soit d'autre.",
      },
      {
        title: "Mesurer avant de débattre",
        text: "Un chiffre auquel je me fie vaut mieux qu'une histoire qui me plaît. Ce qui ne se mesure pas ne s'affirme pas.",
      },
      {
        title: "Des tolérances, pas la perfection",
        text: "Décider ce qui a le droit d'être faux, et de combien, tant que la décision coûte encore peu.",
      },
      {
        title: "La panne est à l'interface",
        text: "Les pièces cassent rarement seules. J'examine les passages de relais : entre systèmes, entre équipes, et avec ceux qui s'en serviront.",
      },
      {
        title: "La version la plus brute qui tienne",
        text: "Construire d'abord ce qui résiste au contact du réel, puis faire mériter sa place à chaque ajout.",
      },
      {
        title: "Laisser un travail lisible",
        text: "Quelqu'un devra modifier ça sans que je sois là. C'est dans le cahier des charges, ce n'est pas une politesse.",
      },
    ],
    caption: "D'ICI, L'OBJET<br />SE LIT COMME DEUX ACCOLADES",
    sentence:
      "La forme de quelque chose qui doit tenir : c'est ce qu'est l'ingénierie, avant d'être un outil en particulier.",
    cv: "LIRE LE CV ↓",
  },

  journey: {
    eyebrow: "CUNEO → LOUVAIN",
    headline: "LE RELIEF<br />S'APLANIT",
    note: "Continuez à défiler. Le couloir file vers l'est, tandis que la crête derrière lui, l'horizon de Cuneo, perd son relief à mesure que vous avancez vers la droite.",
  },

  founder: {
    statement:
      "L'angle existe d'abord dans la géométrie. Tournés jusqu'ici, les mêmes points se lisent comme un réseau.",
    headline: "CE QUE<br />JE CONSTRUIS",
    studio: {
      label: "01 · STUDIO WEB",
      title: "Des sites web pour les petites entreprises",
      text: "Des sites rapides et multilingues pour les restaurants, les commerces et les cabinets, partout dans le monde. Prix fixes, en ligne en quelques jours, et construits avec la même méthode que les logiciels que j'écris pour l'industrie.",
      link: "VOIR LE STUDIO →",
    },
    unnamed: {
      label: "02 · SANS NOM",
      title: "Trop tôt pour le nommer",
      first:
        "C'est encore si tôt que le décrire serait une affirmation plutôt qu'un fait ; cette partie garde donc sa forme et attend.",
      second:
        "Ce que je peux dire : cela part du travail que je fais chaque jour dans le logiciel industriel, et de tout ce qui s'y fait encore à la main. Je ne recrute personne, et ceci n'est pas un pitch. Et il ne s'agit pas forcément de ce projet-là : n'importe quelle idée, n'importe quel domaine. Si ce que vous construisez a besoin de ce que je sais faire, je vous écoute.",
    },
  },

  photography: {
    headline: "SIX IMAGES",
    blurb: "Ici, rien ne prend la pose. On choisit un angle et on voit ce que ça donne.",
    hint: "DÉFILEZ POUR DÉVELOPPER ↓",
    all: "GALERIE COMPLÈTE →",
    alts: [
      "Pilote au casque rouge assis sur une moto d'enduro orange sous un feuillage retombant, éclairé sur fond sombre",
      "Le château de Trakošćan sur sa colline boisée, reflété dans le lac immobile en contrebas",
      "Entraînement de football vu à travers le filet du but, un joueur en noir au premier plan",
      "Footballeur en maillot noir s'éloignant sur le terrain dans la lumière du soir",
      "Les cascades de Plitvice tombant dans un bassin turquoise entre des falaises vertes",
      "Pilote au casque rouge à califourchon sur une moto d'enduro orange dans l'obscurité",
    ],
  },

  contact: {
    headline: "ALLEZ DROIT<br />AU BUT",
    cv: "CV ↓",
    form: "MESSAGE DIRECT",
    privacy: "SANS PISTAGE · VIE PRIVÉE",
    name: "NOM",
    namePlaceholder: "Votre nom",
    email: "E-MAIL",
    emailPlaceholder: "vous@entreprise.be",
    message: "MESSAGE",
    messagePlaceholder: "Allez droit au but.",
    send: "ENVOYER →",
    sending: "ENVOI",
    errors: {
      invalid: "Veuillez remplir tous les champs et saisir une adresse e-mail valide.",
      rate: "Trop de messages. Veuillez réessayer plus tard.",
      failed: "L'envoi du message a échoué. Veuillez réessayer.",
    },
    resolved: "RÉSOLU",
    received: "360° · MESSAGE REÇU",
    again: "EN ÉCRIRE UN AUTRE",
  },

  notFound: {
    title: "Page introuvable · Lorenzo Marchisio",
    description: "Cette page n'existe pas.",
    eyebrow: "404 · ANGLE INTROUVABLE",
    headline: "ICI, RIEN NE<br />PREND FORME",
    lead: "La page demandée n'existe pas, ou elle a été déplacée à un endroit d'où l'objet ne se lit plus.",
    back: "RETOUR À 000° ↓",
  },

  gallery: {
    title: "Galerie · Lorenzo Marchisio",
    description:
      "Photographies de moto, de football et de voyage en Slovénie et en Croatie, par Lorenzo Marchisio.",
    crumb: "Chaque image",
    headline: "CHAQUE<br />IMAGE",
    count: (count) => `${count} IMAGES`,
    filter: "Filtrer par catégorie",
    all: "TOUT",
    words: {
      croatia: "Croatie",
      slovenia: "Slovénie",
      motorcycle: "moto",
      sport: "sport",
      football: "football",
      zagreb: "Zagreb",
      bled: "Bled",
      trakoscan: "Trakošćan",
      plitvice: "Plitvice",
      ljubljana: "Ljubljana",
      portrait: "portrait",
      cave: "grotte",
      castle: "château",
    },
    alt: (n, subject) => (subject ? `Photographie ${n}, ${subject}` : `Photographie ${n}`),
    viewer: "Photographie",
    close: "FERMER ×",
    keys: "← → PARCOURIR · ÉCHAP FERMER",
    removal: "DEMANDER LE RETRAIT",
    removalSubject: "Demande de retrait de photo : {name}",
    removalBody: "Photo : {name}\n\nMotif :\n",
  },

  privacy: {
    crumb: "Confidentialité",
    updated: (date) => `Dernière mise à jour : ${date}`,
  },

  studio: {
    title: "Sites web pour petites entreprises · Lorenzo Marchisio",
    description: (fastest, slowest, from) =>
      `Sites web rapides et multilingues pour petites entreprises. Prix fixes dès ${from}, en ligne en ${fastest} à ${slowest}\u00a0jours ouvrables. Appel de 30\u00a0minutes offert.`,
    crumb: "Sites web",
    skip: "Aller au formulaire de demande",
    start: "Démarrer un projet",
    cta: "Appel gratuit de 30\u00a0minutes",
    nav: {
      label: "Sur cette page",
      work: "Réalisations",
      prices: "Tarifs",
      process: "Déroulement",
      faq: "Questions",
      gallery: "Galerie",
    },

    hero: {
      eyebrow: "120° · STUDIO WEB",
      title: "Des sites web qui rendent votre entreprise facile à trouver et facile à choisir.",
      sub: (fastest, slowest, from) =>
        `Dans les langues que parlent vos clients. En ligne en ${fastest} à ${slowest} jours ouvrables, à prix fixe dès ${from}.`,
      work: "Voir mes réalisations",
    },

    work: {
      title: "Quelques réalisations",
      lead: "Des sites récents, chacun conçu pour s'ouvrir vite sur un téléphone.",
      all: (count) => (count ? `Voir tous les projets (${count})` : "Voir tous les projets"),
    },

    forYou: {
      title: "Ce qu'un site web apporte à votre entreprise",
      lead: "Avant de passer, d'appeler ou de réserver, beaucoup de gens vous cherchent sur leur téléphone. Ce qu'ils trouvent décide s'ils vous choisissent, vous, ou l'adresse d'à côté.",
      items: [
        {
          title: "De nouveaux clients vous trouvent sur Google",
          text: "Les gens cherchent ce dont ils ont envie, comme « brunch près de moi », pas votre nom. Votre site dit à Google tout ce que vous proposez et renforce votre fiche d'établissement Google, ce qui vous aide à apparaître plus haut. Personne ne peut garantir un classement, mais sans site, vous partez avec un temps de retard.",
        },
        {
          title: "Plus de visiteurs deviennent clients",
          text: "Photos, prix, horaires et un bouton bien visible pour appeler, réserver ou obtenir l'itinéraire. Sur un téléphone, on décide en quelques secondes, et une page rapide et claire facilite la décision.",
        },
        {
          title: "Vous apparaissez comme le choix évident",
          text: "Quand on compare deux adresses, celle qui a un vrai site fait sérieux et inspire confiance. Sans site, certains se demanderont si vous êtes toujours ouvert.",
        },
        {
          title: "Chaque client se sent le bienvenu",
          text: "Étudiants, touristes et expatriés cherchent dans leur propre langue. Un site en anglais, en néerlandais ou en français leur parle avant même qu'ils ne poussent la porte.",
        },
        {
          title: "Moins d'appels pour les mêmes questions",
          text: "Horaires, prix, parking, paiement par carte : tout est sur votre site, même à minuit quand vous êtes fermé.",
        },
        {
          title: "Il est à vous, pas à une plateforme",
          text: "Les réseaux sociaux décident qui voit vos publications, et les comptes se font pirater ou bloquer. Votre site et votre nom de domaine continuent de fonctionner, quoi que décide une plateforme.",
        },
      ],
      unsure:
        "Vous ne savez pas si un site en vaut la peine pour votre entreprise ? Posez-moi la question pendant l'appel gratuit. Si ça ne vous apporte rien, je vous le dirai.",
    },

    prices: {
      title: "Formules et tarifs",
      lead: "Des prix fixes, convenus avant que je commence. Tous les prix s'entendent hors TVA.",
      onRequest: "Prix sur demande",
      from: (price) => `À partir de ${price}`,
      days: (days) => `En ligne en ${days} jours ouvrables`,
      agreed: "Délai convenu ensemble",
      plus: (name) => `Tout ce que comprend ${name}, et en plus :`,
      includes: {
        launch: ["Une page", "Une langue"],
        presence: ["Jusqu'à cinq pages", "Jusqu'à trois langues"],
        business: [
          "Menu ou liste de prix sous forme de vraie page web, facile à lire sur un téléphone (pas un PDF)",
          "Bouton de réservation relié à l'outil de réservation que vous utilisez déjà",
          "Statistiques de visite sans cookies",
        ],
        custom: [
          "Fonctionnalités avancées, pensées et développées autour de votre façon de travailler",
        ],
      },
      allLabel: "Toutes les formules comprennent",
      all: [
        "Formulaire de contact",
        "Relié à votre fiche d'établissement Google",
        "Configuré pour être trouvé sur Google",
        "Mentions légales obligatoires et politique de confidentialité",
      ],
      noneLabel: "Aucune formule ne comprend",
      none: (domainFee) => [
        "Photographie professionnelle",
        "Création de logo",
        "Adresses e-mail, comme info@votreentreprise.be",
        `Les frais annuels du nom de domaine, généralement moins de ${domainFee}, que vous payez directement`,
      ],
      extras: "Options",
      language: (price) => `Langue supplémentaire : ${price}.`,
      page: (price) => `Page supplémentaire : ${price}.`,
      payment: "Paiement",
      split: (deposit, onLaunch) => `${deposit} au démarrage, ${onLaunch} à la mise en ligne.`,
      vat: "TVA",
      vatText: "Les prix s'entendent hors TVA, ajoutée le cas échéant.",
    },

    process: {
      title: "Comment ça marche",
      steps: (deposit, onLaunch) => [
        {
          title: "Appel vidéo gratuit",
          text: "Nous parlons de votre entreprise et de ce dont le site a besoin.",
        },
        {
          title: `Validation et acompte de ${deposit}`,
          text: "Vous recevez un devis écrit qui précise ce qui est inclus, le prix et les conditions. Une fois le devis accepté, vous versez l'acompte.",
        },
        { title: "Aperçu", text: "Je réalise le site et vous envoie un lien d'aperçu." },
        { title: "Modifications", text: "Vous avez droit à deux séries de modifications." },
        {
          title: "Mise en ligne",
          text: `Le site est mis en ligne et vous réglez les ${onLaunch} restants.`,
        },
      ],
      timing: (launch, presence, business) =>
        `La formule Launch demande ${launch} jours ouvrables, Presence ${presence} et Business ${business}, comptés à partir du moment où vous avez accepté le devis et envoyé vos textes et photos. Les jours où l'aperçu attend votre retour ne comptent pas.`,
    },

    care: {
      title: "Contrat de maintenance",
      lead: "Rien à gérer, et une seule personne à qui s'adresser.",
      covers: (minutes) =>
        `Hébergement, mises à jour de sécurité, sauvegardes, surveillance de la disponibilité, configuration de votre nom de domaine avec un rappel avant son renouvellement, et ${minutes} minutes de modifications par mois, mises à jour du menu comprises. Les minutes non utilisées ne sont pas reportées.`,
      price: (price) => `${price} par mois.`,
      vat: "Hors TVA, ajoutée le cas échéant.",
      notice: (months) => (months === 1 ? "un préavis d'un mois" : `un préavis de ${months} mois`),
      term: (months, notice) =>
        `Engagement minimum de ${months} mois, puis résiliable à tout moment moyennant ${notice}.`,
      optional:
        "Le contrat de maintenance est facultatif. Sans lui, ou après sa résiliation, je vous remets le site terminé ; l'hébergement, le formulaire de contact et les modifications sont alors à gérer de votre côté.",
    },

    why: {
      title: "Pourquoi un ingénieur logiciel",
      fast: {
        title: "Rapide sur téléphone",
        text: "Les pages sont en HTML simple, avec quasiment pas de JavaScript : elles s'ouvrent vite, même sur le réseau mobile.",
      },
      secure: {
        title: "Sécurisé, sans plugins à pirater",
        text: "Votre site est un ensemble de fichiers statiques sur un réseau mondial, sans panneau d'administration ni plugins : il y a bien moins de portes d'entrée.",
      },
      languages: {
        title: "Conçu en plusieurs langues",
        text: "Chaque langue a un texte à part entière, pas un widget de traduction.",
      },
      integrations: {
        title: "Peut intégrer réservations, menus et commandes",
        text: "J'écris le code moi-même : votre site peut donc fonctionner avec les outils que vous utilisez déjà.",
      },
      example: (name) => `Voir un exemple : ${name}`,
      about: "En savoir plus sur moi",
    },

    faq: {
      title: "Questions",
      items: (domainFee, minimumMonths, notice) => [
        {
          question: "À qui appartiennent le site et le nom de domaine ?",
          answer: `À vous, dès que le site est entièrement payé. Le nom de domaine est enregistré à votre nom et vous payez directement ses frais annuels, généralement moins de ${domainFee}. Vous pouvez transférer l'un comme l'autre où vous voulez.`,
        },
        {
          question: "Que dois-je fournir ?",
          answer:
            "Des photos et un logo que vous avez le droit d'utiliser, ainsi que les informations sur votre entreprise. Je peux rédiger les textes à partir de ce que vous me dites, et vous vérifiez chaque page avant sa mise en ligne.",
        },
        {
          question: "Utilisez-vous l'IA ?",
          answer: "Oui, pour aller plus vite. Ensuite, je relis, corrige et finalise chaque page moi-même.",
        },
        {
          question: "Puis-je résilier le contrat de maintenance ?",
          answer: `Oui, après les ${minimumMonths} premiers mois, moyennant ${notice}.`,
        },
        {
          question: "Et si je veux des modifications plus tard ?",
          answer:
            "Les petites modifications sont comprises dans le contrat de maintenance. Les plus importantes font d'abord l'objet d'un devis, et rien ne commence sans votre accord.",
        },
        {
          question: "Travaillez-vous avec des entreprises hors de Belgique ?",
          answer:
            "Oui, partout dans le monde. Nous travaillons ensemble à distance, par appel vidéo et par e-mail, et si vous êtes dans les environs, nous pouvons aussi nous voir en personne.",
        },
        {
          question: "Les mentions légales obligatoires sont-elles incluses ?",
          answer:
            "Oui. J'ajoute les informations que la loi impose sur le site d'une entreprise, comme votre numéro d'entreprise et votre numéro de TVA, ainsi qu'une politique de confidentialité pour le formulaire de contact, à partir des éléments que vous me fournissez. Il s'agit d'une base standard, pas d'un conseil juridique.",
        },
      ],
    },

    schema: {
      catalog: "Formules de sites web",
      offer: (name) => `Site ${name}`,
    },
  },

  start: {
    title: "Parlons de votre site",
    lead: "Parlez-moi de votre entreprise. Je vous réponds sous un jour ouvrable pour fixer un appel vidéo gratuit.",
    direct: "Vous préférez l'e-mail ? Écrivez à",
    sent: "Demande envoyée",
    sentText:
      "Merci. Je vous réponds sous un jour ouvrable pour fixer un appel vidéo. Un e-mail de confirmation vient de vous être envoyé.",
    failed: "Votre demande n'a pas été envoyée",
    failedText: "Un problème est survenu de mon côté. Réessayez, ou écrivez-moi directement à",
    name: "Votre nom",
    email: "E-mail",
    business: "Nom de l'entreprise",
    phone: "Téléphone ou WhatsApp",
    optional: "(facultatif)",
    message: "Votre entreprise en quelques mots",
    messageHint: "Ce que vous faites, où vous êtes, et ce que vous attendez du site.",
    send: "Envoyer",
    sending: "Envoi en cours…",
    note: "J'utilise vos coordonnées uniquement pour vous répondre.",
    privacy: "Politique de confidentialité",
    errors: {
      required: "Veuillez remplir ce champ.",
      email: "Veuillez saisir une adresse e-mail valide.",
      tooLong: "Le texte saisi est trop long.",
      rate: "Trop de demandes depuis votre connexion. Veuillez réessayer dans quelques minutes.",
    },
  },

  projects: {
    title: "Projets de sites web · Lorenzo Marchisio",
    description:
      "Les sites web que j'ai réalisés pour de petites entreprises\u00a0: le point de départ, ce que fait le site aujourd'hui et des captures d'écran.",
    crumb: "Galerie",
    heading: "Projets de sites web",
    lead: "Tous les sites que j'ai réalisés, chacun avec son histoire.",
    empty:
      "Les premiers projets sont en cours de réalisation. Les tarifs, le déroulement et les réponses aux questions fréquentes sont sur la page du studio.",
    studio: "Aller à la page du studio",
    ctaTitle: "Vous voulez un site pour votre entreprise ?",
    ctaLead: "Parlez-m'en, et je vous réponds sous un jour ouvrable.",
    schema: "Projets de sites web",

    concept: "Concept",
    named: (name) => `${name} (Concept)`,
    story: "Lire toute l'histoire",
    site: (concept, domain) =>
      `${concept ? "Site concept" : "Site en ligne"} : ${domain} (s'ouvre dans un nouvel onglet)`,

    pageTitle: (name) => `${name} · Site réalisé par Lorenzo Marchisio`,
    visit: (domain) => `Visiter ${domain}`,
    facts: {
      status: "Statut",
      live: "En ligne",
      package: "Formule",
      languages: "Langues",
      delivered: "Livré en",
      days: (days) => `${days} jours`,
      launched: "Lancé en",
    },
    desktop: "Ordinateur",
    phone: "Téléphone",
    brief: "Le brief",
    before: "Avant",
    built: "Ce qui a été réalisé",
    inside: "Le site en détail",
    results: "Résultats",
    measured: (date, source) => `Mesuré le ${date}. Source : ${source}`,
    quote: "Ce qu'en dit le client",
    stack: (tools) => `Réalisé avec : ${tools}`,
    similar: "Vous voulez un site comme celui-ci ?",
    similarLead: "Parlez-moi de votre entreprise, et je vous réponds sous un jour ouvrable.",
    all: "← Tous les projets",
  },

  email: {
    subject: "Votre demande de projet",
    text: "Bonjour,\n\nMerci pour votre demande de projet. Je vous réponds sous un jour ouvrable pour fixer un appel vidéo gratuit de 30 minutes.\n\nSi vous souhaitez ajouter quelque chose d'ici là, répondez simplement à cet e-mail.\n\nLorenzo Marchisio\nhttps://lorenzomarchisio.me/fr/websites",
  },
};

export default fr;

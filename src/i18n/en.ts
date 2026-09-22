// Every word the components print, in English. it.ts and fr.ts are typed off
// this file, so a key missing there fails the build. Values rendered with
// set:html may hold <br />. Content that carries its own translations is not
// here: journey.json, the project files and the privacy policy.

const intro =
  "Nothing here resolves until you stand somewhere specific. There are three such places, and the shape is different from each one.";

export default {
  meta: {
    title: "Lorenzo Marchisio · Engineer, Founder, Photographer",
    // What Google shows under the name; the intro says nothing out of context.
    description:
      "Computer engineering student at Politecnico di Torino, based in Leuven. I write software, build websites for small businesses and take photographs.",
  },

  roles: { engineer: "ENGINEER", founder: "FOUNDER", photographer: "PHOTOGRAPHER" },

  language: "Language",

  footer: {
    label: "Footer",
    home: "Portfolio",
    gallery: "Photo gallery",
    websites: "Websites",
    privacy: "Privacy policy",
  },

  pageBar: {
    trail: "Breadcrumb",
    home: "Home",
    wordmark: "Lorenzo Marchisio, home",
    back: "Back",
  },

  skip: "Skip to content",

  hero: {
    status: "UNRESOLVED",
    intro,
    study: "COMPUTER ENGINEERING · POLITECNICO DI TORINO",
    city: "LEUVEN",
    region: ", VLAAMS-BRABANT",
    hint: "SCROLL TO ORBIT",
  },

  engineer: {
    headline: 'WHAT I<br class="narrow-only" /> REACH FOR<br />FIRST',
    intro:
      "Not a language. A method. Engineering school taught me an order of operations long before it taught me a stack, and the order is the part that transfers.",
    method: [
      {
        title: "Find the binding constraint",
        text: "Most problems are one limit wearing a costume. I go looking for the one that actually moves before touching anything else.",
      },
      {
        title: "Measure before arguing",
        text: "A number I trust beats a story I like. If it can't be measured, it doesn't get claimed.",
      },
      {
        title: "Tolerances, not perfection",
        text: "Decide what's allowed to be wrong, and by how much, while it's still cheap to decide.",
      },
      {
        title: "The failure is at the interface",
        text: "Parts rarely break alone. I read the handoffs: between systems, teams, and the people who will use the thing.",
      },
      {
        title: "Crudest version that survives",
        text: "Build what holds under real contact first, then make every addition earn its place.",
      },
      {
        title: "Leave it legible",
        text: "Someone has to change this without me in the room. That's part of the spec, not a courtesy.",
      },
    ],
    caption: "FROM HERE THE OBJECT<br />READS AS A BRACE PAIR",
    sentence:
      "The shape of something that has to hold, which is what engineering is, before it is any particular tool.",
    cv: "READ THE CV ↓",
  },

  journey: {
    eyebrow: "CUNEO → LEUVEN",
    headline: "THE GROUND<br />FLATTENS",
    note: "Keep scrolling. The corridor runs east while the ridge behind it, the Cuneo skyline, loses relief the further right you go.",
  },

  founder: {
    statement:
      "The angle exists in the geometry first. Turned this far, the same points read as a network.",
    headline: "WHAT I AM<br />BUILDING",
    studio: {
      label: "01 · WEBSITE STUDIO",
      title: "Websites for small businesses",
      text: "Fast, multilingual websites for restaurants, shops and practices, anywhere in the world. Fixed prices, live in days, built with the same method as the software I write for industry.",
      link: "SEE THE STUDIO →",
    },
    unnamed: {
      label: "02 · UNNAMED",
      title: "Too early to name",
      first:
        "It is early enough that describing it would be a claim rather than a fact, so this part holds its shape and waits.",
      second:
        "What I can say: it starts from work I do every day inside industrial software, and from how much of it is still done by hand. I am not recruiting anyone and I am not pitching. And it does not have to be this: any idea, any field. If what you are building needs what I can do, I am listening.",
    },
  },

  photography: {
    headline: "SIX FRAMES",
    blurb: "Nothing here poses. You commit to an angle and find out.",
    hint: "SCROLL TO DEVELOP ↓",
    all: "FULL GALLERY →",
    // In frame order, 01 to 06.
    alts: [
      "Rider in a red helmet sitting on an orange enduro bike under hanging leaves, lit against the dark",
      "Trakošćan Castle on its wooded hill, mirrored in the still lake below",
      "Football training seen through the goal net, a player in black in the foreground",
      "Footballer in a black shirt walking away across the pitch in evening light",
      "Plitvice waterfalls falling into a turquoise pool between green cliffs",
      "Rider in a red helmet astride an orange enduro bike in the dark",
    ],
  },

  contact: {
    headline: "SAY THE<br />ACTUAL THING",
    cv: "CV ↓",
    form: "DIRECT MESSAGE",
    privacy: "NO TRACKING · PRIVACY",
    name: "NAME",
    namePlaceholder: "Your name",
    email: "EMAIL",
    emailPlaceholder: "you@company.com",
    message: "MESSAGE",
    messagePlaceholder: "Say the actual thing.",
    send: "SEND →",
    sending: "SENDING",
    // By the endpoint's answer: 400, 429, anything else.
    errors: {
      invalid: "Please fill in every field, with a valid email address.",
      rate: "Too many messages. Please try again later.",
      failed: "Failed to send message. Please try again.",
    },
    resolved: "RESOLVED",
    received: "360° · MESSAGE RECEIVED",
    again: "WRITE ANOTHER",
  },

  notFound: {
    title: "Page not found · Lorenzo Marchisio",
    description: "That page doesn't exist.",
    eyebrow: "404 · NO SUCH ANGLE",
    headline: "NOTHING<br />RESOLVES HERE",
    lead: "The page you asked for does not exist, or has moved somewhere the object no longer reads from.",
    back: "BACK TO 000° ↓",
  },

  gallery: {
    title: "Gallery · Lorenzo Marchisio",
    description:
      "Motorcycle, football and travel photographs from Slovenia and Croatia, by Lorenzo Marchisio.",
    crumb: "Every Frame",
    headline: "EVERY<br />FRAME",
    count: (count: string) => `${count} FRAMES`,
    filter: "Filter by category",
    all: "ALL",
    // The words in the photo filenames, which name the categories and make the
    // alt text. A word left out is shown as it is spelled in the filename.
    words: {} as Record<string, string>,
    alt: (n: string, subject: string) => (subject ? `Photograph ${n}, ${subject}` : `Photograph ${n}`),
    viewer: "Photograph",
    close: "CLOSE ×",
    keys: "← → BROWSE · ESC CLOSE",
    removal: "REQUEST REMOVAL",
    // {name} is the photo's filename.
    removalSubject: "Photo removal request: {name}",
    removalBody: "Photo: {name}\n\nReason:\n",
  },

  privacy: {
    crumb: "Privacy",
    updated: (date: string) => `Last updated: ${date}`,
  },

  studio: {
    title: "Websites for small businesses, anywhere · Lorenzo Marchisio",
    description: (fastest: number, slowest: number, from: string) =>
      `Fast websites for small businesses, in your customers' languages. Fixed prices from ${from}, live in ${fastest} to ${slowest} working days. Free 30-minute call.`,
    crumb: "Websites",
    skip: "Skip to the project form",
    start: "Start a project",
    cta: "Request a free 30-minute call",
    nav: {
      label: "On this page",
      work: "Work",
      prices: "Prices",
      process: "How it works",
      faq: "Questions",
      gallery: "Gallery",
    },

    hero: {
      eyebrow: "120° · WEBSITE STUDIO",
      title: "Websites that make your business easy to find and easy to choose.",
      sub: (fastest: number, slowest: number, from: string) =>
        `In the languages your customers speak. Live in ${fastest} to ${slowest} working days, at a fixed price from ${from}.`,
      work: "See my work",
    },

    work: {
      title: "Selected work",
      lead: "Recent sites, each built to open fast on a phone.",
      all: (count?: number) => (count ? `See all projects (${count})` : "See all projects"),
    },

    forYou: {
      title: "What a website does for your business",
      lead: "Before they visit, call or book, many people look you up on their phone. What they find decides whether they choose you or the place next door.",
      items: [
        {
          title: "New customers can find you on Google",
          text: "People search for what they want, like “brunch near me”, not for your name. Your website tells Google everything you offer and strengthens your Google Business Profile, which helps you show up higher. No one can promise a position, but without a site you start behind.",
        },
        {
          title: "More visitors become customers",
          text: "Photos, prices, opening hours and one clear button to call, book or get directions. People decide in seconds on a phone, and a fast, clear page makes the decision easy.",
        },
        {
          title: "You look like the obvious choice",
          text: "When people compare two places, the one with a proper website looks established and trustworthy. Without one, some will wonder if you're even still open.",
        },
        {
          title: "Every customer feels welcome",
          text: "Students, tourists and expats search in their own language. A site in English, Dutch or French speaks to them before they walk in.",
        },
        {
          title: "Fewer calls with the same questions",
          text: "Hours, prices, parking, whether you take cards: it's all on your site, even at midnight when you're closed.",
        },
        {
          title: "It's yours, not a platform's",
          text: "Social media decides who sees your posts, and accounts get hacked or blocked. Your website and your domain keep working, whatever a platform decides.",
        },
      ],
      unsure:
        "Not sure a website is worth it for your business? Ask me on the free call. If it won't help, I'll say so.",
    },

    prices: {
      title: "Packages and prices",
      lead: "Fixed prices, agreed before I start. All prices exclude VAT.",
      onRequest: "Price on request",
      from: (price: string) => `From ${price}`,
      days: (days: number) => `Live in ${days} working days`,
      agreed: "Timeline agreed together",
      plus: (name: string) => `Everything in ${name}, plus:`,
      // What sets each package apart; the numbers are in data/pricing.ts.
      includes: {
        launch: ["One page", "One language"],
        presence: ["Up to five pages", "Up to three languages"],
        business: [
          "Menu or price list as a real web page, easy to read on a phone (not a PDF)",
          "Booking button connected to the booking service you already use",
          "Visitor statistics without cookies",
        ],
        custom: ["Advanced features, designed and built around how your business works"],
      },
      allLabel: "Every package includes",
      all: [
        "Contact form",
        "Linked to your Google Business Profile",
        "Set up to be found on Google",
        "Legally required business details and a privacy notice",
      ],
      noneLabel: "No package includes",
      none: (domainFee: string) => [
        "Professional photography",
        "Logo design",
        "Email addresses, like info@yourbusiness.be",
        `The domain's yearly fee, usually under ${domainFee}, which you pay directly`,
      ],
      extras: "Extras",
      language: (price: string) => `Additional language: ${price}.`,
      page: (price: string) => `Additional page: ${price}.`,
      payment: "Payment",
      split: (deposit: string, onLaunch: string) => `${deposit} to start, ${onLaunch} at launch.`,
      vat: "VAT",
      vatText: "Prices exclude VAT, which is added where it applies.",
    },

    process: {
      title: "How it works",
      steps: (deposit: string, onLaunch: string) => [
        { title: "Free video call", text: "We talk about your business and what the site needs." },
        {
          title: `Approve and pay ${deposit}`,
          text: "You get a written proposal with what's included, the price and the terms. Once you approve it, you pay the deposit.",
        },
        { title: "Preview", text: "I build the site and send you a preview link." },
        { title: "Changes", text: "You get two rounds of changes." },
        { title: "Launch", text: `The site goes live and you pay the final ${onLaunch}.` },
      ],
      timing: (launch: number, presence: number, business: number) =>
        `Launch takes ${launch} working days, Presence ${presence} and Business ${business}, counted from when you approve the proposal and send your texts and photos. Days the preview waits for your feedback don't count.`,
    },

    care: {
      title: "Care plan",
      lead: "Nothing to manage, and one person to ask.",
      covers: (minutes: number) =>
        `Hosting, security updates, backups, uptime monitoring, your domain's settings with a reminder before it renews, and ${minutes} minutes of changes a month, menu updates included. Unused minutes don't carry over.`,
      price: (price: string) => `${price} a month.`,
      vat: "Excluding VAT, which is added where it applies.",
      notice: (months: number) => `${months} month${months === 1 ? "'s" : "s'"} notice`,
      term: (months: number, notice: string) =>
        `Minimum ${months} months, then cancel any time with ${notice}.`,
      optional:
        "The care plan is optional. Without it, or after you cancel it, I hand the finished site over to you, and hosting, the contact form and changes become yours to manage.",
    },

    why: {
      title: "Why a software engineer",
      fast: {
        title: "Fast on phones",
        text: "Pages are plain HTML with almost no JavaScript, so they open quickly even on mobile data.",
      },
      secure: {
        title: "Secure, with no plugins to get hacked",
        text: "Your site is a set of static files on a global network, with no admin panel or plugins, so there's far less to break into.",
      },
      languages: {
        title: "Built in several languages",
        text: "Every language gets its own proper text, not a translation widget.",
      },
      integrations: {
        title: "Can connect bookings, menus and ordering",
        text: "I write the code myself, so your site can work with the tools you already use.",
      },
      example: (name: string) => `See an example: ${name}`,
      about: "More about me",
    },

    faq: {
      title: "Questions",
      items: (domainFee: string, minimumMonths: number, notice: string) => [
        {
          question: "Who owns the website and the domain?",
          answer: `You do, once the site is paid in full. The domain is registered in your name and you pay its yearly fee directly, usually under ${domainFee}. You can take both anywhere.`,
        },
        {
          question: "What do I need to provide?",
          answer:
            "Photos and a logo you have the right to use, and your business details. I can write the text from what you tell me, and you check every page before it goes live.",
        },
        {
          question: "Do you use AI?",
          answer: "Yes, to build faster. Every page is then reviewed, corrected and finished by me.",
        },
        {
          question: "Can I cancel the care plan?",
          answer: `Yes, after the first ${minimumMonths} months, with ${notice}.`,
        },
        {
          question: "What if I want changes later?",
          answer:
            "Small changes are covered by the care plan. Bigger ones get a price first, and nothing starts until you agree.",
        },
        {
          question: "Do you work with businesses outside Belgium?",
          answer:
            "Yes, anywhere in the world. We work together remotely, by video call and email, and if you're nearby, we can also meet in person.",
        },
        {
          question: "Is the legally required business information included?",
          answer:
            "Yes. I add the details the law asks a business website to show, like your company and VAT numbers, and a privacy notice for the contact form, using the information you give me. It's a standard setup, not legal advice.",
        },
      ],
    },

    // Structured data for search engines.
    schema: {
      catalog: "Website packages",
      offer: (name: string) => `${name} website`,
    },
  },

  start: {
    title: "Let's talk about your website",
    lead: "Tell me about your business. I'll reply within one working day to set up a free video call.",
    direct: "Prefer email? Write to",
    sent: "Request sent",
    sentText:
      "Thank you. I'll reply within one working day to set up a video call, and a confirmation is on its way to your inbox.",
    failed: "Your request wasn't sent",
    failedText: "Something went wrong on my side. Please try again, or email me directly at",
    name: "Your name",
    email: "Email",
    business: "Business name",
    phone: "Phone or WhatsApp",
    optional: "(optional)",
    message: "Your business in a few words",
    messageHint: "What you do, where you are, and what you'd like the website to do.",
    send: "Send",
    sending: "Sending…",
    note: "I only use your details to reply to you.",
    privacy: "Privacy policy",
    // The endpoint answers a failed check with these codes too.
    errors: {
      required: "Please fill in this field.",
      email: "Please enter a valid email address.",
      tooLong: "This is too long.",
      rate: "Too many requests from your connection. Please try again in a few minutes.",
    },
  },

  projects: {
    title: "Website projects · Lorenzo Marchisio",
    description:
      "Websites I've built for small businesses: where each owner started, what the site does now, and screenshots on laptop and phone.",
    crumb: "Gallery",
    heading: "Website projects",
    lead: "Every site I've built, with the story behind each one.",
    empty:
      "The first projects are being built right now. Prices, the process and answers to common questions are on the studio page.",
    studio: "Go to the studio page",
    ctaTitle: "Want a website for your business?",
    ctaLead: "Tell me about it, and I'll reply within one working day.",
    schema: "Website projects",

    concept: "Concept",
    named: (name: string) => `${name} (Concept)`,
    story: "Read the full story",
    site: (concept: boolean, domain: string) =>
      `${concept ? "Concept site" : "Live site"}: ${domain} (opens in a new tab)`,

    pageTitle: (name: string) => `${name} · Website by Lorenzo Marchisio`,
    visit: (domain: string) => `Visit ${domain}`,
    facts: {
      status: "Status",
      live: "Live",
      package: "Package",
      languages: "Languages",
      delivered: "Delivered in",
      days: (days: number) => `${days} days`,
      launched: "Launched",
    },
    desktop: "Desktop",
    phone: "Phone",
    brief: "The brief",
    before: "Before",
    built: "What was built",
    inside: "Inside the site",
    results: "Results",
    measured: (date: string, source: string) => `Measured ${date}. Source: ${source}`,
    quote: "What the client says",
    stack: (tools: string) => `Built with: ${tools}`,
    similar: "Want something like this?",
    similarLead: "Tell me about your business, and I'll reply within one working day.",
    all: "← All projects",
  },

  // The confirmation sent to whoever fills in the project form. Nothing the
  // visitor typed goes in it (see the endpoint).
  email: {
    subject: "Your project request",
    text: "Hello,\n\nThank you for your project request. I'll reply within one working day to set up a free 30-minute video call.\n\nIf you want to add anything in the meantime, reply to this email.\n\nLorenzo Marchisio\nhttps://lorenzomarchisio.me/en/websites",
  },
};

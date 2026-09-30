export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function dir(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

const en = {
  localeName: "English",
  otherLocaleName: "العربية",
  brand: "La Vora Digital",

  meta: {
    title: "La Vora Digital — Digital Advertising Agency",
    description:
      "La Vora Digital plans, buys and optimises digital advertising — paid social, search, programmatic and creative.",
  },

  nav: {
    home: "Home",
    work: "Project",
    service: "Service",
    about: "About",
    contact: "Contact us",
    cta: "Get a Proposal",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    servicesLabel: "Services",
    switchTo: "العربية",
  },

  hero: {
    // One emphasised noun per line keeps the light/semibold motif of the old headline.
    headline: [
      { lead: "Build your", strong: "brand" },
      { lead: "Grow your", strong: "business" },
      { lead: "Shape your", strong: "future" },
    ],
    lead:
      "La Vora Digital is a full-service digital agency specializing in advertising, digital marketing, and web development, helping brands connect with their audience, grow their business, and build meaningful digital experiences.",
    imageAlt: "A camera operator on a lit studio set, signalling to the crew",
    eyebrow: "Digital advertising agency",
    stats: [
      { n: "100+", l: "Impressions served" },
      { n: "500+", l: "Campaigns launched" },
    ],
  },

  collaboration: {
    titleLead: "We connect brands with the",
    titleStrong: "right audience.",
    body:
      "We combine smart targeting, strategic media buying and continuous optimisation to help brands reach the right audience, maximise every budget and turn advertising into measurable business results.",
    features: [
      {
        title: "Precise Audience Targeting",
        desc: "Reach the right people with data-driven audience targeting and campaign strategies.",
      },
      {
        title: "Performance-Focused Campaigns",
        desc: "Every campaign is managed with clear KPIs, measurable results and business objectives in mind.",
      },
      {
        title: "Smart Budget Optimisation",
        desc: "We continuously analyse campaign performance and shift budgets toward what delivers the best results.",
      },
      {
        title: "Transparent Reporting",
        desc: "Clear performance reports give you a complete view of your campaigns, spending and results.",
      },
    ],
  },

  services: {
    titleLead: "Our",
    titleStrong: "Services",
    titleTail: "",
    seeMore: "See our projects",
    learnMore: "Learn more",
    adsAlt: "A man leaping with a bass guitar above a phone, hands reaching out of its screen among floating hearts and emoji",
    webAlt: "Website designs shown on a laptop and two floating browser screens",
    marketingAlt:
      "A laptop showing a campaign dashboard, ringed by social network icons and analytics cards",
    items: [
      {
        title: "Advertising Agency",
        desc:
          "Campaign strategy and media buying across Meta and Google, built around your audience and business goals.",
      },
      {
        title: "Web Development",
        desc:
          "Websites and landing pages designed to support your brand and turn digital traffic into opportunities.",
      },
      {
        title: "Digital Marketing",
        desc:
          "Digital strategies that connect your brand with the right audience across relevant online channels.",
      },
    ],
  },

  banner: {
    titleLead: "Always-on advertising,",
    titleStrong: "always improving",
    body:
      "We monitor campaign performance, optimise every opportunity and continuously refine your media strategy.",
    imageAlt:
      "A Meta Ads Manager dashboard on a monitor, with campaign status and audience breakdown panels beside it",
  },

  process: {
    titleLead: "How we turn",
    titleStrong: "strategy",
    titleTail: "into results",
    eyebrow: "How we work",
    body:
      "A clear four-step process designed to make your advertising more targeted, measurable and continuously optimised.",
    cta: "Get a Proposal",
    steps: [
      {
        title: "Discover",
        desc: "We learn your business, audience, objectives and existing campaign performance before building the right approach.",
      },
      {
        title: "Strategy",
        desc: "We define the audience, campaign structure, channels, budget allocation and KPIs around your business goals.",
      },
      {
        title: "Launch",
        desc: "We set up campaigns, creatives, tracking and targeting, then launch across the right advertising platforms.",
      },
      {
        title: "Optimise",
        desc: "We monitor performance, test new approaches and continuously optimise budget, audience and creative.",
      },
    ],
  },

  clients: {
    titleLead: "Our",
    titleStrong: "clients",
  },

  cta: {
    titleLead: "Let's start your",
    titleStrong: "project",
    titleTail: "with us",
    body:
      "Tell us about your goals, and let's build the right strategy for your brand.",
  },

  portfolio: {
    titleLead: "Selected",
    titleStrong: "projects",
    intro:
      "Projects across advertising, web development and digital marketing.",
    filterLabel: "Filter by service",
    filterAll: "All",
    services: {
      ads: "Advertising",
      web: "Web Development",
      marketing: "Digital Marketing",
    },
    empty: "Our case studies are being prepared. Check back soon.",
    placeholder: "Placeholder",
    view: "View project",
    back: "All projects",
    visit: "Visit the live site",
    metaService: "Service",
    metaYear: "Year",
    ctaTitle: "Have a project in mind?",
    cta: "Start a project",
  },

  form: {
    name: "Name",
    email: "Email",
    company: "Company",
    message: "What are you running now, and what is not working?",
    submit: "Send enquiry",
    sending: "Sending",
    successTitle: "Your enquiry is in.",
    successBody:
      "We read every one and reply within two working days, from the address you gave us.",
    errorRequired: "Name, email and message are required.",
    errorEmail: "That email address does not look valid.",
    errorSend: "We could not send that. Email us directly instead.",
  },

  footer: {
    servicesTitle: "Services",
    companyTitle: "Company",
    rights: "©2026 La Vora Digital. All rights reserved.",
    blurb:
      "La Vora Digital is a digital advertising agency that plans, buys and optimises media for brands that care what every impression returns.",
    terms: "Terms",
    privacy: "Privacy",
  },
};

/**
 * Arabic copy. Written to be read as Arabic rather than transliterated English,
 * so a few lines are shorter than their English counterparts by design.
 */
const ar: Dictionary = {
  localeName: "العربية",
  otherLocaleName: "English",
  brand: "لا فورا ديجيتال",

  meta: {
    title: "لا فورا ديجيتال — وكالة إعلانات رقمية",
    description:
      "لا فورا ديجيتال تخطط وتشتري وتحسّن الإعلانات الرقمية: السوشيال المدفوع والبحث والبرمجي والمحتوى الإبداعي.",
  },

  nav: {
    home: "الرئيسية",
    work: "مشاريعنا",
    service: "الخدمات",
    about: "من نحن",
    contact: "تواصل معنا",
    cta: "اطلب عرض سعر",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    servicesLabel: "الخدمات",
    switchTo: "English",
  },

  hero: {
    // Arabic carries "your" as a suffix, so the possessed noun is the emphasised word.
    headline: [
      { lead: "ابنِ", strong: "علامتك" },
      { lead: "نمِّ", strong: "أعمالك" },
      { lead: "اصنع", strong: "مستقبلك" },
    ],
    lead:
      "لا فورا ديجيتال وكالة رقمية متكاملة الخدمات متخصصة في الإعلانات والتسويق الرقمي وتطوير المواقع، تساعد العلامات على الوصول إلى جمهورها، وتنمية أعمالها، وبناء تجارب رقمية ذات أثر.",
    imageAlt: "مصوّر في استوديو مضاء يشير إلى فريق العمل",
    eyebrow: "وكالة إعلانات رقمية",
    stats: [
      { n: "١٠٠+", l: "ظهور إعلاني" },
      { n: "٥٠٠+", l: "حملة أُطلقت" },
    ],
  },

  collaboration: {
    titleLead: "نصل العلامات",
    titleStrong: "بالجمهور الصحيح.",
    body:
      "نجمع بين الاستهداف الذكي وشراء الوسائط الاستراتيجي والتحسين المستمر، لنساعد العلامات على الوصول إلى الجمهور الصحيح، والاستفادة القصوى من كل ميزانية، وتحويل الإعلان إلى نتائج عمل قابلة للقياس.",
    features: [
      {
        title: "استهداف دقيق للجمهور",
        desc: "اوصل إلى الأشخاص المناسبين باستهداف واستراتيجيات حملات مبنية على البيانات.",
      },
      {
        title: "حملات تركّز على الأداء",
        desc: "كل حملة تُدار بمؤشرات أداء واضحة ونتائج قابلة للقياس وأهداف عمل محددة.",
      },
      {
        title: "تحسين ذكي للميزانية",
        desc: "نحلل أداء الحملات باستمرار وننقل الميزانية نحو ما يحقق أفضل النتائج.",
      },
      {
        title: "تقارير شفافة",
        desc: "تقارير أداء واضحة تمنحك صورة كاملة عن حملاتك وإنفاقك ونتائجك.",
      },
    ],
  },

  services: {
    titleLead: "",
    titleStrong: "خدماتنا",
    titleTail: "",
    seeMore: "شاهد مشاريعنا",
    learnMore: "اعرف المزيد",
    adsAlt: "رجل يقفز حاملًا غيتارًا فوق هاتف تمتد من شاشته أيدٍ كثيرة وتحيط به قلوب وإيموجي عائمة",
    webAlt: "تصاميم مواقع معروضة على حاسوب محمول وشاشتَي متصفح عائمتين",
    marketingAlt:
      "حاسوب محمول يعرض لوحة أداء الحملات، تحيط به أيقونات الشبكات الاجتماعية وبطاقات التحليلات",
    items: [
      {
        title: "وكالة إعلانات",
        desc: "استراتيجية الحملات وشراء الوسائط عبر ميتا وجوجل، مبنية على جمهورك وأهداف عملك.",
      },
      {
        title: "تطوير المواقع",
        desc: "مواقع وصفحات هبوط مصممة لدعم علامتك وتحويل الزيارات الرقمية إلى فرص.",
      },
      {
        title: "تسويق رقمي",
        desc: "استراتيجيات رقمية تربط علامتك بالجمهور الصحيح عبر القنوات المناسبة.",
      },
    ],
  },

  banner: {
    titleLead: "إعلانات لا تتوقف،",
    titleStrong: "وتتحسن باستمرار",
    body:
      "نراقب أداء الحملات، ونحسّن كل فرصة، ونطوّر استراتيجية وسائطك باستمرار.",
    imageAlt:
      "لوحة مدير إعلانات ميتا على شاشة، بجانبها لوحتا حالة الحملات وتوزيع الجمهور",
  },

  process: {
    titleLead: "كيف نحوّل",
    titleStrong: "الاستراتيجية",
    titleTail: "إلى نتائج",
    eyebrow: "كيف نعمل",
    body:
      "عملية من أربع خطوات واضحة، مصممة لجعل إعلاناتك أكثر استهدافًا وقابلية للقياس وتحسينًا مستمرًا.",
    cta: "اطلب عرض سعر",
    steps: [
      {
        title: "الاكتشاف",
        desc: "نتعرّف على عملك وجمهورك وأهدافك وأداء حملاتك الحالية قبل بناء المنهج المناسب.",
      },
      {
        title: "الاستراتيجية",
        desc: "نحدد الجمهور وهيكل الحملات والقنوات وتوزيع الميزانية ومؤشرات الأداء وفق أهداف عملك.",
      },
      {
        title: "الإطلاق",
        desc: "نجهّز الحملات والمحتوى الإبداعي والتتبع والاستهداف، ثم ننطلق عبر المنصات الإعلانية المناسبة.",
      },
      {
        title: "التحسين",
        desc: "نراقب الأداء ونختبر مناهج جديدة ونحسّن الميزانية والجمهور والمحتوى الإبداعي باستمرار.",
      },
    ],
  },

  clients: {
    titleLead: "",
    titleStrong: "عملاؤنا",
  },

  cta: {
    titleLead: "لنبدأ",
    titleStrong: "مشروعك",
    titleTail: "معنا",
    body: "حدّثنا عن أهدافك، ولنبنِ معًا الاستراتيجية المناسبة لعلامتك.",
  },

  portfolio: {
    titleLead: "مشاريع",
    titleStrong: "مختارة",
    intro: "مشاريع في الإعلانات وتطوير المواقع والتسويق الرقمي.",
    filterLabel: "تصفية حسب الخدمة",
    filterAll: "الكل",
    services: {
      ads: "الإعلانات",
      web: "تطوير المواقع",
      marketing: "التسويق الرقمي",
    },
    empty: "نجهّز دراسات الحالة حاليًا. عد إلينا قريبًا.",
    placeholder: "نموذج توضيحي",
    view: "عرض المشروع",
    back: "كل المشاريع",
    visit: "زيارة الموقع",
    metaService: "الخدمة",
    metaYear: "السنة",
    ctaTitle: "لديك مشروع في بالك؟",
    cta: "ابدأ مشروعًا",
  },

  form: {
    name: "الاسم",
    email: "البريد الإلكتروني",
    company: "الشركة",
    message: "ما الذي تشغّله الآن، وما الذي لا ينجح؟",
    submit: "إرسال الاستفسار",
    sending: "جارٍ الإرسال",
    successTitle: "وصلنا استفسارك.",
    successBody:
      "نقرأ كل استفسار ونرد خلال يومي عمل، على العنوان الذي أعطيتنا إياه.",
    errorRequired: "الاسم والبريد الإلكتروني والرسالة حقول مطلوبة.",
    errorEmail: "البريد الإلكتروني لا يبدو صحيحًا.",
    errorSend: "تعذّر الإرسال. راسلنا على البريد الإلكتروني مباشرة.",
  },

  footer: {
    servicesTitle: "الخدمات",
    companyTitle: "الشركة",
    rights: "©2026 لا فورا ديجيتال. جميع الحقوق محفوظة.",
    blurb:
      "لا فورا ديجيتال وكالة إعلانات رقمية تخطط وتشتري وتحسّن الوسائط للعلامات التي يهمها عائد كل ظهور إعلاني.",
    terms: "الشروط",
    privacy: "الخصوصية",
  },
};

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

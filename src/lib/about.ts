import type { Locale } from "./dictionaries";

/**
 * About page copy. Supplied by the client; sentence-ending full stops and the
 * commas needed to parse the lists were added, and "adn" was corrected to "and".
 * No wording was changed.
 */
export type AboutDoc = {
  eyebrow: string;
  title: string;
  intro: string[];
  advertising: { heading: string; paragraphs: string[]; quote: string };
  expertise: { heading: string; items: { title: string; desc: string }[] };
  closing: { heading: string; paragraphs: string[]; kicker: string; cta: string };
};

const en: AboutDoc = {
  eyebrow: "About La Vora Digital",
  title: "We help brands move forward in the digital world",
  intro: [
    "La Vora Digital is a digital agency focused on helping brands connect with the right audiences through strategic advertising, digital experiences and data driven marketing.",
    "We work with companies and brands that want more from their digital presence, not simply more visibility but a clearer strategy behind every campaign, every platform and every marketing investment.",
    "At the heart of what we do is Advertising. We help businesses plan, launch, manage and optimise paid advertising campaigns across platforms including Meta and Google. From audience targeting and media planning to creative testing, budget allocation, campaign optimisation and performance reporting, we manage the process with a clear focus on your business objectives.",
    "But effective advertising does not exist on its own.",
    "A campaign needs the right destination. A brand needs a strong digital presence. And every touchpoint needs to work together. That is why La Vora Digital also provides Web Development and Digital Marketing services, creating a more connected digital ecosystem around your brand.",
  ],
  advertising: {
    heading: "More Than Just Running Ads",
    paragraphs: [
      "Advertising is not simply about putting a message in front of an audience.",
      "It is about understanding who you want to reach, what you want them to do, where they spend their time and how your budget can be used effectively.",
      "Our approach combines strategy, creativity, technology and data to build campaigns that are continuously refined. We monitor performance, analyse what is working, identify opportunities and make informed adjustments throughout the campaign.",
      "Whether you are launching a new product, building brand visibility, generating leads, driving traffic or supporting a larger marketing initiative, we develop our approach around your specific objectives.",
    ],
    quote: "Every brand is different. So every strategy should be different.",
  },
  expertise: {
    heading: "Our Core Expertise",
    items: [
      {
        title: "Advertising Agency",
        desc: "Our primary expertise is paid advertising and media buying. We manage campaigns across Meta, Google, TikTok and other relevant platforms, from initial planning and audience targeting to optimisation and reporting.",
      },
      {
        title: "Web Development",
        desc: "We create modern websites and landing pages that support your advertising campaigns and digital presence. Our websites are designed to be fast, responsive, visually aligned with your brand and built around the customer journey.",
      },
      {
        title: "Digital Marketing",
        desc: "We help brands build a stronger digital presence through strategic content, search, social media and other digital channels. Our goal is to create a connected strategy where different digital activities support one another.",
      },
    ],
  },
  closing: {
    heading: "Where Strategy Meets Execution",
    paragraphs: [
      "At La Vora Digital we believe strong digital marketing happens when strategy, media, creative, technology and data work together.",
      "Our role is to bring these elements together and turn them into clear, actionable digital initiatives.",
      "Whether you need an advertising partner to manage your Meta campaigns, a website to support your next campaign or a broader digital marketing strategy, we are ready to build the right approach with you.",
    ],
    kicker: "Let us build what is next",
    cta: "Contact us",
  },
};

const ar: AboutDoc = {
  eyebrow: "عن لا فورا ديجيتال",
  title: "نساعد العلامات على المضي قدمًا في العالم الرقمي",
  intro: [
    "لا فورا ديجيتال وكالة رقمية تركّز على مساعدة العلامات في الوصول إلى الجمهور الصحيح، عبر الإعلانات الاستراتيجية والتجارب الرقمية والتسويق المبني على البيانات.",
    "نعمل مع الشركات والعلامات التي تريد من حضورها الرقمي أكثر من مجرد ظهور أوسع، بل استراتيجية أوضح خلف كل حملة وكل منصة وكل استثمار تسويقي.",
    "جوهر عملنا هو الإعلان. نساعد الشركات على تخطيط الحملات الإعلانية المدفوعة وإطلاقها وإدارتها وتحسينها عبر منصات من بينها ميتا وجوجل. من استهداف الجمهور وتخطيط الوسائط، إلى اختبار المحتوى الإبداعي وتوزيع الميزانية وتحسين الحملات وتقارير الأداء، ندير العملية بتركيز واضح على أهداف عملك.",
    "لكن الإعلان الفعّال لا يقوم وحده.",
    "الحملة تحتاج إلى وجهة مناسبة. والعلامة تحتاج إلى حضور رقمي قوي. وكل نقطة تواصل يجب أن تعمل مع غيرها. لذلك تقدم لا فورا ديجيتال أيضًا خدمات تطوير المواقع والتسويق الرقمي، لبناء منظومة رقمية أكثر ترابطًا حول علامتك.",
  ],
  advertising: {
    heading: "أكثر من مجرد تشغيل إعلانات",
    paragraphs: [
      "الإعلان ليس مجرد وضع رسالة أمام جمهور.",
      "بل هو فهم من تريد الوصول إليه، وما الذي تريده أن يفعله، وأين يقضي وقته، وكيف يمكن استخدام ميزانيتك بفعالية.",
      "منهجنا يجمع بين الاستراتيجية والإبداع والتقنية والبيانات لبناء حملات تُصقل باستمرار. نراقب الأداء، ونحلل ما ينجح، ونرصد الفرص، ونجري تعديلات مدروسة طوال مدة الحملة.",
      "سواء كنت تطلق منتجًا جديدًا، أو تبني حضور علامتك، أو تستقطب عملاء محتملين، أو تزيد الزيارات، أو تدعم مبادرة تسويقية أكبر، نطوّر منهجنا حول أهدافك تحديدًا.",
    ],
    quote: "كل علامة مختلفة. لذا يجب أن تكون كل استراتيجية مختلفة.",
  },
  expertise: {
    heading: "خبراتنا الأساسية",
    items: [
      {
        title: "وكالة إعلانات",
        desc: "خبرتنا الأساسية هي الإعلانات المدفوعة وشراء الوسائط. ندير الحملات عبر ميتا وجوجل وتيك توك وغيرها من المنصات المناسبة، من التخطيط الأولي واستهداف الجمهور إلى التحسين وإعداد التقارير.",
      },
      {
        title: "تطوير المواقع",
        desc: "نصنع مواقع وصفحات هبوط حديثة تدعم حملاتك الإعلانية وحضورك الرقمي. مواقعنا مصممة لتكون سريعة ومتجاوبة ومنسجمة بصريًا مع علامتك، ومبنية حول رحلة العميل.",
      },
      {
        title: "تسويق رقمي",
        desc: "نساعد العلامات على بناء حضور رقمي أقوى عبر المحتوى الاستراتيجي والبحث ووسائل التواصل والقنوات الرقمية الأخرى. هدفنا بناء استراتيجية مترابطة يدعم فيها كل نشاط رقمي غيره.",
      },
    ],
  },
  closing: {
    heading: "حيث تلتقي الاستراتيجية بالتنفيذ",
    paragraphs: [
      "في لا فورا ديجيتال نؤمن أن التسويق الرقمي القوي يحدث حين تعمل الاستراتيجية والوسائط والإبداع والتقنية والبيانات معًا.",
      "دورنا هو جمع هذه العناصر وتحويلها إلى مبادرات رقمية واضحة وقابلة للتنفيذ.",
      "سواء كنت تحتاج شريكًا إعلانيًا يدير حملاتك على ميتا، أو موقعًا يدعم حملتك القادمة، أو استراتيجية تسويق رقمي أشمل، نحن جاهزون لبناء المنهج المناسب معك.",
    ],
    kicker: "لنبنِ ما هو قادم",
    cta: "تواصل معنا",
  },
};

export const about: Record<Locale, AboutDoc> = { en, ar };

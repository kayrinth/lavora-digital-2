import type { Locale } from "./dictionaries";

export type ServiceKey = "ads" | "web" | "marketing";

/** English is required; a missing Arabic string falls back to it rather than showing a gap. */
type Localized<T> = { en: T; ar?: T };

export type Project = {
  /** URL segment: /en/portfolio/<slug>. */
  slug: string;
  service: ServiceKey;
  /** A company name, so it is never translated. */
  title: string;
  subtitle: Localized<string>;
  /**
   * The client's logo from /public/client, shown on a white tile because the
   * marks are drawn for light backgrounds. Omitted where no logo file exists.
   */
  logo?: string;
  /** Work images, shown on the detail page. The first doubles as the card thumbnail. */
  gallery?: string[];
  /** Card thumbnail, where a purpose-made crop beats the first gallery image. */
  thumb?: string;
  /** CSS aspect-ratio for the gallery tiles, where the files are not the usual 4:5. */
  ratio?: string;
  summary: Localized<string>;
  body: Localized<string[]>;
  /** Rows under the title on the detail page: brands, products, platform. */
  meta: Localized<{ label: string; value: string }[]>;
};

/**
 * Intro and closing copy per category. `?service=` on /portfolio selects which
 * one is shown, so the header dropdown lands on the matching write-up. The
 * unfiltered view falls back to the short heading in the dictionary.
 */
export type PortfolioIntro = {
  eyebrow: string;
  title: string;
  intro: string[];
  closing: {
    heading: string;
    lead: string;
    paragraphs: string[];
    /** Capability tiles, where a category lists what it actually produces. */
    items?: { title: string; desc: string }[];
    kicker: string;
    kickerBody?: string;
  };
};

export const portfolioIntros: Record<
  Locale,
  Partial<Record<ServiceKey, PortfolioIntro>>
> = {
  en: {
    ads: {
      eyebrow: "Project Advertising Agency",
      title: "Meta Advertising for Brands, Products, and Businesses",
      intro: [
        "La Vora Digital manages and executes Meta Advertising campaigns for companies and brands across different industries. Our work covers campaign planning, audience targeting, media buying, budget management, campaign optimisation, and performance monitoring.",
        "From large consumer brands to local businesses and digital products, we develop advertising campaigns based on each client's product, audience, and business objectives.",
      ],
      closing: {
        heading: "Our Advertising Expertise",
        lead: "One Platform. Different Business Objectives.",
        paragraphs: [
          "From FMCG and fashion to property, food, education, technology, and beauty, La Vora Digital manages Meta Advertising campaigns across a wide range of business categories.",
          "Our approach adapts to each project, taking into account the product, audience, campaign objective, budget, and market.",
        ],
        kicker: "Strategy. Media Buying. Optimisation.",
        kickerBody:
          "La Vora Digital turns advertising budgets into structured Meta campaigns built around the needs of each brand and business.",
      },
    },
    web: {
      eyebrow: "Project Web Development",
      title: "Digital Experiences Built for Different Businesses",
      intro: [
        "From corporate websites and e commerce platforms to specialised web systems, our projects are built around the unique needs of each business.",
        "We work across different industries and translate each brand's objectives into digital experiences that are functional, engaging, and aligned with the way the business operates.",
      ],
      closing: {
        heading: "From Ideas to Digital Experiences",
        lead: "Every business has different requirements.",
        paragraphs: [
          "Some need a strong corporate presence. Others need an online store or a specialised digital system.",
          "Our web development work covers Company Profile Websites, E Commerce, and Web Systems, allowing us to build solutions around the specific needs of each project.",
        ],
        kicker: "Different businesses. Different challenges. One approach: build with purpose.",
      },
    },
    marketing: {
      eyebrow: "Project Digital Marketing",
      title: "Visual Content Built for Brands",
      intro: [
        "La Vora Digital creates professional photography and video content tailored to the needs of brands and their marketing activities.",
        "From product photography and campaign visuals to promotional videos and video series, we develop visual content that helps brands communicate their products, services, and stories across digital platforms.",
        "Our work is built around each brand's identity and communication objectives, ensuring every visual asset is created with a clear purpose and ready to support marketing campaigns, social media, advertising, and promotional activities.",
      ],
      closing: {
        heading: "Our Digital Marketing Expertise",
        lead: "Content That Gives Brands Something to Say",
        paragraphs: [
          "Every brand needs visual content that fits its identity and communicates its products effectively.",
          "From product photography and campaign visuals to promotional videos and video series, we create content designed around where and how it will be used.",
        ],
        items: [
          {
            title: "Photography",
            desc: "Product, campaign, lifestyle, and brand photography.",
          },
          {
            title: "Video Production",
            desc: "Promotional videos, product videos, social media content, and branded video content.",
          },
          {
            title: "Video Series",
            desc: "Multiple video assets developed around a consistent concept and visual direction.",
          },
          {
            title: "Campaign Content",
            desc: "Visual assets created specifically to support advertising, promotions, launches, and digital campaigns.",
          },
        ],
        kicker: "From concept to final content",
        kickerBody:
          "We create visual assets that help brands look better, communicate clearly, and stay relevant across digital channels.",
      },
    },
  },
  ar: {
    ads: {
      eyebrow: "مشاريع وكالة الإعلانات",
      title: "إعلانات ميتا للعلامات والمنتجات والأعمال",
      intro: [
        "تدير لا فورا ديجيتال حملات إعلانات ميتا وتنفّذها لشركات وعلامات في قطاعات مختلفة. يشمل عملنا تخطيط الحملات واستهداف الجمهور وشراء الوسائط وإدارة الميزانية وتحسين الحملات ومراقبة الأداء.",
        "من العلامات الاستهلاكية الكبيرة إلى الأعمال المحلية والمنتجات الرقمية، نطوّر حملات إعلانية مبنية على منتج كل عميل وجمهوره وأهداف عمله.",
      ],
      closing: {
        heading: "خبرتنا الإعلانية",
        lead: "منصة واحدة. أهداف أعمال مختلفة.",
        paragraphs: [
          "من السلع الاستهلاكية والأزياء إلى العقارات والأغذية والتعليم والتقنية والجمال، تدير لا فورا ديجيتال حملات إعلانات ميتا عبر مجموعة واسعة من فئات الأعمال.",
          "يتكيّف منهجنا مع كل مشروع، آخذين في الحسبان المنتج والجمهور وهدف الحملة والميزانية والسوق.",
        ],
        kicker: "استراتيجية. شراء وسائط. تحسين.",
        kickerBody:
          "تحوّل لا فورا ديجيتال ميزانيات الإعلان إلى حملات ميتا منظمة، مبنية حول احتياجات كل علامة وكل عمل.",
      },
    },
    web: {
      eyebrow: "مشاريع تطوير المواقع",
      title: "تجارب رقمية مبنية لأعمال مختلفة",
      intro: [
        "من مواقع الشركات ومنصات التجارة الإلكترونية إلى أنظمة الويب المتخصصة، تُبنى مشاريعنا حول الاحتياجات الفريدة لكل عمل.",
        "نعمل في قطاعات مختلفة ونترجم أهداف كل علامة إلى تجارب رقمية عملية وجذابة ومنسجمة مع طريقة إدارة العمل.",
      ],
      closing: {
        heading: "من الأفكار إلى التجارب الرقمية",
        lead: "لكل عمل متطلبات مختلفة.",
        paragraphs: [
          "بعضها يحتاج حضورًا مؤسسيًا قويًا. وبعضها يحتاج متجرًا إلكترونيًا أو نظامًا رقميًا متخصصًا.",
          "يغطي عملنا في تطوير المواقع مواقع بروفايل الشركات والتجارة الإلكترونية وأنظمة الويب، ما يتيح لنا بناء حلول حول احتياجات كل مشروع تحديدًا.",
        ],
        kicker: "أعمال مختلفة. تحديات مختلفة. منهج واحد: ابنِ بهدف.",
      },
    },
    marketing: {
      eyebrow: "مشاريع التسويق الرقمي",
      title: "محتوى بصري مصنوع للعلامات",
      intro: [
        "تصنع لا فورا ديجيتال محتوى تصوير فوتوغرافي وفيديو احترافيًا، مفصّلًا على احتياجات العلامات وأنشطتها التسويقية.",
        "من تصوير المنتجات ومرئيات الحملات إلى الفيديوهات الترويجية وسلاسل الفيديو، نطوّر محتوى بصريًا يساعد العلامات على التعبير عن منتجاتها وخدماتها وقصصها عبر المنصات الرقمية.",
        "يُبنى عملنا حول هوية كل علامة وأهدافها في التواصل، بما يضمن أن كل أصل بصري يُصنع بهدف واضح وجاهز لدعم الحملات التسويقية ووسائل التواصل والإعلانات والأنشطة الترويجية.",
      ],
      closing: {
        heading: "خبرتنا في التسويق الرقمي",
        lead: "محتوى يمنح العلامات ما تقوله",
        paragraphs: [
          "كل علامة تحتاج محتوى بصريًا يناسب هويتها ويعبّر عن منتجاتها بفعالية.",
          "من تصوير المنتجات ومرئيات الحملات إلى الفيديوهات الترويجية وسلاسل الفيديو، نصنع محتوى مصممًا حول أين وكيف سيُستخدم.",
        ],
        items: [
          {
            title: "التصوير الفوتوغرافي",
            desc: "تصوير المنتجات والحملات ونمط الحياة والعلامة.",
          },
          {
            title: "إنتاج الفيديو",
            desc: "فيديوهات ترويجية وفيديوهات منتجات ومحتوى لوسائل التواصل ومحتوى فيديو للعلامة.",
          },
          {
            title: "سلاسل الفيديو",
            desc: "أصول فيديو متعددة مطوّرة حول فكرة وتوجه بصري متسقين.",
          },
          {
            title: "محتوى الحملات",
            desc: "أصول بصرية تُصنع خصيصًا لدعم الإعلانات والعروض والإطلاقات والحملات الرقمية.",
          },
        ],
        kicker: "من الفكرة إلى المحتوى النهائي",
        kickerBody:
          "نصنع أصولًا بصرية تساعد العلامات على أن تبدو أفضل، وتتواصل بوضوح، وتبقى حاضرة عبر القنوات الرقمية.",
      },
    },
  },
};

const PLATFORM = { en: "Platform", ar: "المنصة" };
const META_ADS = { en: "Meta Ads", ar: "إعلانات ميتا" };

export const PROJECTS: Project[] = [
  {
    slug: "unilever-indonesia",
    gallery: [
      "/iklan/unilever.jpg",
      "/iklan/unilever2.jpg",
    ],
    service: "ads",
    title: "Unilever Indonesia",
    subtitle: {
      en: "Multi Brand Meta Advertising",
      ar: "إعلانات ميتا لعدة علامات",
    },
    logo: "/client/01. Unilever.png",
    summary: {
      en: "Meta Advertising campaigns for multiple Unilever Indonesia brands, including Vaseline, Dove, Pepsodent, and Rinso.",
      ar: "حملات إعلانات ميتا لعدة علامات من يونيليفر إندونيسيا، منها فازلين ودوف وبيبسودنت ورينسو.",
    },
    body: {
      en: [
        "La Vora Digital manages Meta Advertising campaigns for multiple Unilever Indonesia brands, including Vaseline, Dove, Pepsodent, and Rinso.",
        "Each brand is supported through targeted Meta campaigns designed around its specific product category, audience, and communication objectives.",
      ],
      ar: [
        "تدير لا فورا ديجيتال حملات إعلانات ميتا لعدة علامات من يونيليفر إندونيسيا، منها فازلين ودوف وبيبسودنت ورينسو.",
        "تُدعم كل علامة بحملات ميتا موجّهة، مصممة حول فئة منتجها وجمهورها وأهدافها في التواصل.",
      ],
    },
    meta: {
      en: [
        { label: "Brands", value: "Vaseline, Dove, Pepsodent, Rinso" },
        { label: PLATFORM.en, value: META_ADS.en },
      ],
      ar: [
        { label: "العلامات", value: "فازلين، دوف، بيبسودنت، رينسو" },
        { label: PLATFORM.ar, value: META_ADS.ar },
      ],
    },
  },
  {
    slug: "adidas",
    gallery: [
      "/iklan/adidas.jpg",
      "/iklan/adidas2.jpg",
    ],
    service: "ads",
    title: "Adidas",
    subtitle: {
      en: "Shoes & Fashion Meta Advertising",
      ar: "إعلانات ميتا للأحذية والأزياء",
    },
    logo: "/client/06. LOGO ADIDAS.png",
    summary: {
      en: "Meta Advertising campaigns across two product categories: Adidas Shoes and Adidas Fashion.",
      ar: "حملات إعلانات ميتا لفئتي منتجات: أحذية أديداس وأزياء أديداس.",
    },
    body: {
      en: [
        "La Vora Digital runs Meta Advertising campaigns for Adidas, covering two key product categories: Adidas Shoes and Adidas Fashion.",
        "The campaigns are structured around the characteristics of each product category, with targeted audiences and campaign strategies designed to promote Adidas products across Meta platforms.",
      ],
      ar: [
        "تشغّل لا فورا ديجيتال حملات إعلانات ميتا لأديداس، تغطي فئتي منتجات رئيسيتين: أحذية أديداس وأزياء أديداس.",
        "بُنيت الحملات حول خصائص كل فئة منتجات، بجماهير مستهدفة واستراتيجيات حملات مصممة للترويج لمنتجات أديداس عبر منصات ميتا.",
      ],
    },
    meta: {
      en: [
        { label: "Products", value: "Adidas Shoes & Adidas Fashion" },
        { label: PLATFORM.en, value: META_ADS.en },
      ],
      ar: [
        { label: "المنتجات", value: "أحذية أديداس وأزياء أديداس" },
        { label: PLATFORM.ar, value: META_ADS.ar },
      ],
    },
  },
  {
    slug: "kalbe-promag",
    gallery: [
      "/iklan/kalbe.jpg",
      "/iklan/kalbe2.jpg",
    ],
    service: "ads",
    title: "Kalbe",
    subtitle: { en: "Promag Meta Advertising", ar: "إعلانات ميتا لبروماغ" },
    logo: "/client/07. LOGO KALBE.webp",
    summary: {
      en: "Meta Advertising campaigns for Promag, a consumer healthcare brand from Kalbe.",
      ar: "حملات إعلانات ميتا لبروماغ، علامة رعاية صحية استهلاكية من كالبي.",
    },
    body: {
      en: [
        "La Vora Digital manages Meta Advertising campaigns for Promag, a consumer healthcare brand from Kalbe.",
        "The campaigns focus on promoting Promag products through targeted Meta advertising, reaching relevant consumer audiences through strategic campaign execution and optimisation.",
      ],
      ar: [
        "تدير لا فورا ديجيتال حملات إعلانات ميتا لبروماغ، وهي علامة رعاية صحية استهلاكية من كالبي.",
        "تركّز الحملات على الترويج لمنتجات بروماغ عبر إعلانات ميتا الموجّهة، للوصول إلى الجماهير الاستهلاكية المناسبة بتنفيذ وتحسين استراتيجيين للحملات.",
      ],
    },
    meta: {
      en: [
        { label: "Brand", value: "Promag" },
        { label: PLATFORM.en, value: META_ADS.en },
      ],
      ar: [
        { label: "العلامة", value: "بروماغ" },
        { label: PLATFORM.ar, value: META_ADS.ar },
      ],
    },
  },
  {
    slug: "waroeng-steak",
    gallery: [
      "/iklan/waroeng-steak.jpg",
      "/iklan/waroeng-steak2.jpg",
    ],
    service: "ads",
    title: "Waroeng Steak",
    subtitle: {
      en: "Restaurant & Food Advertising",
      ar: "إعلانات مطاعم وأغذية",
    },
    logo: "/client/09. LOGO WAROENG STEAK.jpg",
    summary: {
      en: "Meta Advertising campaigns promoting food and restaurant offerings to relevant audiences.",
      ar: "حملات إعلانات ميتا للترويج لعروض الطعام والمطعم أمام الجماهير المناسبة.",
    },
    body: {
      en: [
        "La Vora Digital runs Meta Advertising campaigns for Waroeng Steak, promoting its food and restaurant offerings to relevant audiences.",
        "The campaigns are designed to increase product visibility and reach potential customers through targeted advertising across Meta platforms.",
      ],
      ar: [
        "تشغّل لا فورا ديجيتال حملات إعلانات ميتا لوارونغ ستيك، للترويج لعروض طعامها ومطعمها أمام الجماهير المناسبة.",
        "صُممت الحملات لزيادة ظهور المنتجات والوصول إلى العملاء المحتملين عبر إعلانات موجّهة على منصات ميتا.",
      ],
    },
    meta: {
      en: [
        { label: "Industry", value: "Food & Restaurant" },
        { label: PLATFORM.en, value: META_ADS.en },
      ],
      ar: [
        { label: "القطاع", value: "الأغذية والمطاعم" },
        { label: PLATFORM.ar, value: META_ADS.ar },
      ],
    },
  },
  {
    slug: "springhill",
    gallery: [
      "/iklan/springhill.jpg",
      "/iklan/springhill2.jpg",
    ],
    service: "ads",
    title: "Springhill",
    subtitle: {
      en: "Residential Property Advertising",
      ar: "إعلانات عقارات سكنية",
    },
    logo: "/client/10. LOGO SPRINGHILL.jpeg",
    summary: {
      en: "Meta Advertising campaigns promoting residential developments to relevant potential buyers.",
      ar: "حملات إعلانات ميتا للترويج للمشاريع السكنية أمام المشترين المحتملين المناسبين.",
    },
    body: {
      en: [
        "La Vora Digital manages Meta Advertising campaigns for Springhill residential properties, focusing on promoting housing developments to relevant potential buyers.",
        "The campaigns are designed to reach prospective homebuyers through targeted audience strategies and advertising content focused on the residential property offering.",
      ],
      ar: [
        "تدير لا فورا ديجيتال حملات إعلانات ميتا لعقارات سبرينغهيل السكنية، بالتركيز على الترويج للمشاريع السكنية أمام المشترين المحتملين المناسبين.",
        "صُممت الحملات للوصول إلى المشترين المرتقبين عبر استراتيجيات استهداف ومحتوى إعلاني يركّز على العرض العقاري السكني.",
      ],
    },
    meta: {
      en: [
        { label: "Industry", value: "Property & Residential" },
        { label: "Product", value: "Springhill Housing" },
        { label: PLATFORM.en, value: META_ADS.en },
      ],
      ar: [
        { label: "القطاع", value: "العقارات والإسكان" },
        { label: "المنتج", value: "مساكن سبرينغهيل" },
        { label: PLATFORM.ar, value: META_ADS.ar },
      ],
    },
  },
  {
    slug: "nata-solusi",
    gallery: [
      "/iklan/nata.png",
      "/iklan/nata2.png",
    ],
    service: "ads",
    title: "Nata Solusi",
    subtitle: {
      en: "Regional Tax Application & Smart Classroom Solution",
      ar: "تطبيق الضرائب الإقليمية وحل الفصل الذكي",
    },
    logo: "/client/11. LOGO NATA SOLUSI.jpg",
    summary: {
      en: "Meta Advertising campaigns promoting digital solutions for organisations and institutions.",
      ar: "حملات إعلانات ميتا للترويج لحلول رقمية للمؤسسات والجهات.",
    },
    body: {
      en: [
        "La Vora Digital runs Meta Advertising campaigns for Nata Solusi, promoting its digital solutions including a regional tax application and Smart Classroom Solution.",
        "The campaigns are designed to introduce these digital solutions to relevant audiences and support awareness and interest in technology based solutions for organisations and institutions.",
      ],
      ar: [
        "تشغّل لا فورا ديجيتال حملات إعلانات ميتا لناتا سولوسي، للترويج لحلولها الرقمية ومنها تطبيق الضرائب الإقليمية وحل الفصل الذكي.",
        "صُممت الحملات للتعريف بهذه الحلول الرقمية أمام الجماهير المناسبة ودعم الوعي والاهتمام بالحلول التقنية للمؤسسات والجهات.",
      ],
    },
    meta: {
      en: [
        {
          label: "Products",
          value: "Regional Tax Application & Smart Classroom Solution",
        },
        { label: PLATFORM.en, value: META_ADS.en },
      ],
      ar: [
        {
          label: "المنتجات",
          value: "تطبيق الضرائب الإقليمية وحل الفصل الذكي",
        },
        { label: PLATFORM.ar, value: META_ADS.ar },
      ],
    },
  },
  {
    slug: "chineserd",
    gallery: [
      "/iklan/chineserd.jpg",
      "/iklan/chineserd2.jpg",
    ],
    service: "ads",
    title: "ChineseRd",
    subtitle: {
      en: "Online Mandarin Learning Application",
      ar: "تطبيق تعلّم الماندرين عبر الإنترنت",
    },
    logo: "/client/12. LOGO CHINESERD.png",
    summary: {
      en: "Meta Advertising campaigns targeting audiences interested in learning Mandarin and digital education.",
      ar: "حملات إعلانات ميتا تستهدف المهتمين بتعلّم الماندرين والتعليم الرقمي.",
    },
    body: {
      en: [
        "La Vora Digital manages Meta Advertising campaigns for ChineseRd, promoting its online Mandarin learning application.",
        "The campaigns target audiences interested in learning Mandarin and digital education, using Meta advertising to introduce the application and drive interest among potential users.",
      ],
      ar: [
        "تدير لا فورا ديجيتال حملات إعلانات ميتا لتشاينيز آر دي، للترويج لتطبيقها لتعلّم الماندرين عبر الإنترنت.",
        "تستهدف الحملات الجماهير المهتمة بتعلّم الماندرين والتعليم الرقمي، مستخدمة إعلانات ميتا للتعريف بالتطبيق وإثارة اهتمام المستخدمين المحتملين.",
      ],
    },
    meta: {
      en: [
        { label: "Product", value: "Online Mandarin Learning Application" },
        { label: "Industry", value: "Education & EdTech" },
        { label: PLATFORM.en, value: META_ADS.en },
      ],
      ar: [
        { label: "المنتج", value: "تطبيق تعلّم الماندرين عبر الإنترنت" },
        { label: "القطاع", value: "التعليم والتقنية التعليمية" },
        { label: PLATFORM.ar, value: META_ADS.ar },
      ],
    },
  },
  {
    slug: "barburger",
    gallery: [
      "/iklan/barburger.jpg",
      "/iklan/barburger2.jpg",
    ],
    service: "ads",
    title: "Barburger",
    subtitle: { en: "Burger Product Advertising", ar: "إعلانات منتجات برغر" },
    logo: "/client/13. LOGO BARBURGER.png",
    summary: {
      en: "Meta Advertising campaigns promoting a range of burger products to food and lifestyle audiences.",
      ar: "حملات إعلانات ميتا للترويج لتشكيلة منتجات البرغر أمام جماهير الطعام ونمط الحياة.",
    },
    body: {
      en: [
        "La Vora Digital runs Meta Advertising campaigns for Barburger, promoting its range of burger products to relevant food and lifestyle audiences.",
        "The campaigns focus on showcasing the products through engaging advertising content and reaching potential customers across Meta platforms.",
      ],
      ar: [
        "تشغّل لا فورا ديجيتال حملات إعلانات ميتا لباربرغر، للترويج لتشكيلة منتجات البرغر أمام جماهير الطعام ونمط الحياة المناسبة.",
        "تركّز الحملات على إبراز المنتجات عبر محتوى إعلاني جذاب والوصول إلى العملاء المحتملين على منصات ميتا.",
      ],
    },
    meta: {
      en: [
        { label: "Product", value: "Burger" },
        { label: "Industry", value: "Food & Restaurant" },
        { label: PLATFORM.en, value: META_ADS.en },
      ],
      ar: [
        { label: "المنتج", value: "برغر" },
        { label: "القطاع", value: "الأغذية والمطاعم" },
        { label: PLATFORM.ar, value: META_ADS.ar },
      ],
    },
  },
  {
    slug: "senswell",
    gallery: [
      "/iklan/senswell.jpg",
      "/iklan/senswell2.jpg",
    ],
    service: "ads",
    title: "Senswell",
    subtitle: { en: "Perfume Product Advertising", ar: "إعلانات منتجات عطور" },
    logo: "/client/14. LOGO SENSWELL.webp",
    summary: {
      en: "Meta Advertising campaigns introducing perfume products to relevant audiences.",
      ar: "حملات إعلانات ميتا للتعريف بمنتجات العطور أمام الجماهير المناسبة.",
    },
    body: {
      en: [
        "La Vora Digital manages Meta Advertising campaigns for Senswell, promoting its perfume products to relevant audiences.",
        "The campaigns are designed to introduce Senswell products to potential customers through targeted audience strategies and product focused advertising across Meta platforms.",
      ],
      ar: [
        "تدير لا فورا ديجيتال حملات إعلانات ميتا لسنسويل، للترويج لمنتجات عطورها أمام الجماهير المناسبة.",
        "صُممت الحملات للتعريف بمنتجات سنسويل أمام العملاء المحتملين عبر استراتيجيات استهداف ومحتوى إعلاني يركّز على المنتج على منصات ميتا.",
      ],
    },
    meta: {
      en: [
        { label: "Product", value: "Perfume" },
        { label: "Industry", value: "Fragrance & Beauty" },
        { label: PLATFORM.en, value: META_ADS.en },
      ],
      ar: [
        { label: "المنتج", value: "عطور" },
        { label: "القطاع", value: "العطور والجمال" },
        { label: PLATFORM.ar, value: META_ADS.ar },
      ],
    },
  },
  {
    slug: "borch-and-co",
    thumb: "/thumbnail-website/broch.webp",
    gallery: [
      "/website/borch.png",
    ],
    service: "web",
    title: "Borch & Co",
    subtitle: { en: "E Commerce Website", ar: "متجر إلكتروني" },
    summary: {
      en: "A refined online shopping experience for a Sydney based jewellery brand specialising in bracelets.",
      ar: "تجربة تسوق إلكتروني أنيقة لعلامة مجوهرات من سيدني متخصصة في الأساور.",
    },
    body: {
      en: [
        "A refined online shopping experience created for Borch & Co, a Sydney based jewellery brand specialising in bracelets.",
        "The platform presents the brand's collection in a clean and engaging format while giving customers a straightforward way to explore products and shop online.",
      ],
      ar: [
        "تجربة تسوق إلكتروني أنيقة صُنعت لـ Borch & Co، علامة مجوهرات من سيدني متخصصة في الأساور.",
        "تعرض المنصة تشكيلة العلامة بصيغة نظيفة وجذابة، وتمنح العملاء طريقة مباشرة لتصفّح المنتجات والشراء عبر الإنترنت.",
      ],
    },
    meta: {
      en: [
        { label: "Brand", value: "Borch & Co" },
        { label: "Industry", value: "Jewellery & Fashion" },
        { label: "Project", value: "E Commerce Website" },
      ],
      ar: [
        { label: "العلامة", value: "Borch & Co" },
        { label: "القطاع", value: "المجوهرات والأزياء" },
        { label: "المشروع", value: "متجر إلكتروني" },
      ],
    },
  },
  {
    slug: "chineserd-platform",
    thumb: "/thumbnail-website/chineserd.webp",
    gallery: [
      "/website/chinesred.png",
    ],
    service: "web",
    title: "ChineseRd",
    subtitle: {
      en: "Online Mandarin Learning Platform",
      ar: "منصة تعلّم الماندرين عبر الإنترنت",
    },
    summary: {
      en: "A digital experience that communicates an online Mandarin learning offering to prospective students.",
      ar: "تجربة رقمية تعرّف الطلاب المرتقبين بعرض تعلّم الماندرين عبر الإنترنت.",
    },
    body: {
      en: [
        "For ChineseRd, the focus was on creating a digital experience that communicates its online Mandarin learning offering clearly to prospective students and users.",
        "The platform presents the learning programme and its offerings while making it easier for visitors to understand the service and explore the learning experience.",
      ],
      ar: [
        "مع ChineseRd، تركّز العمل على صنع تجربة رقمية تعرّف بوضوح بعرض تعلّم الماندرين عبر الإنترنت أمام الطلاب والمستخدمين المرتقبين.",
        "تعرض المنصة البرنامج التعليمي وما يقدمه، وتسهّل على الزوار فهم الخدمة واستكشاف تجربة التعلّم.",
      ],
    },
    meta: {
      en: [
        { label: "Brand", value: "ChineseRd" },
        { label: "Industry", value: "Education & EdTech" },
        { label: "Project", value: "Web Platform" },
      ],
      ar: [
        { label: "العلامة", value: "ChineseRd" },
        { label: "القطاع", value: "التعليم والتقنية التعليمية" },
        { label: "المشروع", value: "منصة ويب" },
      ],
    },
  },
  {
    slug: "sando",
    thumb: "/thumbnail-website/sando.webp",
    gallery: [
      "/website/sando.png",
    ],
    service: "web",
    title: "Sando",
    subtitle: {
      en: "Corporate Website for Oil & Gas",
      ar: "موقع مؤسسي لقطاع النفط والغاز",
    },
    summary: {
      en: "A professional digital presence bringing together an oil and gas company's profile, capabilities and services.",
      ar: "حضور رقمي احترافي يجمع بروفايل شركة نفط وغاز وقدراتها وخدماتها.",
    },
    body: {
      en: [
        "A professional digital presence for Sando, an oil and gas company.",
        "The website brings together the company's profile, capabilities, services, and business information into a structured corporate experience designed for clients, partners, and stakeholders.",
      ],
      ar: [
        "حضور رقمي احترافي لـ Sando، وهي شركة نفط وغاز.",
        "يجمع الموقع بروفايل الشركة وقدراتها وخدماتها ومعلومات أعمالها في تجربة مؤسسية منظمة، مصممة للعملاء والشركاء وأصحاب المصلحة.",
      ],
    },
    meta: {
      en: [
        { label: "Brand", value: "Sando" },
        { label: "Industry", value: "Oil & Gas" },
        { label: "Project", value: "Company Profile Website" },
      ],
      ar: [
        { label: "العلامة", value: "Sando" },
        { label: "القطاع", value: "النفط والغاز" },
        { label: "المشروع", value: "موقع بروفايل الشركة" },
      ],
    },
  },
  {
    slug: "indo-karya-tangguh",
    thumb: "/thumbnail-website/ikat.webp",
    gallery: [
      "/website/ikat.png",
    ],
    service: "web",
    title: "Indo Karya Tangguh",
    subtitle: { en: "Corporate Digital Presence", ar: "حضور رقمي مؤسسي" },
    summary: {
      en: "A platform communicating the company's position and capabilities within the oil and gas industry.",
      ar: "منصة تعبّر عن موقع الشركة وقدراتها في قطاع النفط والغاز.",
    },
    body: {
      en: [
        "Indo Karya Tangguh required a digital platform that could clearly communicate its position and capabilities within the oil and gas industry.",
        "The website presents key company information, services, and business capabilities through a professional and structured interface.",
      ],
      ar: [
        "احتاجت Indo Karya Tangguh منصة رقمية تعبّر بوضوح عن موقعها وقدراتها في قطاع النفط والغاز.",
        "يعرض الموقع معلومات الشركة الأساسية وخدماتها وقدراتها في الأعمال عبر واجهة احترافية ومنظمة.",
      ],
    },
    meta: {
      en: [
        { label: "Brand", value: "Indo Karya Tangguh" },
        { label: "Industry", value: "Oil & Gas" },
        { label: "Project", value: "Company Profile Website" },
      ],
      ar: [
        { label: "العلامة", value: "Indo Karya Tangguh" },
        { label: "القطاع", value: "النفط والغاز" },
        { label: "المشروع", value: "موقع بروفايل الشركة" },
      ],
    },
  },
  {
    slug: "harmony-dental-clinic",
    thumb: "/thumbnail-website/dental.webp",
    gallery: [
      "/website/harmony-dental.png",
    ],
    service: "web",
    title: "Harmony Dental Clinic",
    subtitle: {
      en: "Digital Experience for a Dental Clinic",
      ar: "تجربة رقمية لعيادة أسنان",
    },
    summary: {
      en: "A modern online presence helping visitors discover the clinic and understand its services.",
      ar: "حضور إلكتروني حديث يساعد الزوار على اكتشاف العيادة وفهم خدماتها.",
    },
    body: {
      en: [
        "A modern online presence designed for Harmony Dental Clinic, helping visitors discover the clinic, understand its services, and access important information more easily.",
        "The website combines a professional visual identity with an approachable user experience suited to the healthcare and dental industry.",
      ],
      ar: [
        "حضور إلكتروني حديث صُمم لـ Harmony Dental Clinic، يساعد الزوار على اكتشاف العيادة وفهم خدماتها والوصول إلى المعلومات المهمة بسهولة أكبر.",
        "يجمع الموقع بين هوية بصرية احترافية وتجربة استخدام ودودة تناسب قطاع الرعاية الصحية وطب الأسنان.",
      ],
    },
    meta: {
      en: [
        { label: "Brand", value: "Harmony Dental Clinic" },
        { label: "Industry", value: "Healthcare & Dental" },
        { label: "Project", value: "Company Profile Website" },
      ],
      ar: [
        { label: "العلامة", value: "Harmony Dental Clinic" },
        { label: "القطاع", value: "الرعاية الصحية وطب الأسنان" },
        { label: "المشروع", value: "موقع بروفايل الشركة" },
      ],
    },
  },
  {
    slug: "nata-solusi-pratama",
    thumb: "/thumbnail-website/natasolusi.webp",
    gallery: [
      "/website/nata-solusi.png",
    ],
    service: "web",
    title: "Nata Solusi Pratama",
    subtitle: {
      en: "Technology & Digital Solutions Platform",
      ar: "منصة حلول تقنية ورقمية",
    },
    summary: {
      en: "A platform presenting technology solutions including a Regional Tax Application and Smart Classroom Solution.",
      ar: "منصة تعرض حلولًا تقنية منها تطبيق الضرائب الإقليمية وحل الفصل الذكي.",
    },
    body: {
      en: [
        "For Nata Solusi Pratama, the website serves as a digital platform for presenting its technology solutions, including a Regional Tax Application and Smart Classroom Solution.",
        "The experience is structured to make complex digital solutions easier to understand while clearly communicating the company's capabilities and offerings to organisations and institutions.",
      ],
      ar: [
        "مع Nata Solusi Pratama، يعمل الموقع كمنصة رقمية لعرض حلولها التقنية، ومنها تطبيق الضرائب الإقليمية وحل الفصل الذكي.",
        "بُنيت التجربة لتسهيل فهم الحلول الرقمية المعقّدة، مع التعبير بوضوح عن قدرات الشركة وما تقدمه للمؤسسات والجهات.",
      ],
    },
    meta: {
      en: [
        { label: "Brand", value: "Nata Solusi Pratama" },
        { label: "Industry", value: "Technology & Digital Solutions" },
        { label: "Project", value: "Company Profile & Web System" },
      ],
      ar: [
        { label: "العلامة", value: "Nata Solusi Pratama" },
        { label: "القطاع", value: "التقنية والحلول الرقمية" },
        { label: "المشروع", value: "بروفايل شركة ونظام ويب" },
      ],
    },
  },
  {
    slug: "yamaha-motor",
    gallery: [
      "/marketing/yamaha.jpeg",
      "/marketing/yamaha2.jpeg",
    ],
    ratio: "16 / 11",
    service: "marketing",
    title: "Yamaha Motor",
    subtitle: { en: "Photography for Annual Calendar", ar: "تصوير للتقويم السنوي" },
    summary: {
      en: "A dedicated photography project producing visual assets for an annual calendar.",
      ar: "مشروع تصوير مخصص لإنتاج أصول بصرية لتقويم سنوي.",
    },
    body: {
      en: [
        "A dedicated photography project created for Yamaha Motor to produce visual assets for its annual calendar.",
        "The production focused on creating high quality imagery that represented the brand and its products while maintaining a consistent visual direction throughout the calendar.",
      ],
      ar: [
        "مشروع تصوير مخصص صُنع لـ Yamaha Motor لإنتاج أصول بصرية لتقويمها السنوي.",
        "ركّز الإنتاج على صنع صور عالية الجودة تمثّل العلامة ومنتجاتها، مع الحفاظ على توجه بصري متسق عبر التقويم كاملًا.",
      ],
    },
    meta: {
      en: [
        { label: "Brand", value: "Yamaha Motor" },
        { label: "Industry", value: "Automotive & Motorcycle" },
        { label: "Project", value: "Photography" },
        { label: "Purpose", value: "Annual Calendar" },
      ],
      ar: [
        { label: "العلامة", value: "Yamaha Motor" },
        { label: "القطاع", value: "السيارات والدراجات النارية" },
        { label: "المشروع", value: "تصوير فوتوغرافي" },
        { label: "الغرض", value: "تقويم سنوي" },
      ],
    },
  },
  {
    slug: "make-over",
    gallery: [
      "/marketing/makeover.jpg",
      "/marketing/makeover2.jpg",
    ],
    service: "marketing",
    title: "Make Over",
    subtitle: { en: "Photography & Video Production", ar: "تصوير فوتوغرافي وإنتاج فيديو" },
    summary: {
      en: "Photography and video supporting the brand's marketing and promotional needs.",
      ar: "تصوير وفيديو يدعمان احتياجات العلامة التسويقية والترويجية.",
    },
    body: {
      en: [
        "A visual content production for Make Over, covering both photography and video to support the brand's marketing and promotional needs.",
        "The content was created to showcase the brand and its products through polished visual assets suitable for digital communication and promotional activities.",
      ],
      ar: [
        "إنتاج محتوى بصري لـ Make Over، يشمل التصوير الفوتوغرافي والفيديو لدعم احتياجات العلامة التسويقية والترويجية.",
        "صُنع المحتوى لإبراز العلامة ومنتجاتها عبر أصول بصرية متقنة تناسب التواصل الرقمي والأنشطة الترويجية.",
      ],
    },
    meta: {
      en: [
        { label: "Brand", value: "Make Over" },
        { label: "Industry", value: "Beauty & Cosmetics" },
        { label: "Project", value: "Photography & Video" },
      ],
      ar: [
        { label: "العلامة", value: "Make Over" },
        { label: "القطاع", value: "الجمال ومستحضرات التجميل" },
        { label: "المشروع", value: "تصوير وفيديو" },
      ],
    },
  },
  {
    slug: "samsung",
    gallery: [
      "/marketing/samsung.webp",
      "/marketing/samsung2.avif",
    ],
    service: "marketing",
    title: "Samsung",
    subtitle: { en: "Smartphone Photography & Video", ar: "تصوير وفيديو للهواتف الذكية" },
    summary: {
      en: "Photography and video production highlighting a smartphone and its features.",
      ar: "تصوير وإنتاج فيديو يبرزان الهاتف الذكي ومزاياه.",
    },
    body: {
      en: [
        "Visual content created for Samsung smartphones, combining photography and video production to highlight the product and its features.",
        "The production focused on creating engaging visual assets that could be adapted for digital marketing and promotional communication.",
      ],
      ar: [
        "محتوى بصري صُنع لهواتف Samsung الذكية، يجمع التصوير الفوتوغرافي وإنتاج الفيديو لإبراز المنتج ومزاياه.",
        "ركّز الإنتاج على صنع أصول بصرية جذابة يمكن تكييفها للتسويق الرقمي والتواصل الترويجي.",
      ],
    },
    meta: {
      en: [
        { label: "Brand", value: "Samsung" },
        { label: "Industry", value: "Technology & Consumer Electronics" },
        { label: "Project", value: "Photography & Video" },
      ],
      ar: [
        { label: "العلامة", value: "Samsung" },
        { label: "القطاع", value: "التقنية والإلكترونيات الاستهلاكية" },
        { label: "المشروع", value: "تصوير وفيديو" },
      ],
    },
  },
  {
    slug: "aquaproof",
    gallery: [
      "/marketing/aquaproof.png",
      "/marketing/aquaproof2.png",
    ],
    service: "marketing",
    title: "Aquaproof",
    subtitle: { en: "Video Series", ar: "سلسلة فيديو" },
    summary: {
      en: "A series of promotional videos built around a consistent video format.",
      ar: "سلسلة فيديوهات ترويجية مبنية على صيغة فيديو متسقة.",
    },
    body: {
      en: [
        "A series of promotional videos created for Aquaproof, designed to communicate the product and brand through a consistent video format.",
        "The project focused on developing multiple video assets that could be used across digital channels and promotional campaigns.",
      ],
      ar: [
        "سلسلة فيديوهات ترويجية صُنعت لـ Aquaproof، مصممة للتعبير عن المنتج والعلامة عبر صيغة فيديو متسقة.",
        "ركّز المشروع على تطوير أصول فيديو متعددة يمكن استخدامها عبر القنوات الرقمية والحملات الترويجية.",
      ],
    },
    meta: {
      en: [
        { label: "Brand", value: "Aquaproof" },
        { label: "Industry", value: "Building Materials" },
        { label: "Project", value: "Video Series" },
      ],
      ar: [
        { label: "العلامة", value: "Aquaproof" },
        { label: "القطاع", value: "مواد البناء" },
        { label: "المشروع", value: "سلسلة فيديو" },
      ],
    },
  },
  {
    slug: "abc-battery",
    gallery: [
      "/marketing/abc.png",
      "/marketing/abc2.png",
    ],
    ratio: "5 / 4",
    service: "marketing",
    title: "ABC Battery",
    subtitle: { en: "Promotional Video", ar: "فيديو ترويجي" },
    summary: {
      en: "Promotional content communicating the product and its key attributes.",
      ar: "محتوى ترويجي يعبّر عن المنتج وخصائصه الأساسية.",
    },
    body: {
      en: [
        "A video production project for ABC Battery, creating promotional content designed to communicate the product and its key attributes through engaging visual storytelling.",
      ],
      ar: [
        "مشروع إنتاج فيديو لـ ABC Battery، بصنع محتوى ترويجي مصمم للتعبير عن المنتج وخصائصه الأساسية عبر سرد بصري جذاب.",
      ],
    },
    meta: {
      en: [
        { label: "Brand", value: "ABC Battery" },
        { label: "Industry", value: "Automotive & Battery" },
        { label: "Project", value: "Video Production" },
      ],
      ar: [
        { label: "العلامة", value: "ABC Battery" },
        { label: "القطاع", value: "السيارات والبطاريات" },
        { label: "المشروع", value: "إنتاج فيديو" },
      ],
    },
  },
  {
    slug: "lemonilo",
    gallery: [
      "/marketing/lemonilo.jpg",
      "/marketing/lemonilo2.jpg",
    ],
    ratio: "1 / 1",
    service: "marketing",
    title: "Lemonilo",
    subtitle: { en: "Digital Video Content", ar: "محتوى فيديو رقمي" },
    summary: {
      en: "Video content supporting digital marketing and promotional activities.",
      ar: "محتوى فيديو يدعم التسويق الرقمي والأنشطة الترويجية.",
    },
    body: {
      en: [
        "Video content created for Lemonilo to support its digital marketing and promotional activities.",
        "The production focused on creating engaging visual content that communicates the brand and its products in a format suitable for digital platforms.",
      ],
      ar: [
        "محتوى فيديو صُنع لـ Lemonilo لدعم تسويقها الرقمي وأنشطتها الترويجية.",
        "ركّز الإنتاج على صنع محتوى بصري جذاب يعبّر عن العلامة ومنتجاتها بصيغة تناسب المنصات الرقمية.",
      ],
    },
    meta: {
      en: [
        { label: "Brand", value: "Lemonilo" },
        { label: "Industry", value: "Food & Consumer Goods" },
        { label: "Project", value: "Video Production" },
      ],
      ar: [
        { label: "العلامة", value: "Lemonilo" },
        { label: "القطاع", value: "الأغذية والسلع الاستهلاكية" },
        { label: "المشروع", value: "إنتاج فيديو" },
      ],
    },
  },
  {
    slug: "waroeng-steak-video",
    gallery: [
      "/marketing/waroengsteak.jpg",
      "/marketing/waroengsteak2.jpg",
    ],
    ratio: "1 / 1",
    service: "marketing",
    title: "Waroeng Steak",
    subtitle: { en: "Food & Promotional Video", ar: "فيديو طعام وترويج" },
    logo: "/client/09. LOGO WAROENG STEAK.jpg",
    summary: {
      en: "Appetising promotional video content built around the brand's food offerings.",
      ar: "محتوى فيديو ترويجي شهي مبني حول عروض الطعام لدى العلامة.",
    },
    body: {
      en: [
        "A promotional video project for Waroeng Steak, focusing on creating appetising and engaging visual content around its food offerings.",
        "The content was designed to support the brand's digital presence and promotional communication across online channels.",
      ],
      ar: [
        "مشروع فيديو ترويجي لـ Waroeng Steak، بالتركيز على صنع محتوى بصري شهي وجذاب حول عروض طعامها.",
        "صُمم المحتوى لدعم الحضور الرقمي للعلامة وتواصلها الترويجي عبر القنوات الإلكترونية.",
      ],
    },
    meta: {
      en: [
        { label: "Brand", value: "Waroeng Steak" },
        { label: "Industry", value: "Food & Restaurant" },
        { label: "Project", value: "Video Production" },
      ],
      ar: [
        { label: "العلامة", value: "Waroeng Steak" },
        { label: "القطاع", value: "الأغذية والمطاعم" },
        { label: "المشروع", value: "إنتاج فيديو" },
      ],
    },
  },
  {
    slug: "borch-and-co-visual",
    gallery: [
      "/marketing/borch.webp",
      "/marketing/borch2.webp",
    ],
    service: "marketing",
    title: "Borch & Co",
    subtitle: { en: "Jewellery Photography & Video", ar: "تصوير وفيديو مجوهرات" },
    summary: {
      en: "Refined imagery and video showcasing a Sydney jewellery brand's products.",
      ar: "صور وفيديو أنيقة تبرز منتجات علامة مجوهرات من سيدني.",
    },
    body: {
      en: [
        "A combination of photography and video production for Borch & Co, a jewellery brand from Sydney.",
        "The visual content was created to showcase the brand's products through refined imagery and video suitable for digital marketing, product presentation, and promotional activities.",
      ],
      ar: [
        "مزيج من التصوير الفوتوغرافي وإنتاج الفيديو لـ Borch & Co، علامة مجوهرات من سيدني.",
        "صُنع المحتوى البصري لإبراز منتجات العلامة عبر صور وفيديو أنيقة تناسب التسويق الرقمي وعرض المنتجات والأنشطة الترويجية.",
      ],
    },
    meta: {
      en: [
        { label: "Brand", value: "Borch & Co" },
        { label: "Industry", value: "Jewellery & Fashion" },
        { label: "Project", value: "Photography & Video" },
      ],
      ar: [
        { label: "العلامة", value: "Borch & Co" },
        { label: "القطاع", value: "المجوهرات والأزياء" },
        { label: "المشروع", value: "تصوير وفيديو" },
      ],
    },
  },
];

export function pick<T>(value: Localized<T>, lang: Locale): T {
  return value[lang] ?? value.en;
}

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

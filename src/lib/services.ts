import type { Locale } from "./dictionaries";

/**
 * Detail pages for individual services. Copy supplied by the client; the commas
 * needed to parse the lists were added and nothing was reworded.
 *
 * A service only gets its own page once its copy is here. `SERVICE_SLUGS` maps
 * the three homepage services to a page, or to null while one is still missing,
 * so the header dropdown never links somewhere that does not exist.
 *
 * `why` and `outro` are optional: the two pages carry different sections and
 * whichever is absent is simply not rendered.
 */
export type ServiceBlock = {
  title: string;
  /** One line under the title, used where the copy leads with a promise. */
  tagline?: string;
  paragraphs: string[];
  idealFor?: string[];
};

export type ServiceDoc = {
  eyebrow: string;
  title: string;
  /** Transparent illustration under /public, shown beside the intro. */
  image: string;
  intro: string[];
  whatWeDo: { heading: string; numbered?: boolean; blocks: ServiceBlock[] };
  idealForLabel?: string;
  process: { heading: string; steps: { title: string; desc: string }[] };
  why?: { heading: string; items: { title: string; desc: string }[] };
  outro?: { heading: string; paragraphs: string[] };
  closing: { heading: string; body: string; cta: string };
};

/** Homepage service order: ads, web, marketing. null means no page yet. */
export const SERVICE_SLUGS = [
  "advertising-agency",
  "web-development",
  "digital-marketing",
] as const;

const en: Record<string, ServiceDoc> = {
  "advertising-agency": {
    eyebrow: "Advertising Agency",
    title: "Advertising built around your business",
    image: "/services/ads.webp",
    intro: [
      "La Vora Digital helps brands plan, manage and optimise paid advertising campaigns across Meta Ads and Google Ads. We combine strategic planning, audience targeting, creative direction, budget management and continuous optimisation to help your campaigns work more effectively.",
      "We do not simply launch advertisements and wait for the results. We monitor campaign performance, analyse the data and continuously identify opportunities to improve targeting, creative, budget allocation and overall campaign efficiency.",
    ],
    whatWeDo: {
      heading: "What We Do",
      blocks: [
        {
          title: "Meta Ads",
          paragraphs: [
            "We manage advertising campaigns across Facebook and Instagram through Meta Ads.",
            "Our services include campaign planning, audience targeting, campaign setup, creative testing, budget allocation, performance monitoring and continuous optimisation.",
            "We help brands reach relevant audiences based on their business objectives, whether the goal is to increase reach, generate traffic, collect leads or support sales campaigns.",
          ],
        },
        {
          title: "Google Ads",
          paragraphs: [
            "We help brands reach people when they are actively searching for products, services or information through Google Ads.",
            "Our Google Ads services include campaign planning, keyword targeting, ad setup, budget management, performance tracking and ongoing optimisation.",
            "By connecting your campaigns with relevant search intent, we help your brand appear in front of audiences who are actively looking for what your business offers.",
          ],
        },
      ],
    },
    process: {
      heading: "Our Advertising Process",
      steps: [
        {
          title: "Strategy",
          desc: "We start by understanding your business objectives, target audience, budget and campaign requirements. From there we develop an advertising strategy designed around your specific goals.",
        },
        {
          title: "Campaign Setup",
          desc: "We structure your campaigns across Meta Ads and Google Ads, including audience targeting, campaign objectives, placements, keywords, budgets, tracking and other essential settings.",
        },
        {
          title: "Launch",
          desc: "Once everything is ready we launch your campaigns and begin collecting performance data that will guide the next stage of optimisation.",
        },
        {
          title: "Monitor",
          desc: "We continuously monitor campaign performance including reach, impressions, clicks, CTR, CPC, leads, conversions and other relevant KPIs.",
        },
        {
          title: "Optimise",
          desc: "We analyse the data and make ongoing adjustments to targeting, creative, budget allocation, campaign structure and other elements to improve campaign efficiency.",
        },
        {
          title: "Report",
          desc: "We provide clear campaign reporting so you can understand how your advertising budget is being used and how your campaigns are performing.",
        },
      ],
    },
    why: {
      heading: "Why Choose La Vora Digital",
      items: [
        {
          title: "Data Driven Advertising",
          desc: "We use campaign data and performance insights to guide advertising decisions and identify opportunities for improvement.",
        },
        {
          title: "Strategic Media Buying",
          desc: "We carefully plan how your advertising budget is allocated across campaigns, audiences and placements based on your objectives.",
        },
        {
          title: "Continuous Optimisation",
          desc: "Campaign management does not stop after launch. We continuously monitor performance and make adjustments throughout the campaign.",
        },
        {
          title: "Transparent Reporting",
          desc: "Clear reporting gives you visibility into campaign activity, spending, performance and key results.",
        },
        {
          title: "Built Around Your Goals",
          desc: "Every campaign starts with your business objectives. We create the strategy around what you want your advertising to achieve.",
        },
      ],
    },
    closing: {
      heading: "Ready to Make Your Advertising Work Harder",
      body: "Tell us about your business, your audience and your objectives, and let us build an advertising strategy around them.",
      cta: "Start Your Project",
    },
  },

  "web-development": {
    eyebrow: "Web Development",
    title: "Web experiences built for your business",
    image: "/services/web.webp",
    intro: [
      "La Vora Digital creates modern websites and digital platforms designed around your brand, your audience, and your business objectives. From company profile websites to e commerce platforms, web systems, and landing pages, we build digital experiences that are functional, responsive, and ready to grow with your business.",
      "A website should be more than a digital presence. It should communicate your brand, make information easy to access, support your marketing activities, and create a clear experience for your customers.",
      "We combine thoughtful design, reliable development, and business focused functionality to create websites that work across devices and support the way your business operates.",
    ],
    idealForLabel: "Ideal for",
    whatWeDo: {
      heading: "Our Web Development Services",
      numbered: true,
      blocks: [
        {
          title: "Company Profile Website",
          tagline: "Build a stronger digital presence for your company.",
          paragraphs: [
            "We create professional company profile websites that communicate your brand, services, capabilities, portfolio, and company information in a clear and engaging way.",
            "Designed to build credibility and make your business easier to discover, our company profile websites are responsive, modern, and aligned with your brand identity.",
          ],
          idealFor: [
            "Companies",
            "Agencies",
            "Corporate Brands",
            "Professional Services",
          ],
        },
        {
          title: "E Commerce Website",
          tagline: "Turn your website into a digital storefront.",
          paragraphs: [
            "We develop e commerce websites that allow businesses to showcase products, manage online purchases, and create a seamless shopping experience for customers.",
            "From product catalogues and shopping carts to checkout and payment integration, we build e commerce platforms around the needs of your business.",
          ],
          idealFor: [
            "Retail Brands",
            "Product Businesses",
            "Online Stores",
            "Growing Businesses",
          ],
        },
        {
          title: "Web System",
          tagline: "Digital systems designed around the way you work.",
          paragraphs: [
            "We develop custom web based systems that help businesses manage their operations, data, workflows, and internal processes through a centralised digital platform.",
            "From dashboards and management systems to custom business applications, we develop solutions based on your specific operational requirements.",
          ],
          idealFor: [
            "Companies",
            "Internal Operations",
            "Management Systems",
            "Custom Business Solutions",
          ],
        },
        {
          title: "Landing Page",
          tagline: "Focused pages built for focused campaigns.",
          paragraphs: [
            "We create landing pages designed to support advertising campaigns, product launches, promotions, lead generation, and other specific marketing objectives.",
            "Every element is structured around the customer journey with clear messaging, compelling visuals, strong calls to action, and responsive design.",
          ],
          idealFor: [
            "Advertising Campaigns",
            "Product Launches",
            "Lead Generation",
            "Promotions",
          ],
        },
      ],
    },
    process: {
      heading: "Our Approach",
      steps: [
        {
          title: "Understand",
          desc: "We start by understanding your business, audience, objectives, content, and functional requirements.",
        },
        {
          title: "Plan",
          desc: "We define the website structure, user journey, features, and technical requirements before development begins.",
        },
        {
          title: "Design",
          desc: "We create a visual direction that reflects your brand while keeping the user experience clear and intuitive.",
        },
        {
          title: "Develop",
          desc: "Our team transforms the approved design into a responsive and functional website or web platform.",
        },
        {
          title: "Test",
          desc: "We test functionality, responsiveness, usability, and performance across different devices and screen sizes.",
        },
        {
          title: "Launch",
          desc: "Once everything is ready, we deploy your website and make sure it is prepared for your audience and business needs.",
        },
      ],
    },
    outro: {
      heading: "Built for More Than Just the Screen",
      paragraphs: [
        "Your website is often the first place people interact with your brand.",
        "That is why we build websites that connect your brand, marketing, and business objectives in one digital experience.",
        "Whether you need a professional company profile, an online store, a custom web system, or a campaign focused landing page, La Vora Digital builds digital experiences around what your business actually needs.",
      ],
    },
    closing: {
      heading: "Let's build your digital presence",
      body: "Tell us what you need and let's create a web experience built around your business.",
      cta: "Start Your Project",
    },
  },

  "digital-marketing": {
    eyebrow: "Digital Marketing",
    title: "Build a stronger presence across digital channels",
    image: "/services/digital-marketing.webp",
    intro: [
      "La Vora Digital helps brands build and strengthen their digital presence through strategic digital marketing. We combine content, social media, search, and audience insights to create a connected approach that keeps your brand relevant and visible online.",
      "Digital marketing is more than simply posting content or being present on social media. It is about having the right message, reaching the right audience, and creating consistent interactions across the digital channels where your customers spend their time.",
      "Our approach connects strategy, content, audience understanding, and performance insights to create digital marketing activities that support your wider business objectives.",
    ],
    idealForLabel: "Ideal for",
    whatWeDo: {
      heading: "Our Digital Marketing Services",
      numbered: true,
      blocks: [
        {
          title: "Social Media Management",
          tagline: "Keep your brand active, relevant, and connected.",
          paragraphs: [
            "We help manage your social media presence through strategic content planning, creative direction, publishing, and performance monitoring.",
            "From content calendars to campaign support, we create a consistent social media presence that reflects your brand and engages your audience.",
          ],
          idealFor: [
            "Brands",
            "Companies",
            "Products",
            "Services",
            "Growing Businesses",
          ],
        },
        {
          title: "Content Strategy",
          tagline: "Create content with a clear purpose.",
          paragraphs: [
            "We develop content strategies based on your brand identity, audience, objectives, and communication needs.",
            "We help determine what your brand should communicate, how it should be presented, and which types of content can create meaningful engagement with your audience.",
          ],
        },
        {
          title: "Search Engine Optimisation",
          tagline: "Help your brand get discovered.",
          paragraphs: [
            "We optimise your website and digital content to improve its visibility in search engines and make it easier for potential customers to discover your business.",
            "Our approach can include keyword research, on page optimisation, content recommendations, technical improvements, and ongoing performance analysis.",
          ],
        },
        {
          title: "Digital Campaign Strategy",
          tagline: "Connect your digital activities into one strategy.",
          paragraphs: [
            "We help brands plan digital campaigns that bring together content, social media, advertising, websites, and other relevant digital touchpoints.",
            "Each campaign is structured around a clear objective and designed to create a consistent journey from the first interaction to the desired action.",
          ],
        },
      ],
    },
    process: {
      heading: "Our Approach",
      steps: [
        {
          title: "Understand",
          desc: "We learn about your brand, audience, market, competitors, and business objectives.",
        },
        {
          title: "Strategise",
          desc: "We develop a digital marketing strategy based on your goals, audience behaviour, and available channels.",
        },
        {
          title: "Create",
          desc: "We develop content ideas, messaging, and digital assets that communicate your brand consistently.",
        },
        {
          title: "Activate",
          desc: "We implement the strategy across the selected digital channels and coordinate activities to create a connected brand presence.",
        },
        {
          title: "Analyse",
          desc: "We monitor engagement, traffic, audience behaviour, and other relevant indicators to understand what is working.",
        },
        {
          title: "Optimise",
          desc: "We use insights from performance data to refine the strategy and improve future digital activities.",
        },
      ],
    },
    outro: {
      heading: "More Than Just Being Online",
      paragraphs: [
        "Being present online is not enough. Your brand needs a reason to be there.",
        "La Vora Digital helps connect your digital activities with a clear strategy so that your website, social media, content, and campaigns work together rather than operating separately.",
        "Whether you need to strengthen your social media presence, improve search visibility, develop a content strategy, or plan a complete digital campaign, we build the approach around your brand and objectives.",
      ],
    },
    closing: {
      heading: "Let's build your digital presence",
      body: "Tell us about your brand and your goals, and let's create a digital marketing strategy built around your business.",
      cta: "Start Your Project",
    },
  },
};

const ar: Record<string, ServiceDoc> = {
  "advertising-agency": {
    eyebrow: "وكالة إعلانات",
    title: "إعلانات مبنية حول عملك",
    image: "/services/ads.webp",
    intro: [
      "تساعد لا فورا ديجيتال العلامات على تخطيط الحملات الإعلانية المدفوعة وإدارتها وتحسينها عبر إعلانات ميتا وإعلانات جوجل. نجمع بين التخطيط الاستراتيجي واستهداف الجمهور والتوجيه الإبداعي وإدارة الميزانية والتحسين المستمر، لتعمل حملاتك بفعالية أكبر.",
      "نحن لا نطلق الإعلانات وننتظر النتائج فحسب. نراقب أداء الحملات، ونحلل البيانات، ونرصد باستمرار فرص تحسين الاستهداف والمحتوى الإبداعي وتوزيع الميزانية وكفاءة الحملة عمومًا.",
    ],
    whatWeDo: {
      heading: "ما الذي نقوم به",
      blocks: [
        {
          title: "إعلانات ميتا",
          paragraphs: [
            "ندير الحملات الإعلانية على فيسبوك وإنستغرام عبر إعلانات ميتا.",
            "تشمل خدماتنا تخطيط الحملات واستهداف الجمهور وإعداد الحملات واختبار المحتوى الإبداعي وتوزيع الميزانية ومراقبة الأداء والتحسين المستمر.",
            "نساعد العلامات على الوصول إلى الجمهور المناسب وفق أهداف عملها، سواء كان الهدف زيادة الوصول أو جلب الزيارات أو جمع العملاء المحتملين أو دعم حملات المبيعات.",
          ],
        },
        {
          title: "إعلانات جوجل",
          paragraphs: [
            "نساعد العلامات على الوصول إلى الناس وهم يبحثون فعليًا عن منتجات أو خدمات أو معلومات، عبر إعلانات جوجل.",
            "تشمل خدماتنا في إعلانات جوجل تخطيط الحملات واستهداف الكلمات المفتاحية وإعداد الإعلانات وإدارة الميزانية وتتبع الأداء والتحسين المستمر.",
            "بربط حملاتك بنية البحث المناسبة، نساعد علامتك على الظهور أمام جمهور يبحث فعلًا عمّا يقدمه عملك.",
          ],
        },
      ],
    },
    process: {
      heading: "منهجنا في الإعلان",
      steps: [
        {
          title: "الاستراتيجية",
          desc: "نبدأ بفهم أهداف عملك وجمهورك المستهدف وميزانيتك ومتطلبات حملتك. ومن هناك نطوّر استراتيجية إعلانية مصممة حول أهدافك تحديدًا.",
        },
        {
          title: "إعداد الحملة",
          desc: "نبني هيكل حملاتك عبر إعلانات ميتا وإعلانات جوجل، بما في ذلك استهداف الجمهور وأهداف الحملة والمواضع والكلمات المفتاحية والميزانيات والتتبع وغيرها من الإعدادات الأساسية.",
        },
        {
          title: "الإطلاق",
          desc: "حين يصبح كل شيء جاهزًا نطلق حملاتك ونبدأ بجمع بيانات الأداء التي ستوجّه مرحلة التحسين التالية.",
        },
        {
          title: "المراقبة",
          desc: "نراقب أداء الحملات باستمرار، بما في ذلك الوصول والظهور والنقرات ونسبة النقر وتكلفة النقرة والعملاء المحتملين والتحويلات وغيرها من مؤشرات الأداء.",
        },
        {
          title: "التحسين",
          desc: "نحلل البيانات ونجري تعديلات مستمرة على الاستهداف والمحتوى الإبداعي وتوزيع الميزانية وهيكل الحملة وغيرها لتحسين كفاءة الحملة.",
        },
        {
          title: "التقارير",
          desc: "نقدّم تقارير واضحة عن الحملات، لتفهم كيف تُستخدم ميزانيتك الإعلانية وكيف تؤدي حملاتك.",
        },
      ],
    },
    why: {
      heading: "لماذا لا فورا ديجيتال",
      items: [
        {
          title: "إعلانات مبنية على البيانات",
          desc: "نستخدم بيانات الحملات ورؤى الأداء لتوجيه القرارات الإعلانية ورصد فرص التحسين.",
        },
        {
          title: "شراء وسائط استراتيجي",
          desc: "نخطط بعناية لتوزيع ميزانيتك الإعلانية بين الحملات والجماهير والمواضع، وفق أهدافك.",
        },
        {
          title: "تحسين مستمر",
          desc: "إدارة الحملة لا تتوقف بعد الإطلاق. نراقب الأداء باستمرار ونجري التعديلات طوال مدة الحملة.",
        },
        {
          title: "تقارير شفافة",
          desc: "تقارير واضحة تمنحك رؤية على نشاط الحملة والإنفاق والأداء والنتائج الرئيسية.",
        },
        {
          title: "مبنية حول أهدافك",
          desc: "كل حملة تبدأ من أهداف عملك. نبني الاستراتيجية حول ما تريد أن يحققه إعلانك.",
        },
      ],
    },
    closing: {
      heading: "جاهز لجعل إعلاناتك تعمل بجدية أكبر",
      body: "حدّثنا عن عملك وجمهورك وأهدافك، ودعنا نبني استراتيجية إعلانية حولها.",
      cta: "ابدأ مشروعك",
    },
  },

  "web-development": {
    eyebrow: "تطوير المواقع",
    title: "تجارب رقمية مبنية لعملك",
    image: "/services/web.webp",
    intro: [
      "تصنع لا فورا ديجيتال مواقع ومنصات رقمية حديثة، مصممة حول علامتك وجمهورك وأهداف عملك. من مواقع بروفايل الشركات إلى المتاجر الإلكترونية وأنظمة الويب وصفحات الهبوط، نبني تجارب رقمية عملية ومتجاوبة وجاهزة لتنمو مع عملك.",
      "الموقع يجب أن يكون أكثر من مجرد حضور رقمي. يجب أن يعبّر عن علامتك، ويجعل الوصول إلى المعلومات سهلًا، ويدعم أنشطتك التسويقية، ويصنع تجربة واضحة لعملائك.",
      "نجمع بين التصميم المدروس والتطوير الموثوق والوظائف المبنية حول احتياجات العمل، لنصنع مواقع تعمل على مختلف الأجهزة وتدعم طريقة إدارة عملك.",
    ],
    idealForLabel: "مناسب لـ",
    whatWeDo: {
      heading: "خدماتنا في تطوير المواقع",
      numbered: true,
      blocks: [
        {
          title: "موقع بروفايل الشركة",
          tagline: "ابنِ حضورًا رقميًا أقوى لشركتك.",
          paragraphs: [
            "نصنع مواقع بروفايل احترافية تعرّف بعلامتك وخدماتك وقدراتك وأعمالك ومعلومات شركتك بطريقة واضحة وجذابة.",
            "مصممة لبناء المصداقية وتسهيل العثور على عملك، ومواقعنا متجاوبة وحديثة ومنسجمة مع هوية علامتك.",
          ],
          idealFor: ["الشركات", "الوكالات", "العلامات المؤسسية", "الخدمات المهنية"],
        },
        {
          title: "متجر إلكتروني",
          tagline: "حوّل موقعك إلى واجهة بيع رقمية.",
          paragraphs: [
            "نطوّر متاجر إلكترونية تتيح للشركات عرض منتجاتها وإدارة عمليات الشراء عبر الإنترنت وصنع تجربة تسوق سلسة للعملاء.",
            "من كتالوجات المنتجات وسلة الشراء إلى إتمام الطلب وربط وسائل الدفع، نبني منصات التجارة الإلكترونية حول احتياجات عملك.",
          ],
          idealFor: [
            "علامات التجزئة",
            "الأعمال القائمة على المنتجات",
            "المتاجر الإلكترونية",
            "الأعمال النامية",
          ],
        },
        {
          title: "نظام ويب",
          tagline: "أنظمة رقمية مصممة حول طريقة عملك.",
          paragraphs: [
            "نطوّر أنظمة ويب مخصصة تساعد الشركات على إدارة عملياتها وبياناتها وسير عملها وإجراءاتها الداخلية عبر منصة رقمية موحدة.",
            "من لوحات المتابعة وأنظمة الإدارة إلى التطبيقات المخصصة للأعمال، نطوّر الحلول بناءً على متطلباتك التشغيلية تحديدًا.",
          ],
          idealFor: [
            "الشركات",
            "العمليات الداخلية",
            "أنظمة الإدارة",
            "الحلول المخصصة للأعمال",
          ],
        },
        {
          title: "صفحة هبوط",
          tagline: "صفحات مركّزة لحملات مركّزة.",
          paragraphs: [
            "نصنع صفحات هبوط مصممة لدعم الحملات الإعلانية وإطلاق المنتجات والعروض الترويجية وجمع العملاء المحتملين وغيرها من الأهداف التسويقية المحددة.",
            "كل عنصر مبني حول رحلة العميل، برسائل واضحة وعناصر بصرية مقنعة ودعوات قوية لاتخاذ إجراء وتصميم متجاوب.",
          ],
          idealFor: [
            "الحملات الإعلانية",
            "إطلاق المنتجات",
            "جمع العملاء المحتملين",
            "العروض الترويجية",
          ],
        },
      ],
    },
    process: {
      heading: "منهجنا",
      steps: [
        {
          title: "الفهم",
          desc: "نبدأ بفهم عملك وجمهورك وأهدافك ومحتواك ومتطلباتك الوظيفية.",
        },
        {
          title: "التخطيط",
          desc: "نحدد هيكل الموقع ورحلة المستخدم والمزايا والمتطلبات التقنية قبل بدء التطوير.",
        },
        {
          title: "التصميم",
          desc: "نصنع توجهًا بصريًا يعكس علامتك مع إبقاء تجربة المستخدم واضحة وبديهية.",
        },
        {
          title: "التطوير",
          desc: "يحوّل فريقنا التصميم المعتمد إلى موقع أو منصة ويب متجاوبة وعملية.",
        },
        {
          title: "الاختبار",
          desc: "نختبر الوظائف والتجاوب وسهولة الاستخدام والأداء على أجهزة وأحجام شاشات مختلفة.",
        },
        {
          title: "الإطلاق",
          desc: "حين يصبح كل شيء جاهزًا ننشر موقعك ونتأكد من جاهزيته لجمهورك ولاحتياجات عملك.",
        },
      ],
    },
    outro: {
      heading: "مبني لأكثر من مجرد الشاشة",
      paragraphs: [
        "موقعك غالبًا هو أول مكان يتفاعل فيه الناس مع علامتك.",
        "لذلك نبني مواقع تربط علامتك وتسويقك وأهداف عملك في تجربة رقمية واحدة.",
        "سواء كنت تحتاج بروفايل شركة احترافيًا أو متجرًا إلكترونيًا أو نظام ويب مخصصًا أو صفحة هبوط لحملة، تبني لا فورا ديجيتال تجارب رقمية حول ما يحتاجه عملك فعلًا.",
      ],
    },
    closing: {
      heading: "لنبنِ حضورك الرقمي",
      body: "حدّثنا عمّا تحتاجه، ولنصنع تجربة رقمية مبنية حول عملك.",
      cta: "ابدأ مشروعك",
    },
  },

  "digital-marketing": {
    eyebrow: "تسويق رقمي",
    title: "حضور أقوى عبر القنوات الرقمية",
    image: "/services/digital-marketing.webp",
    intro: [
      "تساعد لا فورا ديجيتال العلامات على بناء حضورها الرقمي وتقويته عبر تسويق رقمي استراتيجي. نجمع بين المحتوى ووسائل التواصل والبحث ورؤى الجمهور، لصنع منهج مترابط يبقي علامتك حاضرة وذات صلة على الإنترنت.",
      "التسويق الرقمي أكثر من مجرد نشر محتوى أو الوجود على وسائل التواصل. إنه امتلاك الرسالة الصحيحة، والوصول إلى الجمهور الصحيح، وصنع تفاعلات متسقة عبر القنوات الرقمية التي يقضي فيها عملاؤك وقتهم.",
      "يربط منهجنا بين الاستراتيجية والمحتوى وفهم الجمهور ورؤى الأداء، لصنع أنشطة تسويق رقمي تدعم أهداف عملك الأوسع.",
    ],
    idealForLabel: "مناسب لـ",
    whatWeDo: {
      heading: "خدماتنا في التسويق الرقمي",
      numbered: true,
      blocks: [
        {
          title: "إدارة وسائل التواصل",
          tagline: "أبقِ علامتك نشطة وحاضرة ومتصلة.",
          paragraphs: [
            "نساعد في إدارة حضورك على وسائل التواصل عبر التخطيط الاستراتيجي للمحتوى والتوجيه الإبداعي والنشر ومراقبة الأداء.",
            "من تقويم المحتوى إلى دعم الحملات، نصنع حضورًا متسقًا على وسائل التواصل يعكس علامتك ويشرك جمهورك.",
          ],
          idealFor: [
            "العلامات",
            "الشركات",
            "المنتجات",
            "الخدمات",
            "الأعمال النامية",
          ],
        },
        {
          title: "استراتيجية المحتوى",
          tagline: "اصنع محتوى بهدف واضح.",
          paragraphs: [
            "نطوّر استراتيجيات محتوى مبنية على هوية علامتك وجمهورك وأهدافك واحتياجاتك في التواصل.",
            "نساعد في تحديد ما الذي يجب أن تقوله علامتك، وكيف يُقدَّم، وأي أنواع المحتوى يمكنها صنع تفاعل ذي معنى مع جمهورك.",
          ],
        },
        {
          title: "تحسين محركات البحث",
          tagline: "اجعل علامتك سهلة الاكتشاف.",
          paragraphs: [
            "نحسّن موقعك ومحتواك الرقمي لرفع ظهورهما في محركات البحث وتسهيل اكتشاف عملك على العملاء المحتملين.",
            "قد يشمل منهجنا بحث الكلمات المفتاحية والتحسين داخل الصفحة وتوصيات المحتوى والتحسينات التقنية وتحليل الأداء المستمر.",
          ],
        },
        {
          title: "استراتيجية الحملات الرقمية",
          tagline: "اربط أنشطتك الرقمية في استراتيجية واحدة.",
          paragraphs: [
            "نساعد العلامات على تخطيط حملات رقمية تجمع المحتوى ووسائل التواصل والإعلانات والمواقع وغيرها من نقاط التواصل الرقمية.",
            "كل حملة مبنية حول هدف واضح ومصممة لصنع رحلة متسقة من أول تفاعل حتى الإجراء المنشود.",
          ],
        },
      ],
    },
    process: {
      heading: "منهجنا",
      steps: [
        {
          title: "الفهم",
          desc: "نتعرّف على علامتك وجمهورك وسوقك ومنافسيك وأهداف عملك.",
        },
        {
          title: "وضع الاستراتيجية",
          desc: "نطوّر استراتيجية تسويق رقمي مبنية على أهدافك وسلوك جمهورك والقنوات المتاحة.",
        },
        {
          title: "الإنشاء",
          desc: "نطوّر أفكار المحتوى والرسائل والأصول الرقمية التي تعبّر عن علامتك باتساق.",
        },
        {
          title: "التفعيل",
          desc: "ننفّذ الاستراتيجية عبر القنوات الرقمية المختارة وننسّق الأنشطة لصنع حضور مترابط للعلامة.",
        },
        {
          title: "التحليل",
          desc: "نراقب التفاعل والزيارات وسلوك الجمهور وغيرها من المؤشرات لفهم ما ينجح.",
        },
        {
          title: "التحسين",
          desc: "نستخدم رؤى بيانات الأداء لتحسين الاستراتيجية وتطوير الأنشطة الرقمية القادمة.",
        },
      ],
    },
    outro: {
      heading: "أكثر من مجرد الوجود على الإنترنت",
      paragraphs: [
        "الوجود على الإنترنت وحده لا يكفي. علامتك تحتاج سببًا لتكون هناك.",
        "تساعد لا فورا ديجيتال على ربط أنشطتك الرقمية باستراتيجية واضحة، ليعمل موقعك ووسائل تواصلك ومحتواك وحملاتك معًا بدل أن يعمل كل منها منفصلًا.",
        "سواء كنت تريد تقوية حضورك على وسائل التواصل أو تحسين ظهورك في البحث أو تطوير استراتيجية محتوى أو تخطيط حملة رقمية كاملة، نبني المنهج حول علامتك وأهدافك.",
      ],
    },
    closing: {
      heading: "لنبنِ حضورك الرقمي",
      body: "حدّثنا عن علامتك وأهدافك، ولنصنع استراتيجية تسويق رقمي مبنية حول عملك.",
      cta: "ابدأ مشروعك",
    },
  },
};

export const serviceDocs: Record<Locale, Record<string, ServiceDoc>> = { en, ar };

export function getServiceDoc(lang: Locale, slug: string) {
  return serviceDocs[lang][slug];
}

/** Slugs that have copy, used for static generation. */
export const SERVICE_PAGE_SLUGS = Object.keys(en);

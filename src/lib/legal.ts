import type { Locale } from "./dictionaries";

/**
 * Legal copy, kept apart from the marketing dictionary because it changes on a
 * different clock and gets reviewed by different people.
 *
 * Bracketed values are placeholders, not content. They must be filled in before
 * the site goes live, and they are deliberately identical in both languages so a
 * missed one is obvious.
 */
export type LegalSection = { h: string; p: string[]; ul?: string[] };
export type LegalDoc = { title: string; updated: string; intro: string; sections: LegalSection[] };

const privacyEn: LegalDoc = {
  title: "Privacy Policy",
  updated: "Last updated 29 September 2026",
  intro:
    "This policy covers this website and the enquiry form on it. It is written for people, not for lawyers, and it describes what actually happens to your details when you contact us.",
  sections: [
    {
      h: "Who we are",
      p: [
        "La Vora Digital, a digital advertising agency. Registered entity name, business address and company registration number: [REAL DATA]. Reach us about anything in this policy at [CONTACT EMAIL].",
      ],
    },
    {
      h: "What we collect",
      p: [
        "Only what you type into the enquiry form and send to us. That is your name, your email address, your company name if you fill it in, and the message itself.",
        "We do not run advertising or analytics trackers on this site, and we do not set cookies. If that changes, this section changes with it and the date at the top moves.",
      ],
    },
    {
      h: "Why we collect it",
      p: [
        "To answer your enquiry and, if you become a client, to carry out the work. That is the only use. We do not sell your details, we do not rent them, and we do not pass them to anyone for their own marketing.",
      ],
    },
    {
      h: "Where it goes",
      p: [
        "The form sends your message as an email through Resend, an email delivery service that processes it on our behalf. The email then sits in our inbox like any other email we receive. Those two providers can technically see the contents, in the same way any email provider can.",
      ],
    },
    {
      h: "How long we keep it",
      p: [
        "Enquiries that do not turn into work are deleted within twelve months. Records tied to paid work are kept as long as tax and accounting rules require, then deleted.",
      ],
    },
    {
      h: "Your choices",
      p: ["Email [CONTACT EMAIL] and we will act on it within thirty days."],
      ul: [
        "Ask for a copy of what we hold about you.",
        "Ask us to correct something that is wrong.",
        "Ask us to delete it. We will, unless we are legally required to keep it.",
      ],
    },
    {
      h: "Children",
      p: [
        "This site is aimed at businesses. We do not knowingly collect details from anyone under eighteen.",
      ],
    },
    {
      h: "Changes",
      p: [
        "When this policy changes we update the date at the top. We do not notify you individually, so check back if it matters to you.",
      ],
    },
  ],
};

const privacyAr: LegalDoc = {
  title: "سياسة الخصوصية",
  updated: "آخر تحديث 29 سبتمبر 2026",
  intro:
    "تغطي هذه السياسة هذا الموقع ونموذج الاستفسار الموجود فيه. كُتبت بلغة مفهومة لا بلغة قانونية، وتشرح ما يحدث فعليًا لبياناتك حين تتواصل معنا.",
  sections: [
    {
      h: "من نحن",
      p: [
        "لا فورا ديجيتال، وكالة إعلانات رقمية. الاسم المسجل للمنشأة وعنوان العمل ورقم السجل التجاري: [REAL DATA]. لأي استفسار بخصوص هذه السياسة راسلنا على [CONTACT EMAIL].",
      ],
    },
    {
      h: "ما الذي نجمعه",
      p: [
        "فقط ما تكتبه في نموذج الاستفسار وترسله إلينا: اسمك، وبريدك الإلكتروني، واسم شركتك إن أدخلته، ونص رسالتك.",
        "لا نشغّل أدوات تتبع إعلانية أو تحليلية على هذا الموقع، ولا نضع ملفات تعريف الارتباط. إن تغير ذلك فسيتغير هذا القسم معه ويتحدث التاريخ في الأعلى.",
      ],
    },
    {
      h: "لماذا نجمعه",
      p: [
        "للرد على استفسارك، ولتنفيذ العمل إن أصبحت عميلًا لدينا. هذا هو الاستخدام الوحيد. لا نبيع بياناتك ولا نؤجرها ولا نمررها لأي جهة لأغراضها التسويقية.",
      ],
    },
    {
      h: "إلى أين تذهب",
      p: [
        "يرسل النموذج رسالتك كبريد إلكتروني عبر Resend، وهي خدمة توصيل بريد تعالج الرسالة نيابة عنا. بعدها تصل الرسالة إلى صندوق بريدنا كأي بريد آخر. هاتان الجهتان تستطيعان تقنيًا الاطلاع على المحتوى، تمامًا كما يستطيع أي مزود بريد إلكتروني.",
      ],
    },
    {
      h: "مدة الاحتفاظ",
      p: [
        "الاستفسارات التي لا تتحول إلى عمل تُحذف خلال اثني عشر شهرًا. السجلات المرتبطة بعمل مدفوع تُحفظ للمدة التي تفرضها الأنظمة الضريبية والمحاسبية، ثم تُحذف.",
      ],
    },
    {
      h: "حقوقك",
      p: ["راسلنا على [CONTACT EMAIL] وسننفذ طلبك خلال ثلاثين يومًا."],
      ul: [
        "أن تطلب نسخة مما نحتفظ به عنك.",
        "أن تطلب تصحيح أي معلومة خاطئة.",
        "أن تطلب حذفها، وسنفعل ما لم يلزمنا القانون بالاحتفاظ بها.",
      ],
    },
    {
      h: "الأطفال",
      p: [
        "هذا الموقع موجّه للشركات. لا نجمع عن قصد بيانات أي شخص دون الثامنة عشرة.",
      ],
    },
    {
      h: "التعديلات",
      p: [
        "عند تعديل هذه السياسة نحدّث التاريخ في الأعلى. لا نرسل إشعارًا فرديًا، لذا راجع الصفحة إن كان الأمر يهمك.",
      ],
    },
  ],
};

const termsEn: LegalDoc = {
  title: "Terms of Use",
  updated: "Last updated 29 September 2026",
  intro:
    "These terms cover this website and the enquiry form on it. They do not cover paid work. Client work runs on a separate signed agreement, and where the two disagree, that agreement wins.",
  sections: [
    {
      h: "Using this site",
      p: [
        "You may read this site and send us an enquiry. You may not attempt to break into it, scrape it at a rate that degrades it for other people, or use the enquiry form to send unsolicited marketing.",
      ],
    },
    {
      h: "What is on this site",
      p: [
        "The pages describe services we offer. They are a description, not an offer that can be accepted, and not a quote. Nothing here forms a contract until we both sign one. Figures or examples shown are illustrative unless a page says otherwise.",
      ],
    },
    {
      h: "Sending an enquiry",
      p: [
        "Send only details you are allowed to share. Do not paste passwords, account credentials, or another company's confidential data into the form. We treat what you send as described in our Privacy Policy, and we will not use your enquiry as a public case study without asking you first.",
        "An enquiry does not oblige us to take the work, and it does not oblige you to hire us.",
      ],
    },
    {
      h: "Our content",
      p: [
        "The text, layout, code and the La Vora Digital name and mark on this site belong to us. You may quote or link to a page with attribution. You may not republish the site or pass its content off as your own.",
      ],
    },
    {
      h: "Availability",
      p: [
        "We try to keep the site up and correct, and we do not promise either. It may be offline for maintenance, and a page may be out of date. We are not liable for loss arising from relying on the site alone, to the extent the law permits.",
      ],
    },
    {
      h: "Governing law",
      p: [
        "These terms are governed by the laws of [JURISDICTION], and disputes go to the courts of [JURISDICTION].",
      ],
    },
    {
      h: "Changes",
      p: [
        "We can update these terms. The date at the top tells you when we last did. Continuing to use the site after a change means you accept the new version.",
      ],
    },
  ],
};

const termsAr: LegalDoc = {
  title: "شروط الاستخدام",
  updated: "آخر تحديث 29 سبتمبر 2026",
  intro:
    "تغطي هذه الشروط هذا الموقع ونموذج الاستفسار الموجود فيه، ولا تغطي العمل المدفوع. أعمال العملاء تخضع لاتفاقية موقعة منفصلة، وعند التعارض فالاتفاقية هي المرجع.",
  sections: [
    {
      h: "استخدام الموقع",
      p: [
        "يمكنك تصفح هذا الموقع وإرسال استفسار إلينا. ولا يجوز لك محاولة اختراقه، أو سحب بياناته بوتيرة تُضعف أداءه للآخرين، أو استخدام نموذج الاستفسار لإرسال رسائل تسويقية غير مطلوبة.",
      ],
    },
    {
      h: "محتوى الموقع",
      p: [
        "تصف الصفحات خدمات نقدمها. هي وصف، وليست إيجابًا قابلًا للقبول، وليست عرض سعر. لا ينشأ عقد هنا حتى يوقّعه الطرفان. الأرقام أو الأمثلة المعروضة توضيحية ما لم تنص الصفحة على خلاف ذلك.",
      ],
    },
    {
      h: "إرسال استفسار",
      p: [
        "أرسل فقط المعلومات التي يحق لك مشاركتها. لا تضع في النموذج كلمات مرور أو بيانات دخول أو معلومات سرية تخص شركة أخرى. نتعامل مع ما ترسله وفق سياسة الخصوصية، ولن نستخدم استفسارك كدراسة حالة علنية دون أخذ إذنك أولًا.",
        "إرسال الاستفسار لا يُلزمنا بقبول العمل، ولا يُلزمك بالتعاقد معنا.",
      ],
    },
    {
      h: "ملكية المحتوى",
      p: [
        "النصوص والتصميم والكود واسم وشعار لا فورا ديجيتال على هذا الموقع ملك لنا. يمكنك الاقتباس أو الربط مع ذكر المصدر. ولا يجوز إعادة نشر الموقع أو نسبة محتواه إليك.",
      ],
    },
    {
      h: "التوافر",
      p: [
        "نسعى لإبقاء الموقع متاحًا ودقيقًا، دون أن نضمن أيًا منهما. قد يتوقف للصيانة، وقد تكون إحدى الصفحات غير محدّثة. ولا نتحمل مسؤولية أي خسارة ناتجة عن الاعتماد على الموقع وحده، في الحدود التي يسمح بها القانون.",
      ],
    },
    {
      h: "القانون الواجب التطبيق",
      p: [
        "تخضع هذه الشروط لقوانين [JURISDICTION]، وتختص محاكم [JURISDICTION] بنظر أي نزاع.",
      ],
    },
    {
      h: "التعديلات",
      p: [
        "يجوز لنا تحديث هذه الشروط. التاريخ في الأعلى يوضح آخر تحديث. واستمرارك في استخدام الموقع بعد التعديل يعني قبولك للنسخة الجديدة.",
      ],
    },
  ],
};

export const legal = {
  privacy: { en: privacyEn, ar: privacyAr },
  terms: { en: termsEn, ar: termsAr },
} satisfies Record<"privacy" | "terms", Record<Locale, LegalDoc>>;

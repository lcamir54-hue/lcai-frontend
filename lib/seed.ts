import type { Conversation } from "@/types/chat";

const welcomeAssistant = `یک پروژه هوش مصنوعی سازمانی معمولاً از پنج مرحله می‌گذرد:

۱. **کشف و نیازمندی‌ها**
مسئله، ذی‌نفعان، شاخص‌های موفقیت و محدودیت‌هایی را که جابه‌جا نمی‌شوند روشن کنید.

۲. **آماده‌سازی داده**
منابع، مسائل کیفیت، قواعد دسترسی و حداقل مجموعه داده لازم برای یک نسخه اول معتبر را مشخص کنید.

۳. **معماری و امنیت**
جای دستیار در زیرساخت فعلی، نحوه احراز هویت و نقاطی که تأیید انسانی لازم است را تعیین کنید.

۴. **توسعه نسخه اولیه**
یک جریان کاری با ارزش بالا بسازید که از ابتدا ارزیابی، بازخورد و مالک مشخص داشته باشد.

۵. **ارزیابی و استقرار**
کیفیت را روی کارهای واقعی بسنجید، کاربران را آماده کنید و فقط پس از اعتماد به مسیر اول، دامنه را گسترش دهید.

اگر مفید است، می‌توانم این را به زمان‌بندی، جدول مسئولیت یا خلاصه‌ای یک‌صفحه‌ای تبدیل کنم.`;

function isoDaysAgo(days: number, hours = 10): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hours, 18, 0, 0);
  return date.toISOString();
}

export const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-welcome",
    title: "به LCAI خوش آمدید",
    createdAt: isoDaysAgo(0, 9),
    updatedAt: isoDaysAgo(0, 9),
    titleLocked: true,
    messages: [
      {
        id: "msg-welcome-user",
        role: "user",
        content: "کمک کن فازهای اصلی یک پروژه هوش مصنوعی سازمانی را منظم کنم.",
        createdAt: isoDaysAgo(0, 9),
      },
      {
        id: "msg-welcome-assistant",
        role: "assistant",
        content: welcomeAssistant,
        createdAt: isoDaysAgo(0, 9),
      },
    ],
  },
  {
    id: "conv-launch",
    title: "راهبرد عرضه محصول",
    createdAt: isoDaysAgo(1, 14),
    updatedAt: isoDaysAgo(1, 14),
    titleLocked: true,
    messages: [
      {
        id: "msg-launch-user",
        role: "user",
        content: "برای عرضه یک دستیار هوش مصنوعی داخلی، یک برنامه راه‌اندازی طراحی کن.",
        createdAt: isoDaysAgo(1, 14),
      },
      {
        id: "msg-launch-assistant",
        role: "assistant",
        content:
          "عرضه را محدود شروع کنید: یک تیم، یک جریان کاری و یک شاخص موفقیت.\n\n۱. **جایگاه** — LCAI را شریک کار برای خلاصه، تحلیل و پیش‌نویس معرفی کنید.\n۲. **مخاطب** — از تیم‌های عملیات و محصول که زیاد می‌نویسند آغاز کنید.\n۳. **اثبات** — سه نمونه واقعی قبل و بعد از کار را نشان دهید.\n۴. **استقرار** — آزمایش کنید، پرامپت و سیاست را اصلاح کنید، سپس گسترش دهید.\n\nدر گام بعد می‌توانم روایت عرضه یا پرسش‌های متداول داخلی را بنویسم.",
        createdAt: isoDaysAgo(1, 14),
      },
    ],
  },
  {
    id: "conv-feedback",
    title: "تحلیل بازخورد مشتریان",
    createdAt: isoDaysAgo(2, 11),
    updatedAt: isoDaysAgo(2, 11),
    titleLocked: true,
    messages: [
      {
        id: "msg-feedback-user",
        role: "user",
        content: "چطور یک مجموعه بازخورد مشتری را تحلیل کنم؟",
        createdAt: isoDaysAgo(2, 11),
      },
      {
        id: "msg-feedback-assistant",
        role: "assistant",
        content:
          "نظرها را بر اساس کاری که مشتری می‌خواست تمام کند گروه‌بندی کنید، نه بر اساس بخش محصول.\n\n- تکرار: چه چیزی بیشتر دیده می‌شود\n- شدت: کجا ناامیدی یا رضایت قوی‌تر است\n- اصطکاک: کدام مرحله مدام می‌شکند\n- نتیجه خواسته‌شده: مشتری به‌جای آن چه می‌خواست\n\nسپس یک خلاصه یک‌صفحه‌ای بنویسید: یافته اصلی، شواهد، محدودیت و اقدام پیشنهادی.",
        createdAt: isoDaysAgo(2, 11),
      },
    ],
  },
  {
    id: "conv-sales",
    title: "خلاصه فروش فصلی",
    createdAt: isoDaysAgo(3, 16),
    updatedAt: isoDaysAgo(3, 16),
    titleLocked: true,
    messages: [
      {
        id: "msg-sales-user",
        role: "user",
        content: "ساختار یک مرور فروش فصلی را خلاصه کن.",
        createdAt: isoDaysAgo(3, 16),
      },
      {
        id: "msg-sales-assistant",
        role: "assistant",
        content:
          "خلاصه را برای تصمیم‌گیری آماده کنید:\n\n۱. درآمد در برابر برنامه\n۲. کیفیت قیف فروش، نه فقط حجم\n۳. بردها و باخت‌ها همراه با علت\n۴. ریسک تمرکز\n۵. تنها تغییری که باید فصل بعد رخ دهد\n\nاول نتیجه را بگویید، بعد شواهد را.",
        createdAt: isoDaysAgo(3, 16),
      },
    ],
  },
  {
    id: "conv-website",
    title: "بازبینی محتوای وب‌سایت",
    createdAt: isoDaysAgo(4, 12),
    updatedAt: isoDaysAgo(4, 12),
    titleLocked: true,
    messages: [
      {
        id: "msg-website-user",
        role: "user",
        content: "در بازبینی محتوای وب‌سایت به چه چیزهایی توجه کنم؟",
        createdAt: isoDaysAgo(4, 12),
      },
      {
        id: "msg-website-assistant",
        role: "assistant",
        content:
          "سایت را به‌صورت زنجیره‌ای از وعده‌ها بخوانید.\n\n- آیا صفحه اول مشخص می‌کند برای چه کسی است؟\n- آیا هر صفحه یک درخواست دارد، نه چند درخواست؟\n- آیا ادعاها آن‌قدر مشخص‌اند که باورپذیر باشند؟\n- آیا صفحات پشتیبان همان ایده را با زبانی ضعیف‌تر تکرار می‌کنند؟\n\nمی‌توانم صفحه نخست، صفحه خدمات یا صفحه درباره را با لحنی آرام‌تر بازنویسی کنم.",
        createdAt: isoDaysAgo(4, 12),
      },
    ],
  },
  {
    id: "conv-knowledge",
    title: "برنامه‌ریزی پایگاه دانش",
    createdAt: isoDaysAgo(5, 15),
    updatedAt: isoDaysAgo(5, 15),
    titleLocked: true,
    messages: [
      {
        id: "msg-knowledge-user",
        role: "user",
        content: "برای تیم‌های داخلی یک پایگاه دانش برنامه‌ریزی کن.",
        createdAt: isoDaysAgo(5, 15),
      },
      {
        id: "msg-knowledge-assistant",
        role: "assistant",
        content:
          "اطراف سؤال‌های تکرارشونده سازماندهی کنید، نه واحدهای سازمانی.\n\n**مجموعه‌های اصلی**\n- نحوه کار ما\n- محصول و سیاست\n- گفتگو با مشتری\n- سوابق تصمیم\n\nهر مقاله به مالک، تاریخ آخرین بازبینی و یک پاسخ کوتاه در ابتدا نیاز دارد. LCAI می‌تواند این صفحات را پیش‌نویس، مقایسه و یکدست نگه دارد.",
        createdAt: isoDaysAgo(5, 15),
      },
    ],
  },
  {
    id: "conv-campaign",
    title: "ایده‌های کمپین بازاریابی",
    createdAt: isoDaysAgo(6, 13),
    updatedAt: isoDaysAgo(6, 13),
    titleLocked: true,
    messages: [
      {
        id: "msg-campaign-user",
        role: "user",
        content: "چند ایده کمپین بازاریابی برای یک دستیار هوش مصنوعی سازمانی بده.",
        createdAt: isoDaysAgo(6, 13),
      },
      {
        id: "msg-campaign-assistant",
        role: "assistant",
        content:
          "کار مفید را جلو بگذارید، نه تازگی را.\n\n۱. **خلاصه یک‌صفحه‌ای** — نشان دهید یک درخواست درهم چگونه به برنامه‌ای روشن تبدیل می‌شود.\n۲. **قبل و بعد نوشتار** — یک یادداشت سیاست، ایمیل فروش یا خلاصه پژوهش.\n۳. **حافظه تصمیم** — کمپین را حول آسان‌کردن استفاده دوباره از دانش سازمانی بسازید.\n\nلحن باید آرام، مشخص و عملیاتی بماند.",
        createdAt: isoDaysAgo(6, 13),
      },
    ],
  },
];

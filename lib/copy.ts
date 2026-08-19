export const copy = {
  brand: "LCAI",
  appDescription:
    "LCAI دستیار هوش مصنوعی سازمانی برای برنامه‌ریزی، نگارش و تحلیل است.",
  loading: "در حال بارگذاری LCAI",
  sidebar: "نوار کناری LCAI",
  primaryNav: "ناوبری اصلی",
  workspace: "فضای گفتگو",

  newChat: "گفتگوی جدید",
  library: "کتابخانه",
  settings: "تنظیمات",
  recentChats: "گفتگوهای اخیر",

  rename: "تغییر نام",
  delete: "حذف",
  cancel: "انصراف",
  reset: "بازنشانی",
  local: "محلی",

  userName: "کاربر LCAI",
  userInitials: "ک",
  workspaceLabel: "فضای کاری",

  collapseSidebar: "بستن نوار کناری",
  expandSidebar: "باز کردن نوار کناری",
  openSidebar: "باز کردن نوار کناری",
  closeSidebar: "بستن نوار کناری",
  renameConversation: "تغییر نام گفتگو",
  conversationActions: (title: string) => `عملیات گفتگو برای ${title}`,

  emptyHeading: "امروز چطور می‌توانم کمکتان کنم؟",
  emptyDescription:
    "سؤال بپرسید، ایده‌ها را بررسی کنید، اطلاعات را تحلیل کنید یا پروژه بعدی‌تان را با LCAI پیش ببرید.",

  composerLabel: "پیام برای LCAI",
  composerPlaceholder: "هر چه می‌خواهید از LCAI بپرسید...",
  sendMessage: "ارسال پیام",
  addTemplate: "افزودن قالب نوشتاری",
  brainstorm: "ایده‌پردازی",
  webSearch: "جستجوی وب",
  code: "کدنویسی",

  copy: "رونوشت",
  copied: "کپی شد",
  regenerate: "بازتولید",
  thumbsUp: "مفید بود",
  thumbsDown: "مفید نبود",
  typing: "LCAI در حال نوشتن است",
  thinking: "در حال فکر کردن",
  usingTools: "در حال استفاده از ابزارها",
  generating: "در حال نوشتن",

  copiedClipboard: "در حافظه کپی شد",
  copyFailed: "کپی انجام نشد",
  conversationsRestored: "گفتگوها بازیابی شد",

  deleteTitle: "گفتگو حذف شود؟",
  deleteDescription: (title: string) =>
    `«${title}» از این دستگاه حذف می‌شود. این کار قابل بازگشت نیست.`,
  resetTitle: "گفتگوها بازنشانی شوند؟",
  resetDescription:
    "گفتگوهای نمونه LCAI بازیابی می‌شوند و گفتگوهای ذخیره‌شده در این مرورگر حذف خواهند شد.",

  libraryHeading: "نقاط شروع ذخیره‌شده",
  libraryBody:
    "سی‌ودو الگوی خلاصه و نوشتاری آماده. یکی را انتخاب کنید تا در کادر پیام قرار بگیرد.",
  libraryPrompt: (item: string) =>
    `از این نقطه شروع ذخیره‌شده استفاده کن: «${item}». یک نسخه کامل و کاربردی بنویس.`,

  settingsHeading: "ترجیحات فضای کاری",
  settingsBody:
    "این گزینه‌ها فقط روی همین دستگاه ذخیره می‌شوند. در این نسخه، LCAI حساب کاربری یا سرور خارجی ندارد.",
  profile: "نمایه",
  conversations: "گفتگوها",
  conversationsHelp:
    "گفتگوهای نمونه اولیه LCAI را در این مرورگر بازیابی کن.",
} as const;

export const navItems = [
  { id: "new-chat" as const, label: copy.newChat },
  { id: "library" as const, label: copy.library, badge: "۳۲" },
  { id: "settings" as const, label: copy.settings },
];

export const emptySuggestions = [
  {
    label: "یک برنامه پروژه بساز",
    prompt: "یک برنامه پروژه برایم بنویس",
  },
  {
    label: "داده‌های کسب‌وکار را تحلیل کن",
    prompt: "داده‌های کسب‌وکار را تحلیل کن",
  },
  {
    label: "یک سند را خلاصه کن",
    prompt: "یک سند را خلاصه کن",
  },
  {
    label: "ایده‌های تازه مطرح کن",
    prompt: "ایده‌های تازه مطرح کن",
  },
];

export const composerTemplates = [
  {
    label: "ساختار نوشته",
    text: "یک ساختار روشن با عنوان، سه بخش و یک توصیه پایانی بنویس.",
  },
  {
    label: "صورت‌جلسه",
    text: "این یادداشت‌ها را به تصمیم‌ها، مسئولان و گام‌های بعدی تبدیل کن:\n",
  },
  {
    label: "اقدامات بعدی",
    text: "اقدامات را همراه با مسئول و موعد پیشنهادی استخراج کن:\n",
  },
];

export const libraryItems = [
  "قالب خلاصه مدیریتی",
  "ساختار روایت عرضه محصول",
  "جمع‌بندی مصاحبه با مشتری",
  "ساختار مرور فصلی",
  "نقد محتوای صفحه نخست",
  "معماری اطلاعات پایگاه دانش",
  "ماتریس پیام کمپین",
  "شروع ثبت ریسک‌ها",
  "جدول مسئولیت برای استقرار هوش مصنوعی",
  "پرامپت پیش‌نویس سیاست",
  "از صورت‌جلسه تا تصمیم",
  "طرح اولیه نیازمندی محصول",
  "گزارش ذی‌نفعان",
  "راهنمای لحن پشتیبانی",
  "چک‌لیست محدودیت‌های پژوهش",
  "سند تصمیم معماری",
  "پرسش‌های کیفیت داده",
  "توالی آشنایی اولیه",
  "پیش‌نویس پرسش‌های متداول داخلی",
  "چارچوب ارزیابی کیفیت",
  "یادداشت مقایسه تأمین‌کنندگان",
  "دستور کار کارگاه",
  "یادداشت مدیریت تغییر",
  "یادآوری‌های سبک نوشتاری",
  "ساختار گزارش هیئت‌مدیره",
  "قالب بررسی رخداد",
  "برگه امتیاز جذب نیرو",
  "روش فهرست‌برداری محتوا",
  "پرامپت اصلاح اهداف",
  "بازنویسی مسیر مشتری",
  "پرسش‌های مرور امنیت",
  "برنامه نود روز نخست",
];

export function toFaDigits(value: string | number): string {
  const map = "۰۱۲۳۴۵۶۷۸۹";
  return String(value).replace(/\d/g, (digit) => map[Number(digit)]);
}

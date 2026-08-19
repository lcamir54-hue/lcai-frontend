import type { ChatStreamEvent, ComposerMode } from "@/types/chat";

function includesAny(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}

function codeReply(): string {
  return `نسخه اول را کوچک، تایپ‌شده و قابل جایگزینی نگه دارید.

\`\`\`ts
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function sendMessage(messages: ChatMessage[]): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error("دستیار نتوانست این درخواست را کامل کند.");
  }

  const data = (await response.json()) as { content: string };
  return data.content;
}
\`\`\`

گام‌های پیشنهادی بعد:

۱. رابط کاربری را از ارائه‌دهنده مدل جدا نگه دارید.
۲. کل گفتگو را بفرستید، نه فقط آخرین پیام.
۳. پیش از گسترش قابلیت‌ها، نمونه‌های ارزیابی اضافه کنید.

اگر بخواهید، بدنه درخواست، حالت‌های خطا یا رابط TypeScript برای جریان جریانی را هم می‌نویسم.`;
}

function planReply(): string {
  return `این یک برنامه عملی است که اولین نسخه را بیش از حد پیچیده نمی‌کند.

## ۱. کار را قاب‌بندی کنید
- تصمیمی را که این پروژه باید بهتر کند نام ببرید.
- کاربران، محدودیت‌ها و یک شاخص موفقیت را مشخص کنید.
- پیش از بحث ابزار، یک خلاصه یک‌صفحه‌ای بنویسید.

## ۲. برش اول را شکل دهید
- یک جریان کاری با ارزش قابل‌مشاهده انتخاب کنید.
- ورودی، خروجی، مراحل بازبینی و رفتار جایگزین را تعریف کنید.
- دامنه را آن‌قدر محدود نگه دارید که در یک دوره قابل تحویل باشد.

## ۳. توالی تحویل
۱. کشف و نیازمندی‌ها
۲. بررسی داده و سیاست
۳. طراحی رابط و ارزیابی
۴. ساخت نسخه اولیه
۵. استقرار هدایت‌شده

اگر اندازه تیم و موعد را بگویید، آن را به برنامه هفتگی تبدیل می‌کنم.`;
}

function projectReply(): string {
  return `پروژه هوش مصنوعی سازمانی را مثل یک محصول ببینید، نه آزمایش مدل.

**کشف و نیازمندی‌ها**
مسئله، ذی‌نفعان، جریان فعلی کار و معنای عملی «بهتر شدن» را روشن کنید.

**آماده‌سازی داده**
منابع، کیفیت، دسترسی، نگهداری و حداقل داده لازم برای نسخه اول معتبر را مشخص کنید.

**معماری و امنیت**
جای دستیار در پشته، هویت کاربران و اقداماتی که به تأیید انسانی نیاز دارند را تعیین کنید.

**توسعه نسخه اولیه**
یک مسیر با ارزش بالا بسازید که ردیابی، بازخورد و مالک مشخص داشته باشد.

**ارزیابی و استقرار**
کیفیت را روی کارهای واقعی بسنجید، کاربران را آموزش دهید و فقط پس از اعتماد به مسیر اول گسترش دهید.

می‌توانم این را به جدول مسئولیت، فهرست ریسک یا برنامه ۳۰-۶۰-۹۰ روزه تبدیل کنم.`;
}

function dataReply(): string {
  return `مرور داده وقتی مفید است که از تصمیم شروع شود، نه از داشبورد.

۱. **سؤال** — پس از دیدن این داده، فرد باید بتواند چه تصمیمی بگیرد؟
۲. **منابع** — کدام سامانه‌ها معتبر، تأخیردار یا ناقص‌اند؟
۳. **کیفیت** — خلأ، تکرار، برچسب ناسازگار یا محدودیت دسترسی کجاست؟
۴. **تفسیر** — به کدام شاخص می‌توان اعتماد کرد و کدام نیاز به قید دارد؟
۵. **اقدام** — اگر عدد تغییر کند، چه چیزی باید عوض شود؟

یک خلاصه فشرده معمولاً شامل این‌هاست:

- یافته اصلی
- شواهد پشت آن
- محدودیت
- اقدام پیشنهادی بعدی

شرح مجموعه داده یا سؤال را بفرستید تا تحلیل را حول همان بسازم.`;
}

function marketingReply(): string {
  return `کمپین وقتی قوی می‌شود که پیام محدود و اثبات مشخص باشد.

## جایگاه
با نتیجه‌ای شروع کنید که مخاطب از قبل می‌خواهد، سپس بگویید چرا این روش از جایگزین فعلی قابل‌اعتمادتر است.

## روایت
- **مخاطب:** کسی که مسئله را روشن‌تر حس می‌کند
- **وعده:** تغییری که باید انتظار داشته باشد
- **اثبات:** شواهد، فرایند یا محدودیتی که وعده را باورپذیر می‌کند
- **درخواست:** یک گام بعدی، نه پنج گام

## ترکیب کانال
۱. خلاصه داخلی کوتاه برای ذی‌نفعان
۲. یک توضیح اصلی برای وب‌سایت یا پایگاه دانش
۳. یادداشت‌های کوتاه پشتیبان برای فروش، پشتیبانی یا رهبری

اگر پیشنهاد و مخاطب را بگویید، روایت کمپین را می‌نویسم.`;
}

function summaryReply(): string {
  return `خلاصه خوب باید قضاوت را حفظ کند، نه فقط متن را کوتاه کند.

**نکته اصلی**
تصمیم، یافته یا درخواست را در یک یا دو جمله بگویید.

**نکات پشتیبان**
- حقایقی که رفتار فرد را عوض می‌کنند
- محدودیت‌ها یا ریسک‌هایی که باید دیده بمانند
- سؤال‌های بازی که هنوز مالک دارند

**گام بعدی پیشنهادی**
با یک اقدام، موعد در صورت وجود، و مسئول آن تمام کنید.

سند، یادداشت یا گفتگو را بفرستید تا نسخه مدیریتی فشرده‌تری برگردانم.`;
}

function brainstormReply(): string {
  return `اول فضا را باز می‌کنیم، بعد آن را قابل‌استفاده می‌کنیم.

**نقاط شروع**
- مسئله را به‌عنوان کاری که باید انجام شود ببینید، نه فهرست قابلیت.
- دنبال اصطکاکی بگردید که افراد همین حالا دورش می‌زنند.
- بپرسید چه چیزی اگر کار کند، به‌طرز غافلگیرکننده‌ای ساده به نظر می‌رسد.

**مجموعه ایده**
۱. تجربه هدایت‌شده اول که در یک نشست یک خروجی مفید می‌سازد.
۲. کتابخانه‌ای از خلاصه‌های قابل استفاده برای سؤال‌های تکراری سازمان.
۳. حالت بازبینی که پیش‌نویس را از نظر سیاست، لحن و کامل بودن نقد کند.
۴. خلاصه هفتگی که یادداشت‌های پراکنده را به تصمیم تبدیل کند.
۵. آیین ارزیابی سبک تا کیفیت به‌مرور افت نکند.

یک جهت را انتخاب کنید تا آن را به گزینه‌ها، بده‌بستان‌ها و پرامپت نمونه اول گسترش دهم.`;
}

function searchReply(): string {
  return `در این نسخه محلی نمی‌توانم وب زنده را بگردم، اما پژوهش را طوری ساختاربندی می‌کنم که جستجوی بعدی سریع‌تر شود.

**چه چیزی باید راستی‌آزمایی شود**
- واقعیت‌ها، تاریخ‌ها و منابع نام‌دار فعلی
- رویکردهای رقیب و محدودیت‌هایشان
- پیامدهای سیاست، امنیت یا عملیات

**خلاصه کاری**
۱. سؤال پشت سؤال
۲. چه چیزی باید درست باشد تا توصیه معتبر بماند
۳. منابع اصلی احتمالاً کجا هستند
۴. پاسخ باید چگونه به ذی‌نفع ارائه شود

موضوع و تصمیمی را که این پژوهش باید پشتیبانی کند بگویید تا یک طرح پژوهش آماده منبع بنویسم.`;
}

function defaultReply(userText: string): string {
  const preview = userText.replace(/\s+/g, " ").trim();
  const clipped =
    preview.length > 140 ? `${preview.slice(0, 140).trimEnd()}…` : preview;

  return `می‌توانم این موضوع را ساخت‌یافته‌تر پیش ببرم.

پرسیدید: «${clipped}»

گام بعدی معمولاً این محورها را پوشش می‌دهد:

۱. **نیت** — نتیجه‌ای که از این گفتگو می‌خواهید
۲. **بافت** — محدودیت‌ها، مخاطب و آنچه از قبل وجود دارد
۳. **شکل** — برنامه، پیش‌نویس، تحلیل یا نقد
۴. **خروجی بعدی** — سند یا تصمیم مشخصی که باید تولید شود

بگویید کدام را اول می‌خواهید، یا جزئیات بیشتری اضافه کنید تا پاسخ کامل را بنویسم.`;
}

export function generateMockReply(
  userText: string,
  mode: ComposerMode = "default",
): string {
  const text = userText.toLowerCase();

  if (
    mode === "code" ||
    includesAny(text, ["code", "function", "typescript", "api", "component", "کد", "کدنویسی", "برنامه‌نویسی"])
  ) {
    return codeReply();
  }

  if (mode === "web-search") {
    return searchReply();
  }

  if (
    mode === "brainstorm" ||
    includesAny(text, ["brainstorm", "ideas", "ideate", "ایده", "ایده‌پردازی", "طوفان فکری"])
  ) {
    return brainstormReply();
  }

  if (includesAny(text, ["plan", "roadmap", "phases", "timeline", "برنامه", "طرح", "نقشه راه", "فاز"])) {
    return planReply();
  }

  if (includesAny(text, ["project", "mvp", "rollout", "organizational", "پروژه"])) {
    return projectReply();
  }

  if (includesAny(text, ["data", "metric", "analytics", "analysis", "داده", "تحلیل"])) {
    return dataReply();
  }

  if (includesAny(text, ["marketing", "campaign", "positioning", "audience", "بازاریابی", "کمپین"])) {
    return marketingReply();
  }

  if (includesAny(text, ["summary", "summarize", "brief", "tldr", "خلاصه", "جمع‌بندی"])) {
    return summaryReply();
  }

  return defaultReply(userText);
}

export function generateAlternateReply(
  userText: string,
  mode: ComposerMode = "default",
): string {
  return `${generateMockReply(userText, mode)}

این پاسخ را از همان درخواست بازتولید کردم تا لحن و ساختار را مقایسه کنید. اگر نسخه کوتاه‌تر، رسمی‌تر یا عملیاتی‌تری می‌خواهید، بگویید.`;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function chunkText(text: string, reducedMotion: boolean): string[] {
  if (reducedMotion) {
    const size = 80;
    const chunks: string[] = [];
    for (let index = 0; index < text.length; index += size) {
      chunks.push(text.slice(index, index + size));
    }
    return chunks;
  }

  const pieces = text.split(/(\s+)/);
  const chunks: string[] = [];
  for (const piece of pieces) {
    if (piece.length <= 10) {
      chunks.push(piece);
    } else {
      for (let index = 0; index < piece.length; index += 7) {
        chunks.push(piece.slice(index, index + 7));
      }
    }
  }
  return chunks.filter((chunk) => chunk.length > 0);
}

function selectMockTools(userText: string, mode: ComposerMode) {
  const text = userText.toLowerCase();

  if (
    mode === "web-search" ||
    includesAny(text, ["search", "جستجو", "وب"])
  ) {
    return [
      {
        id: "tool-search",
        name: "جستجوی وب",
        running: "در حال جستجوی منابع مرتبط...",
        done: "منابع مرتبط آماده شد.",
      },
    ];
  }

  if (
    mode === "code" ||
    includesAny(text, ["code", "کد", "کدنویسی", "برنامه‌نویسی", "api"])
  ) {
    return [
      {
        id: "tool-code",
        name: "بررسی کد",
        running: "در حال خواندن ساختار پیشنهادی...",
        done: "الگوی پیاده‌سازی آماده شد.",
      },
    ];
  }

  if (
    mode === "brainstorm" ||
    includesAny(text, ["ایده", "ایده‌پردازی", "brainstorm"])
  ) {
    return [
      {
        id: "tool-ideas",
        name: "کاوش ایده‌ها",
        running: "در حال گسترش گزینه‌های ممکن...",
        done: "چند مسیر مشخص استخراج شد.",
      },
    ];
  }

  if (includesAny(text, ["data", "داده", "تحلیل", "analysis"])) {
    return [
      {
        id: "tool-data",
        name: "تحلیل داده",
        running: "در حال بررسی الگوها و محدودیت‌ها...",
        done: "یافته‌های اصلی جمع‌بندی شد.",
      },
    ];
  }

  return [
    {
      id: "tool-context",
      name: "مرور زمینه",
      running: "در حال بازیابی یادداشت‌های مرتبط...",
      done: "زمینه گفتگو آماده شد.",
    },
  ];
}

export async function* streamMockReply(
  userText: string,
  mode: ComposerMode = "default",
  regenerate = false,
): AsyncGenerator<ChatStreamEvent> {
  const reducedMotion = prefersReducedMotion();
  const reply = regenerate
    ? generateAlternateReply(userText, mode)
    : generateMockReply(userText, mode);
  const tools = selectMockTools(userText, mode);

  yield { type: "status", status: "thinking" };
  await wait(reducedMotion ? 80 : 700);

  yield { type: "status", status: "using-tools" };

  for (const tool of tools) {
    yield {
      type: "tool_start",
      id: tool.id,
      name: tool.name,
      detail: tool.running,
    };
    await wait(reducedMotion ? 60 : 650);
    yield {
      type: "tool_end",
      id: tool.id,
      detail: tool.done,
    };
    await wait(reducedMotion ? 40 : 180);
  }

  yield { type: "status", status: "generating" };

  for (const chunk of chunkText(reply, reducedMotion)) {
    yield { type: "text_delta", delta: chunk };
    if (!reducedMotion) {
      await wait(chunk.trim() === "" ? 8 : 16);
    }
  }

  yield { type: "done" };
}

import type { Metadata, Viewport } from "next";
import { Noto_Naskh_Arabic, Vazirmatn } from "next/font/google";
import { copy } from "@/lib/copy";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: copy.brand,
  description: copy.appDescription,
  applicationName: copy.brand,
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><rect width='48' height='48' rx='12' fill='%2355595A'/><path d='M16 32V16h6.2c4.4 0 7.2 2.5 7.2 6.4 0 3.9-2.8 6.4-7.2 6.4H21v3.2H16zm5-8.7h1c1.8 0 2.9-1 2.9-2.5S23.8 18.3 22 18.3h-1v5z' fill='%23F4F2EF'/></svg>",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F6F3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${notoNaskh.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title: "Abricos Design — проектирование коммерческих пространств",
    description:
      "Концепции, дизайн-проекты, рабочая документация и сопровождение реализации общественных и коммерческих интерьеров.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Abricos Design — пространства для бизнеса",
      description:
        "Проектирование, дизайн и сопровождение реализации общественных и коммерческих интерьеров.",
      type: "website",
      locale: "ru_RU",
      images: [
        {
          url: socialImage,
          width: 1732,
          height: 908,
          alt: "Abricos Design — пространства для бизнеса",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Abricos Design — пространства для бизнеса",
      description:
        "Проектирование, дизайн и сопровождение реализации общественных и коммерческих интерьеров.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  );
}

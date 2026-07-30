import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og-v2.png", baseUrl).toString();

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
          width: 1731,
          height: 909,
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
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Портфолио — Abricos Design",
  description:
    "Коммерческие интерьеры, торговые точки, выставочные стенды и брендинг пространств в портфолио Abricos Design.",
};

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

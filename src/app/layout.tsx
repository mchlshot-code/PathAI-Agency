import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PaTH Digital Studio — Software for brands and businesses",
  description: "PaTH Digital Studio designs and builds MVPs, websites, web apps, mobile apps and AI workflows.",
  openGraph: {
    title: "PaTH Digital Studio",
    description: "MVPs, websites, web apps, mobile apps and AI workflows.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

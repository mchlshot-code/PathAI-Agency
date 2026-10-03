import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PaTH Digital Studio",
  description: "PaTH Digital Studio designs and builds MVPs, websites, web apps and mobile apps for brands and companies.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

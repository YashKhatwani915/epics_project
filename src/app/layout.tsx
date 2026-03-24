import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HIGHER  — Jobs for Skilled & Unskilled Workers",
  description: "Find local job opportunities. Technical skilled roles and unskilled work near you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

import './commander.css';
import type { Metadata } from "next";
import "./globals.css";
import "./game.css";
import "./campaign.css";
import "./reference.css";
import "./science-theme.css";

export const metadata: Metadata = {
  title: "OmicsPath · Learn bioinformatics",
  description: "Build bioinformatics foundations through guided lessons, practical analysis and assessed skills.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

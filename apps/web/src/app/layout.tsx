import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Little Disciples",
  description: "Kids Sunday School curriculum — Teach, Engage, Equip, Impact",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans">{children}</body>
    </html>
  );
}

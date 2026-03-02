import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rajat Portfolio",
  description: "AI-powered developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

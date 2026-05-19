import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Halal Haram Ratio",
  description: "Every Muslim has a Halal Haram Ratio. Find out yours.",
  openGraph: {
    title: "Halal Haram Ratio",
    description: "Every Muslim has a Halal Haram Ratio. Find out yours.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#08080f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Teer Khela with AI - Accurate Predictions",
  description: "Get AI-powered Teer predictions for Bhutan, Shillong, Khanapara, and Juwai Teer. Advanced algorithms for accurate results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

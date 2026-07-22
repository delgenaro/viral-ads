import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ViralAds",
  description: "Crie anúncios em vídeo com IA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0c0c0f] text-white min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}

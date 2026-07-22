import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "ViralAds - Crie anúncios com IA para TikTok",
  description: "Crie vídeos curtos de 10s com avatares IA para anúncios de marketing no TikTok",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-violet-500/30">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

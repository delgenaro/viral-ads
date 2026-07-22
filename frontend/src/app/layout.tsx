import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ViralAds - Crie anúncios com IA",
  description: "Crie anúncios em vídeo de 10s com avatares IA para TikTok",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col">
        <header className="border-b border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="w-7 h-7 rounded bg-violet-600 text-xs flex items-center justify-center">V</span>
              ViralAds
            </Link>
            <nav className="flex items-center gap-4 text-sm text-zinc-400">
              <Link href="/criar" className="hover:text-zinc-200">Criar</Link>
              <Link href="/avatares" className="hover:text-zinc-200">Avatares</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-800 text-zinc-600 text-xs py-4 text-center">
          ViralAds — IA para anúncios
        </footer>
      </body>
    </html>
  );
}

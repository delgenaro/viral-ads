import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ViralAds",
  description: "Crie anúncios em vídeo com IA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col">
        <header className="border-b border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 h-12 flex items-center gap-2 text-sm">
            <span className="w-6 h-6 rounded bg-violet-600 text-xs flex items-center justify-center font-bold">V</span>
            <span className="font-semibold">ViralAds</span>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

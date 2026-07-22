import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-24 pb-16 text-center">
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Crie anúncios em vídeo com
        <br />
        <span className="text-violet-400">avatares de IA</span>
      </h1>
      <p className="mt-4 text-zinc-400 max-w-lg mx-auto">
        Cole o link de um produto, escolha um avatar e gere um vídeo curto para TikTok em segundos.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Link href="/criar" className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Criar anúncio
        </Link>
        <Link href="/avatares" className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 px-6 py-3 rounded-lg font-medium transition-colors">
          Avatares
        </Link>
      </div>
    </div>
  );
}

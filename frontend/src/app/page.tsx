import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <section className="max-w-4xl mx-auto px-4 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-900/30 border border-violet-700/30 text-violet-300 text-xs mb-6">
          IA para marketing no TikTok
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
          Crie anúncios em vídeo
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            com avatares IA
          </span>
        </h1>
        <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
          Transforme fotos de produtos em vídeos de 10 segundos com avatares realistas.
          Pronto para TikTok, Instagram Reels e YouTube Shorts.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/criar"
            className="bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-xl font-medium text-base transition-colors"
          >
            Criar anúncio grátis
          </Link>
          <Link
            href="/templates"
            className="border border-zinc-700 hover:border-zinc-500 px-6 py-3 rounded-xl font-medium text-base transition-colors"
          >
            Ver templates
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Avatar IA realista",
              desc: "Escolha um avatar ou crie a partir de uma foto. O avatar fala e gesticula como uma pessoa real.",
              icon: "🤖",
            },
            {
              title: "URL do produto → vídeo",
              desc: "Cole o link do seu produto e a IA gera automaticamente um anúncio curto e persuasivo.",
              icon: "🔗",
            },
            {
              title: "Clone de anúncios virais",
              desc: "Passe o link de um TikTok viral e recrie a estrutura com seu próprio produto.",
              icon: "🔄",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition-colors"
            >
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-8">Como funciona</h2>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          {[
            { step: "1", label: "Escolha um template" },
            { step: "2", label: "Adicione seu produto" },
            { step: "3", label: "Selecione um avatar" },
            { step: "4", label: "Gere e publique" },
          ].map((s) => (
            <div key={s.step} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center font-bold text-lg">
                {s.step}
              </div>
              <span className="text-sm text-zinc-400">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

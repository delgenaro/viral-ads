import Link from "next/link";
import { ArrowRight, Sparkles, Link2, Repeat2, Zap, Smartphone, Globe, Star } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Avatar IA realista",
    desc: "Crie avatares que falam e gesticulam como pessoas reais a partir de uma única foto. Perfeito para UGC Ads.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Link2,
    title: "URL do produto → Vídeo",
    desc: "Cole o link do seu produto e a IA gera automaticamente um anúncio curto e persuasivo em segundos.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Repeat2,
    title: "Clone de anúncios virais",
    desc: "Passe o link de um TikTok viral e recrie a estrutura de sucesso com seu próprio produto.",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Geração em 10 segundos",
    desc: "Vídeos otimizados para TikTok, Reels e Shorts. Prontos para publicar sem edição adicional.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Smartphone,
    title: "Formato vertical 9:16",
    desc: "Tudo já no formato certo para redes sociais. Sem cortes, sem ajustes, sem estresse.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Globe,
    title: "Multilíngue",
    desc: "Avatares que falam português, inglês, espanhol e mais. Alcance mercados globais.",
    gradient: "from-rose-500 to-red-500",
  },
];

const steps = [
  { num: "01", label: "Escolha um template ou modo", desc: "URL do produto, foto ou clone de viral" },
  { num: "02", label: "Adicione seu produto", desc: "Cole o link, image ou descreva seu produto" },
  { num: "03", label: "Selecione um avatar", desc: "Escolha ou crie um avatar personalizado" },
  { num: "04", label: "Gere e publique", desc: "Vídeo pronto em segundos para TikTok/Reels" },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.12),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(217,70,239,0.08),transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto px-4 pt-28 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-300 text-xs font-medium mb-8 animate-fade-in">
            <Sparkles size={14} /> IA para marketing no TikTok
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] animate-slide-up">
            Crie anúncios em vídeo
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              com avatares IA
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-1">
            Transforme fotos de produtos em vídeos de 10 segundos com avatares realistas.
            Pronto para TikTok, Instagram Reels e YouTube Shorts.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap animate-slide-up delay-2">
            <Link href="/criar" className="group bg-violet-600 hover:bg-violet-500 active:scale-95 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all shadow-xl shadow-violet-600/25 hover:shadow-violet-500/40 flex items-center gap-2">
              Criar anúncio grátis <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/templates" className="glass hover:border-violet-500/30 text-zinc-300 px-8 py-4 rounded-xl font-medium text-base transition-all flex items-center gap-2">
              Ver templates <Star size={16} />
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto text-center animate-fade-in delay-4">
            {[
              { value: "10s", label: "de geração" },
              { value: "100%", label: "automático" },
              { value: "Grátis", label: "para começar" },
            ].map((s) => (
              <div key={s.value}>
                <div className="text-2xl font-bold text-violet-300">{s.value}</div>
                <div className="text-xs text-zinc-600 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Tudo que você precisa</h2>
          <p className="text-zinc-500 mt-3 max-w-lg mx-auto">Crie anúncios profissionais sem equipe, sem câmera, sem edição.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="glass rounded-2xl p-6 hover:translate-y-[-2px] transition-all duration-300 group" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 shadow-lg transition-transform group-hover:scale-110 duration-300`}>
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.06),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 py-24">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Como funciona</h2>
            <p className="text-zinc-500 mt-3">4 passos simples para criar seu primeiro anúncio</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className="text-center group">
                <div className="relative inline-flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-lg font-bold shadow-lg shadow-violet-600/20 group-hover:scale-105 transition-transform">
                    {s.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 w-[calc(100%-4rem)] h-px bg-gradient-to-r from-violet-500/40 to-transparent" />
                  )}
                </div>
                <h4 className="font-semibold text-sm mb-1">{s.label}</h4>
                <p className="text-xs text-zinc-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="glass rounded-3xl p-10 md:p-14 border-violet-500/10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Pronto para começar?</h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">Gere seu primeiro anúncio em segundos. Sem cartão de crédito.</p>
          <Link href="/criar" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 active:scale-95 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-xl shadow-violet-600/25">
            Criar anúncio grátis <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

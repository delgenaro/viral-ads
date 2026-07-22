"use client";

import { useState, useEffect } from "react";
import { Clock, ArrowRight, Film, Sparkles, ShoppingBag, MessageCircle, BarChart3, Mic } from "lucide-react";
import Link from "next/link";

const categoryIcons: Record<string, typeof Film> = {
  produto: ShoppingBag, ugc: MessageCircle, demonstracao: BarChart3, promocao: Sparkles, avatar: Mic, narrativa: Film,
};
const categoryGradients: Record<string, string> = {
  produto: "from-blue-500 to-cyan-500", ugc: "from-fuchsia-500 to-pink-500", demonstracao: "from-emerald-500 to-teal-500",
  promocao: "from-amber-500 to-orange-500", avatar: "from-violet-500 to-purple-500", narrativa: "from-rose-500 to-red-500",
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("/api/templates/").then(r => r.json()).then(setTemplates).catch(() => {});
  }, []);

  const cats = [...new Set(templates.map(t => t.category))];
  const filtered = filter ? templates.filter(t => t.category === filter) : templates;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Templates de anúncios</h1>
        <p className="text-sm text-zinc-500 mt-1">Comece com um formato pronto e personalize com seu produto</p>
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        <button onClick={() => setFilter("")} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${!filter ? "bg-violet-600 text-white" : "glass hover:border-violet-500/20 text-zinc-400"}`}>Todos</button>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition-all ${filter === c ? "bg-violet-600 text-white" : "glass hover:border-violet-500/20 text-zinc-400"}`}>{c}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-14 text-center">
          <Film size={32} className="text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-500">Nenhum template encontrado</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tpl, i) => {
            const Icon = categoryIcons[tpl.category] || Film;
            const grad = categoryGradients[tpl.category] || "from-violet-500 to-purple-500";
            return (
              <div key={tpl.id} className="group glass rounded-2xl overflow-hidden hover:translate-y-[-2px] transition-all duration-300" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className={`aspect-[9/14] bg-gradient-to-br ${grad} flex flex-col items-center justify-center gap-3 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <Icon size={40} className="text-white/80 relative z-10" />
                  <span className="text-white/60 text-xs font-medium relative z-10">{tpl.category}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{tpl.name}</h3>
                    <span className="flex items-center gap-1 text-xs text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded-full"><Clock size={12} /> {tpl.duration_seconds}s</span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-4">{tpl.description}</p>
                  <Link href="/criar" className="flex items-center justify-between text-sm text-violet-400 hover:text-violet-300 font-medium group/link">
                    Usar template <ArrowRight size={16} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

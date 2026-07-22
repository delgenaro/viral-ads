"use client";

import { useState, useEffect } from "react";
import { Film, Users, Layout, Zap, Plus, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [avatars, setAvatars] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/videos/").then(r => r.json()).then(setVideos).catch(() => {});
    fetch("/api/avatars/").then(r => r.json()).then(setAvatars).catch(() => {});
  }, []);

  const stats = [
    { label: "Vídeos criados", value: videos.length.toString(), icon: Film, color: "from-violet-500 to-purple-500" },
    { label: "Créditos", value: "10", icon: Zap, color: "from-amber-500 to-orange-500" },
    { label: "Avatares", value: avatars.length.toString(), icon: Users, color: "from-fuchsia-500 to-pink-500" },
    { label: "Templates", value: "6", icon: Layout, color: "from-blue-500 to-cyan-500" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">Visão geral da sua produção</p>
        </div>
        <Link href="/criar" className="bg-violet-600 hover:bg-violet-500 active:scale-95 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2">
          <Plus size={16} /> Novo anúncio
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass rounded-2xl p-5 hover:translate-y-[-1px] transition-all" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                <Icon size={18} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-violet-300">{s.value}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="glass rounded-2xl p-6 mb-8">
        <h2 className="font-semibold mb-4">Vídeos recentes</h2>
        {videos.length === 0 ? (
          <div className="text-center py-10">
            <Film size={32} className="text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-500 text-sm mb-1">Nenhum vídeo criado ainda</p>
            <p className="text-xs text-zinc-600 mb-5">Crie seu primeiro anúncio em segundos</p>
            <Link href="/criar" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
              Criar primeiro anúncio <ExternalLink size={14} />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {videos.map((v, i) => (
              <div key={v.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                  <Film size={18} className="text-zinc-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Anúncio {v.id.slice(0, 8)}</p>
                  <p className="text-xs text-zinc-600">{new Date(v.created_at).toLocaleString("pt-BR")}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  v.status === "completed" ? "bg-emerald-900/30 text-emerald-400" :
                  v.status === "demo" ? "bg-amber-900/30 text-amber-400" :
                  "bg-zinc-800 text-zinc-500"
                }`}>{v.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

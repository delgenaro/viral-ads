"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, User, Loader2 } from "lucide-react";

export default function AvataresPage() {
  const [avatars, setAvatars] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try { const r = await fetch("/api/avatars/"); if (r.ok) setAvatars(await r.json()); } catch {}
  };
  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!imageUrl) return;
    setLoading(true);
    try {
      await fetch("/api/avatars/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ source_image: imageUrl }) });
      setImageUrl("");
      load();
    } catch {}
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/avatars/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Avatares IA</h1>
        <p className="text-sm text-zinc-500 mt-1">Crie avatares realistas para apresentar seus produtos</p>
      </div>

      <div className="glass rounded-2xl p-5 mb-10">
        <div className="flex gap-3">
          <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://exemplo.com/foto.jpg" className="flex-1 bg-zinc-900/50 border border-zinc-700 rounded-xl px-4 py-3 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-all" onKeyDown={e => e.key === "Enter" && handleCreate()} />
          <button onClick={handleCreate} disabled={loading || !imageUrl} className="bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 px-5 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            Criar avatar
          </button>
        </div>
        <p className="text-xs text-zinc-600 mt-3">Cole a URL de uma foto nítida para criar um avatar realista</p>
      </div>

      {avatars.length === 0 ? (
        <div className="glass rounded-2xl p-14 text-center">
          <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto mb-4">
            <User size={28} className="text-zinc-600" />
          </div>
          <p className="text-zinc-500 font-medium">Nenhum avatar criado ainda</p>
          <p className="text-xs text-zinc-600 mt-1">Adicione uma foto acima para começar</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {avatars.map((av, i) => (
            <div key={av.id} className="group glass rounded-2xl overflow-hidden" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="aspect-[3/4] bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative">
                <User size={40} className="text-zinc-700" />
                <button onClick={() => handleDelete(av.id)} className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-red-900/60 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate">{av.name}</p>
                <p className="text-xs text-zinc-600">{new Date(av.created_at).toLocaleDateString("pt-BR")}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

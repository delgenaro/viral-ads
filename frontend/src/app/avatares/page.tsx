"use client";

import { useState, useEffect } from "react";

export default function AvataresPage() {
  const [avatars, setAvatars] = useState<any[]>([]);
  const [url, setUrl] = useState("");

  const load = async () => {
    try { const r = await fetch("/api/avatars/"); if (r.ok) setAvatars(await r.json()); } catch {}
  };
  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!url) return;
    await fetch("/api/avatars/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source_image: url }),
    });
    setUrl("");
    load();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/avatars/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-xl font-bold mb-1">Avatares</h1>
      <p className="text-sm text-zinc-500 mb-6">Crie avatares a partir de fotos</p>

      <div className="flex gap-2 mb-8">
        <input
          type="url" value={url} onChange={e => setUrl(e.target.value)}
          placeholder="https://exemplo.com/foto.jpg"
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500"
        />
        <button onClick={handleCreate} disabled={!url}
          className="bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
          Criar
        </button>
      </div>

      {avatars.length === 0 ? (
        <p className="text-zinc-600 text-sm">Nenhum avatar criado ainda.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {avatars.map((av) => (
            <div key={av.id} className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
              <div className="aspect-[3/4] bg-zinc-800 flex items-center justify-center text-zinc-600 text-sm">
                {av.name}
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm truncate">{av.name}</p>
                  <p className="text-xs text-zinc-600">{new Date(av.created_at).toLocaleDateString("pt-BR")}</p>
                </div>
                <button onClick={() => handleDelete(av.id)} className="text-xs text-zinc-600 hover:text-red-400 transition-colors">
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

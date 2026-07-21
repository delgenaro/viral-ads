"use client";

import { useState, useEffect } from "react";

export default function AvataresPage() {
  const [avatars, setAvatars] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const loadAvatars = async () => {
    try {
      const res = await fetch("/api/avatars/");
      if (res.ok) setAvatars(await res.json());
    } catch {}
  };

  useEffect(() => {
    loadAvatars();
  }, []);

  const handleCreate = async () => {
    if (!imageUrl) return;
    try {
      await fetch("/api/avatars/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source_image: imageUrl }),
      });
      setImageUrl("");
      loadAvatars();
    } catch {}
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Avatares IA</h1>
      <p className="text-zinc-400 mb-8">
        Crie avatares realistas para apresentar seus produtos
      </p>

      <div className="flex gap-3 mb-10">
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="URL da foto para criar avatar..."
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
        />
        <button
          onClick={handleCreate}
          className="bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-lg font-medium text-sm transition-colors"
        >
          Criar avatar
        </button>
      </div>

      {avatars.length === 0 ? (
        <div className="border border-zinc-800 rounded-xl p-12 text-center">
          <div className="text-4xl mb-4">🤖</div>
          <p className="text-zinc-500 text-sm">
            Nenhum avatar criado ainda. Adicione uma foto acima.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {avatars.map((av) => (
            <div
              key={av.id}
              className="border border-zinc-800 rounded-xl overflow-hidden"
            >
              <div className="aspect-[3/4] bg-zinc-800 flex items-center justify-center text-zinc-600 text-sm">
                {av.name}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate">{av.name}</p>
                <p className="text-xs text-zinc-500">
                  {new Date(av.created_at).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

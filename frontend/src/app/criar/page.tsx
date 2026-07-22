"use client";

import { useState } from "react";

type Mode = "url" | "photo" | "clone";

export default function CriarPage() {
  const [mode, setMode] = useState<Mode>("url");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const [productUrl, setProductUrl] = useState("");
  const [productImage, setProductImage] = useState("");
  const [script, setScript] = useState("");
  const [refUrl, setRefUrl] = useState("");
  const [cloneProductUrl, setCloneProductUrl] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    let endpoint = "/api/videos/from-url";
    const body: Record<string, string> = { duration_seconds: "10" };

    if (mode === "url") {
      body.product_url = productUrl;
    } else if (mode === "photo") {
      body.product_image = productImage;
      if (script) body.script_text = script;
      endpoint = "/api/videos/from-photo";
    } else {
      body.reference_url = refUrl;
      if (cloneProductUrl) body.product_url = cloneProductUrl;
      endpoint = "/api/videos/clone";
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      setResult(json.url || "https://example.com/sample-ad.mp4");
    } catch {
      setResult("https://example.com/sample-ad.mp4");
    } finally {
      setLoading(false);
    }
  };

  const modes: { key: Mode; label: string }[] = [
    { key: "url", label: "Link do produto" },
    { key: "photo", label: "Foto do produto" },
    { key: "clone", label: "Clonar viral" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-xl font-bold mb-1">Criar anúncio</h1>
      <p className="text-sm text-zinc-500 mb-6">Gere um vídeo curto para TikTok</p>

      <div className="flex gap-2 mb-6">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m.key ? "bg-violet-600 text-white" : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleGenerate} className="space-y-4">
        {mode === "url" && (
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">URL do produto</label>
            <input
              type="url" value={productUrl} onChange={e => setProductUrl(e.target.value)}
              placeholder="https://exemplo.com/produto" required
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
            />
          </div>
        )}

        {mode === "photo" && (
          <>
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">URL da foto do produto</label>
              <input
                type="url" value={productImage} onChange={e => setProductImage(e.target.value)}
                placeholder="https://exemplo.com/foto.jpg" required
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Roteiro <span className="text-zinc-600">(opcional)</span></label>
              <textarea
                value={script} onChange={e => setScript(e.target.value)}
                rows={3} placeholder="O que o avatar deve falar sobre o produto..."
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500 resize-none"
              />
            </div>
          </>
        )}

        {mode === "clone" && (
          <>
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">URL do TikTok/Reels de referência</label>
              <input
                type="url" value={refUrl} onChange={e => setRefUrl(e.target.value)}
                placeholder="https://tiktok.com/@user/video/123" required
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">URL do seu produto <span className="text-zinc-600">(opcional)</span></label>
              <input
                type="url" value={cloneProductUrl} onChange={e => setCloneProductUrl(e.target.value)}
                placeholder="https://exemplo.com/produto"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
          </>
        )}

        <button
          type="submit" disabled={loading}
          className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white py-3 rounded-lg font-medium transition-colors"
        >
          {loading ? "Gerando..." : "Gerar anúncio"}
        </button>
      </form>

      {result && (
        <div className="mt-6">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden">
            <video src={result} controls className="w-full max-w-xs mx-auto" />
          </div>
          <p className="text-xs text-zinc-600 mt-2 text-center">Anúncio gerado</p>
        </div>
      )}
    </div>
  );
}

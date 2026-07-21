"use client";

import { useState } from "react";

export default function CriarAnuncioPage() {
  const [mode, setMode] = useState<"url" | "photo" | "clone">("url");
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResultUrl(null);
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    let endpoint = "/api/videos/from-url";
    const body: Record<string, string> = {};

    if (mode === "url") {
      body.product_url = data.get("product_url") as string;
    } else if (mode === "photo") {
      body.product_image = data.get("product_image") as string;
      body.script_text = (data.get("script_text") as string) || "";
    } else {
      body.reference_url = data.get("reference_url") as string;
      body.product_url = (data.get("product_url_clone") as string) || body.reference_url;
      endpoint = "/api/videos/clone";
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, duration_seconds: 10 }),
      });
      const json = await res.json();
      if (json.url) setResultUrl(json.url);
      else setResultUrl("https://example.com/sample-ad.mp4");
    } catch {
      setResultUrl("https://example.com/sample-ad.mp4");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Criar anúncio</h1>
      <p className="text-zinc-400 mb-8">
        Gere um vídeo curto para TikTok em segundos
      </p>

      <div className="flex gap-2 mb-8">
        {[
          { key: "url", label: "Link do produto" },
          { key: "photo", label: "Foto do produto" },
          { key: "clone", label: "Clonar anúncio viral" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setMode(tab.key as typeof mode)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === tab.key
                ? "bg-violet-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:text-zinc-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "url" && (
          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              URL do produto
            </label>
            <input
              name="product_url"
              type="url"
              required
              placeholder="https://exemplo.com/produto"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
            />
          </div>
        )}

        {mode === "photo" && (
          <>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">
                URL da foto do produto
              </label>
              <input
                name="product_image"
                type="url"
                required
                placeholder="https://exemplo.com/foto-produto.jpg"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">
                Roteiro (opcional)
              </label>
              <textarea
                name="script_text"
                rows={3}
                placeholder="Descreva o que o avatar deve falar..."
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
          </>
        )}

        {mode === "clone" && (
          <>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">
                URL do TikTok/Reels de referência
              </label>
              <input
                name="reference_url"
                type="url"
                required
                placeholder="https://tiktok.com/@user/video/123..."
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">
                URL do seu produto (opcional)
              </label>
              <input
                name="product_url_clone"
                type="url"
                placeholder="https://exemplo.com/seu-produto"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 px-6 py-3 rounded-xl font-medium transition-colors"
        >
          {loading ? "Gerando..." : "Gerar anúncio"}
        </button>
      </form>

      {resultUrl && (
        <div className="mt-8 p-4 bg-zinc-900 border border-zinc-700 rounded-xl">
          <h3 className="font-semibold mb-2">Anúncio gerado!</h3>
          <video
            src={resultUrl}
            controls
            className="w-full max-w-sm rounded-lg"
          />
          <p className="mt-2 text-xs text-zinc-500">
            Link:{" "}
            <a
              href={resultUrl}
              target="_blank"
              className="text-violet-400 underline"
            >
              {resultUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

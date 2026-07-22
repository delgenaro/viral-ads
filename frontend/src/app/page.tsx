"use client";

import { useState, useRef } from "react";

export default function HomePage() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [step, setStep] = useState<"form" | "result">("form");

  const avatarInput = useRef<HTMLInputElement>(null);
  const productInput = useRef<HTMLInputElement>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!avatarUrl || !productUrl) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/videos/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatar_image: avatarUrl,
          product_image: productUrl,
          script_text: description,
          duration_seconds: 10,
        }),
      });
      const json = await res.json();
      setResult(json.url || "https://example.com/demo-video.mp4");
      setStep("result");
    } catch {
      setResult("https://example.com/demo-video.mp4");
      setStep("result");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep("form");
    setResult(null);
    setAvatarUrl("");
    setProductUrl("");
    setDescription("");
  };

  if (step === "result") {
    return (
      <div className="max-w-sm mx-auto px-4 pt-12 text-center">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden mb-6">
          <video src={result!} controls className="w-full aspect-[9/16] object-contain bg-black" />
        </div>
        <button onClick={reset} className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-lg font-medium transition-colors">
          Criar novo anúncio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 pt-10 pb-16">
      <h1 className="text-lg font-bold mb-1">Criar anúncio</h1>
      <p className="text-sm text-zinc-500 mb-8">Adicione uma foto de pessoa, uma foto do produto e descreva o que falar.</p>

      <form onSubmit={handleGenerate} className="space-y-5">
        <div>
          <label className="text-xs text-zinc-500 mb-1.5 block">Foto da pessoa (avatar)</label>
          <div className="flex gap-2">
            <input
              ref={avatarInput}
              type="url"
              value={avatarUrl}
              onChange={e => setAvatarUrl(e.target.value)}
              placeholder="https://..."
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500"
            />
            {avatarUrl && (
              <div className="w-10 h-10 rounded-lg bg-zinc-800 overflow-hidden shrink-0 border border-zinc-700">
                <img src={avatarUrl} alt="" className="w-full h-full object-cover" onError={e => (e.target as HTMLElement).style.display = "none"} />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs text-zinc-500 mb-1.5 block">Foto do produto</label>
          <div className="flex gap-2">
            <input
              ref={productInput}
              type="url"
              value={productUrl}
              onChange={e => setProductUrl(e.target.value)}
              placeholder="https://..."
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500"
            />
            {productUrl && (
              <div className="w-10 h-10 rounded-lg bg-zinc-800 overflow-hidden shrink-0 border border-zinc-700">
                <img src={productUrl} alt="" className="w-full h-full object-cover" onError={e => (e.target as HTMLElement).style.display = "none"} />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs text-zinc-500 mb-1.5 block">Descrição do anúncio</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            placeholder="Ex: Este produto é perfeito para quem busca qualidade e estilo. Mostre como ele funciona no dia a dia..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !avatarUrl || !productUrl}
          className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
        >
          {loading ? "Gerando..." : "Gerar anúncio"}
        </button>
      </form>

      <div className="mt-8 border-t border-zinc-800 pt-5">
        <p className="text-xs text-zinc-600 mb-3">Exemplos de imagens para testar:</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <button onClick={() => setAvatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200")} className="px-2.5 py-1.5 rounded bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors">
            👤 Pessoa 1
          </button>
          <button onClick={() => setAvatarUrl("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200")} className="px-2.5 py-1.5 rounded bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors">
            👤 Pessoa 2
          </button>
          <button onClick={() => setProductUrl("https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200")} className="px-2.5 py-1.5 rounded bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors">
            👟 Tênis
          </button>
          <button onClick={() => setProductUrl("https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200")} className="px-2.5 py-1.5 rounded bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors">
            🧴 Perfume
          </button>
          <button onClick={() => setProductUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200")} className="px-2.5 py-1.5 rounded bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors">
            ⌚ Relógio
          </button>
        </div>
      </div>
    </div>
  );
}

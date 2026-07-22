"use client";

import { useState } from "react";
import { Image, UserSquare2, Sparkles, X } from "lucide-react";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || !avatarUrl || !productUrl) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/videos/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatar_image: avatarUrl,
          product_image: productUrl,
          script_text: prompt,
          duration_seconds: 10,
        }),
      });
      const json = await res.json();
      setResult(json.url || "https://example.com/demo-video.mp4");
    } catch {
      setResult("https://example.com/demo-video.mp4");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">V</div>
        <span className="text-sm font-semibold">ViralAds</span>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-3 space-y-4">
          <h1 className="text-lg font-semibold">Criar anúncio com avatar</h1>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="bg-[#131316] border border-[#232326] rounded-xl overflow-hidden">
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Descreva sua ideia, cole um link ou escreva o roteiro do anúncio..."
                rows={6}
                className="w-full bg-transparent border-0 px-4 pt-4 pb-2 text-sm placeholder:text-[#444] focus:outline-none resize-none"
              />
              <div className="px-4 pb-3 flex items-center gap-2 text-[10px] text-[#444] border-t border-[#1a1a1e] pt-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded bg-[#1c1c20] flex items-center justify-center">
                    <Image size={10} className="text-[#666]" />
                  </div>
                  Imagem
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded bg-[#1c1c20] flex items-center justify-center">
                    <Sparkles size={10} className="text-[#666]" />
                  </div>
                  IA
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <div className="bg-[#131316] border border-[#232326] rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1c1c20] flex items-center justify-center shrink-0">
                    <UserSquare2 size={18} className="text-[#666]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {avatarUrl ? (
                      <div className="flex items-center gap-2">
                        <img src={avatarUrl} alt="" className="w-7 h-7 rounded object-cover" />
                        <span className="text-xs text-[#888] truncate">Avatar adicionado</span>
                        <button type="button" onClick={() => setAvatarUrl("")} className="ml-auto text-[#555] hover:text-white text-xs">×</button>
                      </div>
                    ) : (
                      <input
                        type="url"
                        value={avatarUrl}
                        onChange={e => setAvatarUrl(e.target.value)}
                        placeholder="URL da foto (pessoa)"
                        className="w-full bg-transparent text-xs placeholder:text-[#444] focus:outline-none"
                      />
                    )}
                  </div>
                </div>
                <p className="text-[10px] text-[#444] mt-1 ml-1">Avatar</p>
              </div>

              <div className="flex-1">
                <div className="bg-[#131316] border border-[#232326] rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1c1c20] flex items-center justify-center shrink-0">
                    <Image size={18} className="text-[#666]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {productUrl ? (
                      <div className="flex items-center gap-2">
                        <img src={productUrl} alt="" className="w-7 h-7 rounded object-cover" />
                        <span className="text-xs text-[#888] truncate">Produto adicionado</span>
                        <button type="button" onClick={() => setProductUrl("")} className="ml-auto text-[#555] hover:text-white text-xs">×</button>
                      </div>
                    ) : (
                      <input
                        type="url"
                        value={productUrl}
                        onChange={e => setProductUrl(e.target.value)}
                        placeholder="URL da foto (produto)"
                        className="w-full bg-transparent text-xs placeholder:text-[#444] focus:outline-none"
                      />
                    )}
                  </div>
                </div>
                <p className="text-[10px] text-[#444] mt-1 ml-1">Produto</p>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setAvatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200")}
                className="text-[10px] text-[#555] hover:text-[#888] px-2 py-1 rounded bg-[#1a1a1e] transition-colors"
              >
                👤 Exemplo avatar
              </button>
              <button
                type="button"
                onClick={() => setProductUrl("https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200")}
                className="text-[10px] text-[#555] hover:text-[#888] px-2 py-1 rounded bg-[#1a1a1e] transition-colors"
              >
                👟 Exemplo produto
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || !prompt || !avatarUrl || !productUrl}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-25 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium text-sm transition-all active:scale-[0.99]"
            >
              {loading ? "Gerando..." : "Criar"}
            </button>
          </form>
        </div>

        <div className="md:col-span-2">
          <div className="bg-[#131316] border border-[#232326] rounded-xl aspect-[9/16] flex items-center justify-center">
            {result ? (
              <video src={result} controls className="w-full h-full rounded-xl object-contain" />
            ) : (
              <div className="text-center px-6">
                <div className="w-12 h-12 rounded-xl bg-[#1c1c20] flex items-center justify-center mx-auto mb-3">
                  <Sparkles size={22} className="text-[#444]" />
                </div>
                <p className="text-xs text-[#444]">Pré-visualização</p>
                <p className="text-[10px] text-[#333] mt-1">Preencha os campos e clique em Criar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

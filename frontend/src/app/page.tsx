"use client";

import { useState } from "react";
import { Image, UserSquare2, Sparkles, Play, RotateCcw } from "lucide-react";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || !avatarUrl || !productUrl) return;
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const res = await fetch("/api/videos/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatar_image: avatarUrl,
          product_image: productUrl,
          script_text: prompt,
        }),
      });
      if (!res.ok) { setError("Erro ao gerar vídeo"); return; }
      const json = await res.json();
      if (json.url) setResult(json.url);
      else setError("Nenhum vídeo retornado");
    } catch {
      setError("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">V</div>
        <span className="text-sm font-semibold">ViralAds</span>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-5">
          <div>
            <h1 className="text-lg font-medium mb-1">Criar anúncio com avatar IA</h1>
            <p className="text-xs text-zinc-600">Preencha os campos abaixo e gere um vídeo curto para TikTok</p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-5">
            <div>
              <label className="text-xs text-zinc-500 mb-2 block">Roteiro / Descrição do anúncio</label>
              <div className="bg-[#131316] border border-[#232326] rounded-xl overflow-hidden focus-within:border-violet-500/40 transition-colors">
                <textarea
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="Descreva sua ideia, cole um link ou escreva o roteiro do anúncio..."
                  rows={6}
                  className="w-full bg-transparent border-0 px-4 pt-4 pb-2 text-sm placeholder:text-[#444] focus:outline-none resize-none"
                />
                <div className="px-4 pb-3 flex items-center gap-3 text-[10px] text-[#444] border-t border-[#1a1a1e] pt-3">
                  <span className="flex items-center gap-1"><Image size={11} /> Imagem</span>
                  <span className="flex items-center gap-1"><Sparkles size={11} /> IA Generativa</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-500 mb-2 block">Foto da pessoa (avatar)</label>
                <div className="bg-[#131316] border border-[#232326] rounded-xl p-4 flex flex-col items-center gap-2 min-h-[100px] justify-center">
                  {avatarUrl ? (
                    <div className="flex flex-col items-center gap-2 w-full">
                      <img src={avatarUrl} alt="" className="w-14 h-14 rounded-full object-cover ring-2 ring-violet-500/30" />
                      <span className="text-[11px] text-zinc-500 truncate max-w-full">Avatar adicionado</span>
                      <button type="button" onClick={() => setAvatarUrl("")} className="text-[10px] text-zinc-600 hover:text-red-400 transition-colors">Remover</button>
                    </div>
                  ) : (
                    <>
                      <UserSquare2 size={24} className="text-[#444]" />
                      <input
                        type="url"
                        value={avatarUrl}
                        onChange={e => setAvatarUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full bg-[#0c0c0f] border border-[#232326] rounded-lg px-3 py-2 text-xs placeholder:text-[#444] focus:outline-none focus:border-violet-500/40 text-center"
                      />
                    </>
                  )}
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-2 block">Foto do produto</label>
                <div className="bg-[#131316] border border-[#232326] rounded-xl p-4 flex flex-col items-center gap-2 min-h-[100px] justify-center">
                  {productUrl ? (
                    <div className="flex flex-col items-center gap-2 w-full">
                      <img src={productUrl} alt="" className="w-14 h-14 rounded-xl object-cover ring-2 ring-violet-500/30" />
                      <span className="text-[11px] text-zinc-500 truncate max-w-full">Produto adicionado</span>
                      <button type="button" onClick={() => setProductUrl("")} className="text-[10px] text-zinc-600 hover:text-red-400 transition-colors">Remover</button>
                    </div>
                  ) : (
                    <>
                      <Image size={24} className="text-[#444]" />
                      <input
                        type="url"
                        value={productUrl}
                        onChange={e => setProductUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full bg-[#0c0c0f] border border-[#232326] rounded-lg px-3 py-2 text-xs placeholder:text-[#444] focus:outline-none focus:border-violet-500/40 text-center"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 text-[10px]">
              <button type="button" onClick={() => setAvatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200")} className="px-3 py-1.5 rounded-lg bg-[#1a1a1e] text-zinc-500 hover:text-zinc-300 transition-colors">👤 Exemplo avatar</button>
              <button type="button" onClick={() => setProductUrl("https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200")} className="px-3 py-1.5 rounded-lg bg-[#1a1a1e] text-zinc-500 hover:text-zinc-300 transition-colors">👟 Exemplo produto</button>
            </div>

            <button
              type="submit"
              disabled={loading || !prompt || !avatarUrl || !productUrl}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-25 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium text-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {loading ? <><Sparkles size={16} className="animate-pulse" /> Gerando...</> : <><Play size={16} /> Criar anúncio</>}
            </button>

            {error && <p className="text-xs text-red-400 bg-red-900/20 border border-red-800/30 rounded-lg px-3 py-2">{error}</p>}
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="text-xs text-zinc-500 mb-3">Pré-visualização</div>
          <div className="bg-[#131316] border border-[#232326] rounded-xl aspect-[9/16] flex items-center justify-center overflow-hidden">
            {result ? (
              <video key={result} src={result} controls autoPlay className="w-full h-full object-contain" />
            ) : (
              <div className="text-center px-8">
                <div className="w-14 h-14 rounded-2xl bg-[#1c1c20] flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={24} className="text-[#333]" />
                </div>
                <p className="text-sm text-[#333] font-medium">Aguardando</p>
                <p className="text-xs text-[#2a2a2e] mt-1">Preencha os campos e clique em Criar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

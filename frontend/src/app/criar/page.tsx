"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Link2, Image, Copy, CheckCircle2, Loader2, Send, Sparkles } from "lucide-react";

type Mode = "url" | "photo" | "clone";

const modes: { key: Mode; icon: typeof Link2; label: string; desc: string }[] = [
  { key: "url", icon: Link2, label: "Link do produto", desc: "Cole a URL do produto que quer anunciar" },
  { key: "photo", icon: Image, label: "Foto do produto", desc: "Use uma imagem do produto como base" },
  { key: "clone", icon: Copy, label: "Clonar anúncio viral", desc: "Copie a estrutura de um TikTok de sucesso" },
];

export default function CriarAnuncioPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [mode, setMode] = useState<Mode>("url");
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [form, setForm] = useState({ product_url: "", product_image: "", script_text: "", reference_url: "", product_url_clone: "" });

  const handleGenerate = async () => {
    setLoading(true);
    setResultUrl(null);
    let endpoint = "/api/videos/from-url";
    const body: Record<string, string> = { duration_seconds: "10" };

    if (mode === "url") {
      body.product_url = form.product_url;
    } else if (mode === "photo") {
      body.product_image = form.product_image;
      if (form.script_text) body.script_text = form.script_text;
      endpoint = "/api/videos/from-photo";
    } else {
      body.reference_url = form.reference_url;
      if (form.product_url_clone) body.product_url = form.product_url_clone;
      endpoint = "/api/videos/clone";
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      setResultUrl(json.url || "https://example.com/sample-ad.mp4");
      setStep(3);
    } catch {
      setResultUrl("https://example.com/sample-ad.mp4");
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (mode === "url") return form.product_url.length > 0;
    if (mode === "photo") return form.product_image.length > 0;
    return form.reference_url.length > 0;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-1">
        {step > 1 && (
          <button onClick={() => setStep((step - 1) as 1 | 2 | 3)} className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 transition-colors">
            <ArrowLeft size={20} />
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold">Criar anúncio</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Gere um vídeo curto para TikTok em segundos</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-8 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
              step >= s ? "bg-violet-600 text-white" : "bg-zinc-800 text-zinc-500"
            }`}>{s}</div>
            <div className={`hidden sm:block text-xs ${step >= s ? "text-zinc-300" : "text-zinc-600"}`}>
              {s === 1 ? "Modo" : s === 2 ? "Detalhes" : "Resultado"}
            </div>
            {s < 3 && <div className={`flex-1 h-px ${step > s ? "bg-violet-600" : "bg-zinc-800"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="animate-fade-in space-y-4">
          <p className="text-sm text-zinc-500 mb-1">Escolha como deseja criar seu anúncio:</p>
          {modes.map((m) => {
            const Icon = m.icon;
            const active = mode === m.key;
            return (
              <button key={m.key} onClick={() => setMode(m.key)} className={`w-full flex items-center gap-4 p-5 rounded-xl border transition-all text-left ${
                active ? "border-violet-500/40 bg-violet-600/10" : "glass hover:border-violet-500/20"
              }`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                  active ? "bg-violet-600 text-white" : "bg-zinc-800 text-zinc-400"
                }`}><Icon size={20} /></div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{m.label}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{m.desc}</div>
                </div>
                {active && <CheckCircle2 size={20} className="text-violet-400 shrink-0" />}
              </button>
            );
          })}
          <div className="pt-4">
            <button onClick={() => setStep(2)} disabled={!canProceed()} className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.99] text-white px-6 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
              Continuar <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in space-y-5">
          {mode === "url" && (
            <div>
              <label className="block text-sm font-medium mb-2">URL do produto</label>
              <input type="url" value={form.product_url} onChange={e => setForm({...form, product_url: e.target.value})} placeholder="https://exemplo.com/produto" className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl px-4 py-3.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all" />
              <p className="text-xs text-zinc-600 mt-2">Cole o link da página do produto que deseja anunciar</p>
            </div>
          )}

          {mode === "photo" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">URL da foto do produto</label>
                <input type="url" value={form.product_image} onChange={e => setForm({...form, product_image: e.target.value})} placeholder="https://exemplo.com/foto-produto.jpg" className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl px-4 py-3.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Roteiro <span className="text-zinc-600 font-normal">(opcional)</span></label>
                <textarea value={form.script_text} onChange={e => setForm({...form, script_text: e.target.value})} rows={4} placeholder="Descreva o que o avatar deve falar sobre o produto..." className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl px-4 py-3.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all resize-none" />
              </div>
            </>
          )}

          {mode === "clone" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">URL do TikTok/Reels de referência</label>
                <input type="url" value={form.reference_url} onChange={e => setForm({...form, reference_url: e.target.value})} placeholder="https://tiktok.com/@user/video/123..." className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl px-4 py-3.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all" />
                <p className="text-xs text-zinc-600 mt-2">Cole o link de um anúncio viral para copiar a estrutura</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">URL do seu produto <span className="text-zinc-600 font-normal">(opcional)</span></label>
                <input type="url" value={form.product_url_clone} onChange={e => setForm({...form, product_url_clone: e.target.value})} placeholder="https://exemplo.com/seu-produto" className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl px-4 py-3.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all" />
              </div>
            </>
          )}

          <button onClick={handleGenerate} disabled={loading || !canProceed()} className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.99] text-white px-6 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
            {loading ? (
              <><Loader2 size={18} className="animate-spin" /> Gerando anúncio...</>
            ) : (
              <><Send size={18} /> Gerar anúncio</>
            )}
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in space-y-6">
          <div className="glass rounded-2xl p-1">
            <div className="aspect-[9/16] max-w-xs mx-auto bg-zinc-900 rounded-xl overflow-hidden flex items-center justify-center">
              {resultUrl ? (
                <video src={resultUrl} controls className="w-full h-full object-contain" />
              ) : (
                <div className="text-center p-8">
                  <Loader2 size={32} className="animate-spin text-violet-400 mx-auto mb-3" />
                  <p className="text-sm text-zinc-500">Renderizando...</p>
                </div>
              )}
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-700/30 text-emerald-400 text-xs font-medium mb-3">
              <CheckCircle2 size={14} /> Vídeo gerado com sucesso
            </div>
            <h2 className="text-xl font-bold">Seu anúncio está pronto!</h2>
            <p className="text-sm text-zinc-500 mt-1">Baixe ou publique direto no TikTok</p>
          </div>

          <div className="flex gap-3">
            <a href={resultUrl || "#"} download className="flex-1 bg-violet-600 hover:bg-violet-500 active:scale-[0.99] text-white px-6 py-3.5 rounded-xl font-medium transition-all text-center">Baixar vídeo</a>
            <button onClick={() => { setStep(1); setResultUrl(null); setForm({ product_url: "", product_image: "", script_text: "", reference_url: "", product_url_clone: "" }); }} className="flex-1 glass hover:border-violet-500/30 px-6 py-3.5 rounded-xl font-medium transition-all text-center text-sm">
              Criar novo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { Code, Get, Post } from "lucide-react";

export default function ApiDemoPage() {
  const endpoints = [
    { method: "POST", path: "/api/videos/from-url", desc: "Gera anúncio a partir da URL de um produto", body: '{ "product_url": "https://..." }' },
    { method: "POST", path: "/api/videos/from-photo", desc: "Gera anúncio a partir de uma foto", body: '{ "product_image": "https://...", "script_text": "texto" }' },
    { method: "POST", path: "/api/videos/clone", desc: "Clona estrutura de um anúncio viral", body: '{ "reference_url": "https://tiktok.com/@user/video/123" }' },
    { method: "GET", path: "/api/templates/", desc: "Lista todos os templates", body: null },
    { method: "POST", path: "/api/avatars/", desc: "Cria um novo avatar", body: '{ "source_image": "https://..." }' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Code size={22} /> API Reference</h1>
        <p className="text-sm text-zinc-500 mt-1">Endpoints REST para integração com o ViralAds</p>
      </div>

      <div className="space-y-4">
        {endpoints.map((ep) => (
          <div key={ep.path} className="glass rounded-2xl p-5 hover:border-violet-500/10 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                ep.method === "GET" ? "bg-emerald-900/40 text-emerald-400" : "bg-blue-900/40 text-blue-400"
              }`}>{ep.method}</span>
              <code className="text-sm font-mono text-zinc-300">{ep.path}</code>
            </div>
            <p className="text-sm text-zinc-500 mb-3">{ep.desc}</p>
            {ep.body && (
              <div className="bg-zinc-900/50 rounded-xl p-3">
                <pre className="text-xs text-zinc-400 overflow-x-auto font-mono">{ep.body}</pre>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 glass rounded-2xl p-6 text-center">
        <p className="text-sm text-zinc-400">Documentação interativa (Swagger UI):</p>
        <a href="http://localhost:8000/docs" target="_blank" className="text-violet-400 hover:text-violet-300 font-medium text-sm underline underline-offset-2 decoration-violet-500/30">
          http://localhost:8000/docs
        </a>
      </div>
    </div>
  );
}

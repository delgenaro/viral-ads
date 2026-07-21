"use client";

import { useState, useEffect } from "react";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/templates/")
      .then((r) => r.json())
      .then(setTemplates)
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Templates de anúncios</h1>
      <p className="text-zinc-400 mb-8">
        Comece com um formato pronto e personalize com seu produto
      </p>

      {templates.length === 0 ? (
        <div className="border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-500">Carregando templates...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-colors"
            >
              <div className="aspect-[9/16] bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-3xl">
                🎬
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{tpl.name}</h3>
                  <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded-full capitalize">
                    {tpl.category}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 mb-3">{tpl.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">
                    {tpl.duration_seconds}s
                  </span>
                  <a
                    href="/criar"
                    className="text-sm text-violet-400 hover:text-violet-300 font-medium"
                  >
                    Usar template →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

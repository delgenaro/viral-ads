export default function ApiDemoPage() {
  const endpoints = [
    {
      method: "POST",
      path: "/api/videos/from-url",
      desc: "Gera anúncio a partir da URL de um produto",
      body: '{ "product_url": "https://exemplo.com/produto", "duration_seconds": 10 }',
    },
    {
      method: "POST",
      path: "/api/videos/from-photo",
      desc: "Gera anúncio a partir de uma foto do produto",
      body: '{ "product_image": "https://exemplo.com/foto.jpg", "script_text": "texto opcional para o roteiro" }',
    },
    {
      method: "POST",
      path: "/api/videos/clone",
      desc: "Clona estrutura de um anúncio viral existente",
      body: '{ "reference_url": "https://tiktok.com/@user/video/123", "product_url": "https://exemplo.com/produto" }',
    },
    {
      method: "GET",
      path: "/api/templates/",
      desc: "Lista todos os templates disponíveis",
      body: null,
    },
    {
      method: "POST",
      path: "/api/avatars/",
      desc: "Cria um novo avatar a partir de uma foto",
      body: '{ "source_image": "https://exemplo.com/foto.jpg", "name": "Meu Avatar" }',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">API Reference</h1>
      <p className="text-zinc-400 mb-8">
        Endpoints para integração com o ViralAds
      </p>

      <div className="space-y-4">
        {endpoints.map((ep) => (
          <div
            key={ep.path}
            className="border border-zinc-800 rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${
                  ep.method === "GET"
                    ? "bg-green-900/50 text-green-400"
                    : "bg-blue-900/50 text-blue-400"
                }`}
              >
                {ep.method}
              </span>
              <code className="text-sm font-mono text-zinc-300">{ep.path}</code>
            </div>
            <p className="text-sm text-zinc-500 mb-3">{ep.desc}</p>
            {ep.body && (
              <pre className="bg-zinc-900 rounded-lg p-3 text-xs text-zinc-400 overflow-x-auto">
                {ep.body}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

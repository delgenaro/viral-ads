export default function DashboardPage() {
  const stats = [
    { label: "Vídeos criados", value: "0" },
    { label: "Créditos disponíveis", value: "10" },
    { label: "Avatares", value: "0" },
    { label: "Templates", value: "6" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((s) => (
          <div
            key={s.label}
            className="border border-zinc-800 rounded-xl p-5"
          >
            <div className="text-2xl font-bold text-violet-400">{s.value}</div>
            <div className="text-sm text-zinc-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="border border-zinc-800 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">🎬</div>
        <h2 className="text-lg font-semibold mb-2">Nenhum vídeo ainda</h2>
        <p className="text-zinc-500 text-sm mb-6">
          Crie seu primeiro anúncio em segundos
        </p>
        <a
          href="/criar"
          className="inline-block bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-xl font-medium transition-colors"
        >
          Criar primeiro anúncio
        </a>
      </div>
    </div>
  );
}

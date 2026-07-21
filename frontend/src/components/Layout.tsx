import Link from "next/link";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/criar", label: "Criar Anúncio" },
  { href: "/avatares", label: "Avatares" },
  { href: "/templates", label: "Templates" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-bold">
              V
            </div>
            <span className="font-bold text-lg">ViralAds</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-zinc-100 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/api-demo"
              className="text-sm text-zinc-400 hover:text-zinc-100"
            >
              API
            </Link>
            <Link
              href="/login"
              className="text-sm bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Entrar
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-zinc-800 text-zinc-600 text-xs py-6 text-center">
        ViralAds 2026 — IA para anúncios no TikTok
      </footer>
    </div>
  );
}

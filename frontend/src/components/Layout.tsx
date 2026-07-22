"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, LayoutDashboard, Video, Users, Layout as LayoutIcon, LogIn, Code } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Início", icon: Sparkles },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/criar", label: "Criar Anúncio", icon: Video },
  { href: "/avatares", label: "Avatares", icon: Users },
  { href: "/templates", label: "Templates", icon: LayoutIcon },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-white/5" style={{ background: "rgba(9,9,11,0.8)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-bold shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
              V
            </div>
            <span className="font-bold text-lg tracking-tight">
              Viral<span className="text-violet-400">Ads</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-violet-600/15 text-violet-300 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/api-demo" className="text-zinc-500 hover:text-zinc-300 px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1.5">
              <Code size={14} /> API
            </Link>
            <Link href="/login" className="bg-violet-600 hover:bg-violet-500 active:scale-95 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-violet-600/20 hover:shadow-violet-500/30 flex items-center gap-1.5">
              <LogIn size={14} /> Entrar
            </Link>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-zinc-400 hover:text-zinc-200">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/5 px-4 py-3 space-y-1" style={{ background: "rgba(9,9,11,0.95)" }}>
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active ? "bg-violet-600/15 text-violet-300" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Icon size={16} /> {item.label}
                </Link>
              );
            })}
            <div className="pt-2 mt-2 border-t border-white/5">
              <Link href="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-violet-400 hover:bg-violet-600/10">
                <LogIn size={16} /> Entrar / Cadastrar
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-600 text-sm">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[10px] font-bold">V</div>
            ViralAds <span className="text-zinc-700">—</span> IA para anúncios no TikTok
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <span>Feito com 🚀 para criadores</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

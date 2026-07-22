"use client";

import { useState } from "react";
import { LogIn, UserPlus, Mail, Lock, User, Loader2, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const endpoint = tab === "login" ? "/api/auth/login" : "/api/auth/register";
    const body = tab === "login" ? { email, password } : { email, password, name };
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.access_token);
        window.location.href = "/dashboard";
      } else {
        const err = await res.json().catch(() => ({ detail: "Erro ao autenticar" }));
        setError(err.detail || "Erro ao autenticar");
      }
    } catch {
      setError("Erro de conexão com o servidor");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/20">
            <Sparkles size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">{tab === "login" ? "Bem-vindo de volta" : "Criar conta"}</h1>
          <p className="text-sm text-zinc-500 mt-1">{tab === "login" ? "Entre para continuar" : "Comece a criar anúncios grátis"}</p>
        </div>

        <div className="glass rounded-2xl p-1 flex mb-6">
          {(["login", "register"] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setError(""); }} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${tab === t ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20" : "text-zinc-500 hover:text-zinc-300"}`}>
              {t === "login" ? <><LogIn size={14} /> Entrar</> : <><UserPlus size={14} /> Cadastrar</>}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "register" && (
            <div>
              <label className="block text-sm font-medium mb-1.5"><User size={14} className="inline mr-1.5 text-zinc-500" />Nome</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Seu nome" className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl px-4 py-3 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1.5"><Mail size={14} className="inline mr-1.5 text-zinc-500" />Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="seu@email.com" className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl px-4 py-3 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5"><Lock size={14} className="inline mr-1.5 text-zinc-500" />Senha</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl px-4 py-3 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all" />
          </div>

          {error && <p className="text-sm text-red-400 bg-red-900/20 border border-red-800/30 rounded-xl px-4 py-3">{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.99] text-white px-6 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
            {loading ? <><Loader2 size={18} className="animate-spin" /> Aguarde...</> : <>{tab === "login" ? "Entrar" : "Criar conta"} <LogIn size={16} /></>}
          </button>
        </form>
      </div>
    </div>
  );
}

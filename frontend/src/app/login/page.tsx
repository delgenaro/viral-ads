"use client";

import { useState } from "react";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = tab === "login" ? "/api/auth/login" : "/api/auth/register";
    const body =
      tab === "login"
        ? { email, password }
        : { email, password, name };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.access_token);
        window.location.href = "/dashboard";
      } else {
        alert("Erro ao autenticar");
      }
    } catch {
      alert("Erro de conexão");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <h1 className="text-2xl font-bold text-center mb-8">
        {tab === "login" ? "Entrar" : "Criar conta"}
      </h1>

      <div className="flex gap-2 mb-6 justify-center">
        <button
          onClick={() => setTab("login")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            tab === "login"
              ? "bg-violet-600 text-white"
              : "bg-zinc-800 text-zinc-400"
          }`}
        >
          Entrar
        </button>
        <button
          onClick={() => setTab("register")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            tab === "register"
              ? "bg-violet-600 text-white"
              : "bg-zinc-800 text-zinc-400"
          }`}
        >
          Cadastrar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {tab === "register" && (
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
            />
          </div>
        )}
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-xl font-medium transition-colors"
        >
          {tab === "login" ? "Entrar" : "Criar conta"}
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Para redirecionamento
import "../../styles/login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const router = useRouter(); // Hook para redirecionamento

  useEffect(() => {
    // Se já houver um usuário logado, redireciona para home
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      router.push("/home");
    }
  }, []);

  // Função para salvar o usuário ou autenticar
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita recarregar a página

    if (!email || !password) {
      setError("Preencha todos os campos!");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      // Se o usuário já existe, valida a senha
      if (storedUser.email === email && storedUser.password === password) {
        router.push("/home"); // Redireciona para a Home
      } else {
        setError("Usuário ou senha inválidos!");
      }
    } else {
      // Se não existe, cria o usuário
      const user = { email, password };
      localStorage.setItem("user", JSON.stringify(user));

      alert("Conta criada com sucesso!");
      router.push("/home"); // Redireciona para a Home
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <img src="/logo-login.svg" alt="Logo" />

        {/* Título */}
        <h1 className="login-title">Seja Bem Vindo</h1>
        <span className="login-subtitle">Efetue seu login</span>

        {/* Mensagem de erro */}
        {error && <p className="error-message">{error}</p>}

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              id="email"
              className="login-input"
              placeholder=" " /* ⚠ Necessário para a animação funcionar */
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email" className="input-label">
              E-mail ou usuário
            </label>
          </div>

          <div className="password-container">
            <input
              type="password"
              id="password"
              className="password-input"
              placeholder=" " /* ⚠ Necessário para a animação funcionar */
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" className="password-label">
              Senha
            </label>
          </div>

          {/* Botão */}
          <button type="submit" className="login-button">
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
}

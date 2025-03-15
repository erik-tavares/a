"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Para redirecionamento
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Ícones para mostrar/ocultar senha
import "../../styles/login.css";

export default function LoginPage() {
  const [userInput, setUserInput] = useState(""); // Pode ser e-mail ou usuário
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para exibir/ocultar senha
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const router = useRouter(); // Hook para redirecionamento

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita recarregar a página

    if (!userInput || !password) {
      setError("Preencha todos os campos!");
      return;
    }

    if (password.length < 10) {
      setError("A senha deve ter no mínimo 10 caracteres.");
      return;
    }

    const isEmail = userInput.includes("@"); // Verifica se é e-mail
    const newUser = {
      username: isEmail ? null : userInput, // Salva username se não for e-mail
      email: isEmail ? userInput : null, // Salva e-mail se for e-mail
      password,
    };

    // Pega a lista de usuários cadastrados no localStorage
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Adiciona o novo usuário
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    alert("Conta criada com sucesso!");
    router.push("/home"); // Redireciona para a Home

    // Reseta os campos
    setUserInput("");
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
              id="userInput"
              className="login-input"
              placeholder=" " /* ⚠ Necessário para a animação funcionar */
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <label htmlFor="userInput" className="input-label">
              E-mail ou usuário
            </label>
          </div>

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"} // Troca entre texto e senha
              id="password"
              className="password-input"
              placeholder=" " /* ⚠ Necessário para a animação funcionar */
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" className="password-label">
              Senha
            </label>

            {/* Ícone de Mostrar/Ocultar Senha */}
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
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

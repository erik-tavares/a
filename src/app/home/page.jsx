"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/home.css";
import Sidebar from "../../components/Sidebar";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (storedUsers.length > 0) {
      // Recupera o último usuário logado
      const loggedUser =
        JSON.parse(localStorage.getItem("loggedUser")) ||
        storedUsers[storedUsers.length - 1];
      setUser(loggedUser);
    } else {
      router.push("/");
      return;
    }

    // Função para definir a saudação com base no horário atual
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting("Bom dia");
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting("Boa tarde");
      } else {
        setGreeting("Boa noite");
      }
    };

    updateGreeting(); // Atualiza ao montar o componente
    const interval = setInterval(updateGreeting, 60000); // Atualiza a cada 1 minuto

    setLoading(false); // Define que carregamento foi concluído

    return () => clearInterval(interval); // Remove intervalo ao desmontar
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("loggedUser");
      router.push("/");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  // Define o nome de exibição corretamente e transforma em maiúsculas
  const displayName = (
    user?.username || (user?.email ? user.email.split("@")[0] : "Usuário")
  ).toUpperCase();

  return (
    <>
      {/* Sidebar recebe o estado de aberto e a função para alternar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`home-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div className="home-greeting-container">
          <h1 className="home-greeting">
            {greeting}, {displayName}
          </h1>
          <p className="home-subtitle">
            Seja Bem-Vindo ao Sistema de Controle de Produção da{" "}
            <span>EMPRESA CLIENTE</span>.
          </p>
        </div>
        {/* Linha abaixo do subtítulo */}
        <hr className="subtitle-line" />
        <div className="help-container">
          <h2 className="help-title">Precisa de ajuda?</h2>

          <div className="help-options">
            <div className="help-card">
              <img src="/logo-help.svg" alt="Fale conosco" />
              <div className="help-text"></div>
            </div>

            <div className="help-card">
              <img src="/logo-video.svg" alt="Vídeos tutoriais" />
              <div className="help-text"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

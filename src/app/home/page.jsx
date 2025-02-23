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
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    } else {
      router.push("/");
    }

    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Bom dia");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Boa tarde");
    } else {
      setGreeting("Boa noite");
    }

    setLoading(false);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      router.push("/");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <>
      {/* Sidebar recebe o estado de aberto e a função para alternar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`home-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div className="home-greeting-container">
          <h1 className="home-greeting">
            {greeting}, {user?.email?.split("@")[0] || "Usuário"}!
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

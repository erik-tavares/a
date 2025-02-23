"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdFormatListBulleted } from "react-icons/md";
import { FiX } from "react-icons/fi"; // Ícone de fechar modal
import { FaBuilding, FaUser, FaSignOutAlt } from "react-icons/fa"; // Ícones das opções
import "../../styles/home.css";
import Sidebar from "../../components/Sidebar";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado da modal
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    let loggedUser = null;

    if (storedUsers.length > 0) {
      loggedUser =
        JSON.parse(localStorage.getItem("loggedUser")) ||
        storedUsers[storedUsers.length - 1];
      setUser(loggedUser);
    } else {
      router.push("/");
      return;
    }

    // Atualiza saudação com base no horário
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

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000); // Atualiza a cada 1 minuto

    // Aguarda processamento e então marca loading como false
    setLoading(false);

    return () => clearInterval(intervalId); // Limpa intervalo ao desmontar o componente
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

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  const displayName = (
    user?.username || (user?.email ? user.email.split("@")[0] : "Usuário")
  ).toUpperCase();

  return (
    <>
      {/* Header com botão do menu e ícone de configurações */}
      <div className="home-header">
        {/* Ícone no canto superior direito */}
        <button className="modal-button" onClick={toggleModal}>
          <MdFormatListBulleted size={20} />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Botão de fechar */}
            <button className="close-button" onClick={toggleModal}>
              <FiX size={18} />
            </button>
            {/* Opções dentro da modal */}
            <ul className="modal-options">
              <li>
                <FaBuilding /> Dados da Empresa
              </li>
              <li>
                <FaUser /> Dados do Usuário
              </li>
              <li onClick={handleLogout}>
                <FaSignOutAlt /> Sair
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Sidebar */}
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

        <hr className="subtitle-line" />

        <div className="help-container">
          <h2 className="help-title">Precisa de ajuda?</h2>
          <div className="help-options">
            <div className="help-card">
              <img src="/logo-help.svg" alt="Fale conosco" />
            </div>
            <div className="help-card">
              <img src="/logo-video.svg" alt="Vídeos tutoriais" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

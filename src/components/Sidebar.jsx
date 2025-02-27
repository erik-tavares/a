"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaChartBar,
  FaClipboardList,
  FaUser,
  FaCogs,
  FaBox,
  FaSearch,
  FaAlignLeft,
  FaIndustry,
  FaBoxes,
  FaClipboardCheck,
  FaFileAlt,
  FaChartLine,
  FaCheckSquare,
} from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FaTruckFront, FaBoxOpen } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import "../styles/sidebar.css";
import { Tooltip } from "react-tooltip"; // Correta importação do Tooltip
import "react-tooltip/dist/react-tooltip.css"; // Importação do CSS do tooltip
import { SlPeople } from "react-icons/sl";
import { LiaPalletSolid } from "react-icons/lia";

// Importação do CSS do tooltip
// ✅ Definição dos itens do menu principal
const menuItems = [
  {
    title: "Dashboard",
    icon: <FaHome />,
    link: "/home",
    submenu: [
      { title: "Visão Geral", icon: <FaChartBar />, link: "#" },
      { title: "Relatórios Gráficos", icon: <FaClipboardList />, link: "#" },
    ],
  },
  {
    title: "Cadastros",
    icon: <FaUser />,
    link: "#",
    submenu: [
      { title: "Operador", icon: <FaUser />, link: "/cadastro/operadores" },
      { title: "Máquina", icon: <FaCogs />, link: "/cadastro/maquinas" },
      { title: "Produto", icon: <FaBox />, link: "/cadastro/produto" },
      { title: "Motorista", icon: <SlPeople />, link: "/cadastro/motorista" },
      { title: "Clientes", icon: <SlPeople />, link: "/cadastro/clientes" },
      {
        title: "Paletizador",
        icon: <LiaPalletSolid />,
        link: "/cadastro/paletizador",
      },
    ],
  },
  {
    title: "Produções",
    icon: <FaIndustry />,
    link: "#",
    submenu: [
      {
        title: "Listar Produções",
        icon: <FaFileAlt />,
        link: "/producao",
      },
    ],
  },
  {
    title: "Suprimentos",
    icon: <FaBoxes />,
    link: "#",
    submenu: [
      {
        title: "Controle de Estoque",
        icon: <FaCheckSquare />,
        link: "/suprimentos",
      },
      { title: "Depósitos", icon: <FaBox />, link: "/suprimentos/deposito" },
    ],
  },
  {
    title: "Logística",
    icon: <FaTruckFront />,
    link: "#",
    submenu: [
      { title: "Entregas", icon: <FaBoxOpen />, link: "/logistica/entregas" },
      {
        title: "Manutenções",
        icon: <IoSettings />,
        link: "/logistica/manutencao",
      },
    ],
  },
  {
    title: "Relatórios",
    icon: <FaClipboardCheck />,
    link: "#",
    submenu: [
      { title: "Relatórios de Produção", icon: <FaFileAlt />, link: "#" },
      { title: "Análise de Desempenho", icon: <FaChartLine />, link: "#" },
      { title: "Controle de Qualidade", icon: <FaCheckSquare />, link: "#" },
    ],
  },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // Verifica se o usuário já está na Home
  const isHome = pathname === "/home";

  // Função para ir para a Home apenas se não estiver na Home
  const goToHome = () => {
    if (!isHome) {
      router.push("/home");
    }
  };

  // ✅ Mantém os menus abertos automaticamente se a rota ativa pertencer a um submenu
  const [openMenus, setOpenMenus] = useState(() => {
    const initialOpenMenus = {};

    menuItems.forEach((item, index) => {
      // ✅ Garante que o Dashboard sempre fique aberto
      if (item.title === "Dashboard") {
        initialOpenMenus[index] = true;
      }

      // ✅ Mantém o menu aberto se a rota ativa pertencer a um submenu
      if (
        item.submenu &&
        item.submenu.some((sub) => pathname.startsWith(sub.link))
      ) {
        initialOpenMenus[index] = true;
      }
    });

    return initialOpenMenus;
  });

  // ✅ Alterna a visibilidade dos menus ao clicar
  const toggleMenu = (index) => {
    setOpenMenus((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // ✅ Mantém a ordem original dos menus, mas destaca os submenus certos
  let filteredMenu;

  // ✅ Se estiver na Home, mostra todos os menus principais
  if (pathname === "/home") {
    filteredMenu = menuItems;
  } else {
    // ✅ Para outras páginas, exibe apenas o menu principal correspondente e o submenu certo
    const activeMenu = menuItems.find((menu) =>
      menu.submenu?.some((sub) => pathname.startsWith(sub.link))
    );

    if (activeMenu) {
      filteredMenu = [
        {
          ...activeMenu,
          submenu: activeMenu.submenu.filter((sub) =>
            pathname.startsWith(sub.link)
          ), // ✅ Exibe apenas o submenu correspondente
        },
      ];
    } else {
      filteredMenu = []; // Se não houver correspondência, esconde o menu
    }
  }

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* ✅ Botão de abrir/fechar */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* ✅ Cabeçalho */}
      <div className="sidebar-header">
        <div className="header-content">
          {/* Botão com Tooltip dinâmico */}
          <button
            className="menu-button"
            onClick={goToHome}
            data-tooltip-id="home-tooltip"
          >
            <FaHouse className="menu-icon" />
          </button>

          {/* Tooltip dinâmico com responsividade */}
          <Tooltip
            id="home-tooltip"
            place="right"
            effect="solid"
            style={{
              fontSize: "clamp(12px, 2vw, 16px)", // Fonte ajustável
              maxWidth: "200px", // Evita que ultrapasse a tela
              padding: "6px 10px", // Melhor espaçamento
              whiteSpace: "nowrap", // Evita que o texto quebre
            }}
          >
            {isHome ? "Você já está na Home" : "Voltar para a Home/Dashboard"}
          </Tooltip>

          <h2 className="sidebar-title">Painel Principal</h2>
        </div>
      </div>

      <hr className="sidebar-divider" />

      {/* ✅ Campo de Pesquisa */}
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Busca rápida..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* ✅ Menu */}
      <nav className="sidebar-menu">
        <ul>
          {filteredMenu.map((item, index) => {
            // ✅ Verifica se o menu principal ou um dos submenus está ativo
            const isActive =
              pathname.startsWith(item.link) ||
              (item.submenu &&
                item.submenu.some((sub) => pathname.startsWith(sub.link)));

            return (
              <li key={index}>
                {/* ✅ Link do menu principal */}
                <a
                  href={item.link}
                  className={`sidebar-button ${isActive ? "active" : ""} ${
                    openMenus[index] ? "open" : ""
                  }`}
                  onClick={() => toggleMenu(index)}
                >
                  {item.icon} {item.title}
                </a>

                {/* ✅ Renderiza o submenu se existir */}
                {item.submenu && (
                  <ul className={`submenu ${openMenus[index] ? "open" : ""}`}>
                    {item.submenu.map((sub, subIndex) => (
                      <li key={subIndex} className="submenu-item">
                        <a
                          href={sub.link}
                          className={
                            pathname.startsWith(sub.link) ? "active" : ""
                          }
                        >
                          {sub.icon} <span>{sub.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

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
import "../styles/sidebar.css";

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
      { title: "Produto", icon: <FaBox />, link: "/cadastro/produtos" },
    ],
  },
  {
    title: "Produções",
    icon: <FaIndustry />,
    link: "#",
    submenu: [{ title: "Listar Produções", icon: <FaFileAlt />, link: "#" }],
  },
  {
    title: "Suprimentos",
    icon: <FaBoxes />,
    link: "#",
    submenu: [
      { title: "Controle de Estoque", icon: <FaCheckSquare />, link: "#" },
      { title: "Depósitos", icon: <FaBox />, link: "#" },
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
  const pathname = usePathname(); // ✅ Obtém a rota atual corretamente
  const router = useRouter(); // Inicializando o Router do Next.js

  // Mantém o Dashboard sempre aberto
  const [openMenus, setOpenMenus] = useState(() => {
    const initialOpenMenus = {};
    menuItems.forEach((item, index) => {
      if (item.title === "Dashboard") {
        initialOpenMenus[index] = true; // Garante que o Dashboard esteja sempre aberto
      }
    });
    return initialOpenMenus;
  });

  const toggleMenu = (index) => {
    setOpenMenus((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleNavigation = (path) => {
    router.push(path); // Redirecionamento dinâmico
  };

  // ✅ Se estiver na home, marca automaticamente o Dashboard como ativo
  let filteredMenu = menuItems;

  // ✅ Se estiver dentro de qualquer sub-rota de "cadastro/operadores", mantém o menu "Cadastros"
  if (pathname.startsWith("/cadastro/operadores")) {
    const activeMenu = menuItems.find((menu) => menu.title === "Cadastros");

    if (activeMenu) {
      // 🔹 Filtramos quais submenus devem aparecer
      const allowedSubmenus = activeMenu.submenu.filter(
        (sub) => ["/cadastro/operadores", ""].includes(sub.link) //  Define quais rotas mostrar
      );

      filteredMenu = [{ ...activeMenu, submenu: allowedSubmenus }];
    }
  }

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Botão de abrir/fechar */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Cabeçalho */}
      <div className="sidebar-header">
        <div className="header-content">
          <FaAlignLeft className="menu-icon" />
          <h2 className="sidebar-title">Painel Principal</h2>
        </div>
      </div>

      <hr className="sidebar-divider" />

      {/* Campo de Pesquisa */}
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

      {/* Menu */}
      <nav className="sidebar-menu">
        <ul>
          {filteredMenu.map((item, index) => {
            // ✅ Verifica se o menu principal ou algum dos seus submenus está ativo
            const isActive =
              pathname.startsWith(item.link) ||
              (item.submenu &&
                item.submenu.some((sub) => pathname.startsWith(sub.link)));

            return (
              <li key={index}>
                <a
                  href={item.link}
                  className={`sidebar-button ${
                    item.link === "/" && pathname === "/" ? "active" : ""
                  } ${isActive ? "active" : ""} ${
                    openMenus[index] ? "open" : ""
                  }`}
                  onClick={() => toggleMenu(index)}
                >
                  {item.icon} {item.title}
                </a>
                {item.submenu && (
                  <ul className={`submenu ${openMenus[index] ? "open" : ""}`}>
                    {item.submenu.map((sub, subIndex) => (
                      <li key={subIndex} className="submenu-item">
                        <a
                          href={sub.link}
                          className={pathname === sub.link ? "active" : ""}
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar"; // ✅ Importa o Sidebar
import PaletizadorOptionsModal from "../../../components/PaletizadorModal";
import { FaEllipsisV, FaSearch } from "react-icons/fa";
import "../../../styles/paletizador.css";

export default function PaletizadorPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(""); // Estado da busca
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado do Sidebar
  const [statusFilter, setStatusFilter] = useState("todos"); // Filtro de status

  // Lista de operadores com status
  const [paletizador] = useState([
    { id: 1, nome: "Emmanuel", status: "ativo" },
    { id: 2, nome: "Juarez", status: "excluido" },
    { id: 3, nome: "Adriano", status: "inativo" },
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Filtragem de operadores
  const filteredPaletizador = paletizador.filter((paletizador) => {
    return (
      (statusFilter === "todos" || paletizador.status === statusFilter) &&
      paletizador.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  // ✅ Função para redirecionar para a tela de cadastro de operadores
  const handleAddOperator = () => {
    router.push("/cadastro/paletizador/novoPaletizador");
  };
  return (
    <div
      className={`paletizador-container ${isSidebarOpen ? "sidebar-open" : ""}`}
    >
      {/* ✅ Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="paletizador-content">
        {/* ✅ Cabeçalho */}
        <div className="paletizador-header">
          <h1 className="paletizador-title">Paletizador </h1>

          {/* ✅ Campo de pesquisa */}
          <div className="paletizador-form">
            <input
              type="text"
              placeholder="Pesquise por nome"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>

          {/* ✅ Botão de adicionar operador */}
          <button className="add-paletizador-btn" onClick={handleAddOperator}>
            Incluir paletizador
          </button>
        </div>

        {/* ✅ Filtros de status */}
        <div className="status-filters">
          <span
            className={statusFilter === "todos" ? "active" : ""}
            onClick={() => setStatusFilter("todos")}
          >
            todos
          </span>
          <span
            className={statusFilter === "ativo" ? "active" : ""}
            onClick={() => setStatusFilter("ativo")}
          >
            <img src="/icons/ativo.svg" alt="Ativos" className="status-icon" />{" "}
            ativos
          </span>
          <span
            className={statusFilter === "inativo" ? "active" : ""}
            onClick={() => setStatusFilter("inativo")}
          >
            <img
              src="/icons/inativo.svg"
              alt="Inativos"
              className="status-icon"
            />{" "}
            inativos
          </span>
          <span
            className={statusFilter === "excluido" ? "active" : ""}
            onClick={() => setStatusFilter("excluido")}
          >
            <img
              src="/icons/excluido.svg"
              alt="Excluídos"
              className="status-icon"
            />{" "}
            excluídos
          </span>
        </div>

        {/* ✅ Linha abaixo dos filtros */}
        <hr className="status-divider" />

        {/* ✅ Tabela */}
        <table className="paletizador-table">
          <thead>
            <tr>
              <th className="col-checkbox">
                <input type="checkbox" />
              </th>
              <th className="col-nome">Nome</th>
              <th className="col-status"></th> {/* Coluna para status */}
            </tr>
          </thead>
          <tbody>
            {filteredPaletizador.map((paletizador) => (
              <tr key={paletizador.id}>
                <td className="col-checkbox">
                  <input type="checkbox" />
                </td>
                <td className="col-nome">
                  <PaletizadorOptionsModal motorista={paletizador} />
                  {" paletizador"}
                  {paletizador.nome}
                </td>
                <td className="col-status">
                  <img
                    src={`/icons/${paletizador.status}.svg`}
                    alt={paletizador.status}
                    className="status-icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

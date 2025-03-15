"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar"; // ✅ Importa o Sidebar
import "../../../styles/deposito.css";
import { FaEllipsisV, FaSearch } from "react-icons/fa";
import ModalOptionsDeposito from "@/components/ModalOptionsDeposito";

export default function depositoPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(""); // Estado da busca
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado do Sidebar
  const [statusFilter, setStatusFilter] = useState("todos"); // Filtro de status

  // Lista de operadores com status
  const [operadores] = useState([
    { id: 1, nome: "Padrão", status: "ativo" },
    { id: 2, nome: "Matéria-Prima", status: "excluido" },
    { id: 3, nome: "Produtos", status: "inativo" },
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Filtragem de operadores
  const filteredOperadores = operadores.filter((operador) => {
    return (
      (statusFilter === "todos" || operador.status === statusFilter) &&
      operador.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  // ✅ Função para redirecionar para a tela de cadastro do Depósito "reeaproveitamento da tela de operadores"
  const handleAddDeposito = () => {
    router.push("/suprimentos/deposito/incluirDeposito");
  };
  return (
    <div
      className={`operadores-container ${isSidebarOpen ? "sidebar-open" : ""}`}
    >
      {/* ✅ Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="operadores-content">
        {/* ✅ Cabeçalho */}
        <div className="operadores-header">
          <h1 className="operadores-title">Depósitos</h1>

          {/* ✅ Campo de pesquisa */}
          <div className="operadores-form">
            <input
              type="text"
              placeholder="Pesquise por Modelo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>

          {/* ✅ Botão de adicionar operador */}
          <button className="add-operator-btn" onClick={handleAddDeposito}>
            Incluir Depósito
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
        <table className="operadores-table">
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
            {filteredOperadores.map((operador) => (
              <tr key={operador.id}>
                <td className="col-checkbox">
                  <input type="checkbox" />
                </td>
                <td className="col-nome">
                  <ModalOptionsDeposito className="action-icon" />{" "}
                  {operador.nome}
                </td>
                <td className="col-status">
                  <img
                    src={`/icons/${operador.status}.svg`}
                    alt={operador.status}
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar"; // ✅ Importa o Sidebar
import "../../../styles/operadores.css";
import { FaEllipsisV, FaSearch } from "react-icons/fa";
import ModalOptionsOperador from "@/components/ModalOptionsOperador";

export default function OperadoresPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(""); // Estado da busca
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado do Sidebar
  const [statusFilter, setStatusFilter] = useState("todos"); // Filtro de status
  const [selecionarTodos, setSelecionarTodos] = useState(false);
  const [checkboxesSelecionados, setCheckboxesSelecionados] = useState({});

  // Lista de operadores com status
  const [operadores] = useState([
    { id: 1, nome: "Emmanuel", status: "ativo" },
    { id: 2, nome: "Juarez", status: "excluido" },
    { id: 3, nome: "Adriano", status: "inativo" },
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
  // ✅ Função para redirecionar para a tela de cadastro de operadores
  const handleAddOperator = () => {
    router.push("/cadastro/operadores/novoOperador");
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
          <h1 className="operadores-title">Operadores</h1>

          {/* ✅ Campo de pesquisa */}
          <div className="operadores-form">
            <input
              type="text"
              placeholder="Pesquise por nome"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>

          {/* ✅ Botão de adicionar operador */}
          <button className="add-operator-btn" onClick={handleAddOperator}>
            Incluir operador
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
                <input
                  type="checkbox"
                  checked={selecionarTodos}
                  onChange={(e) => {
                    const marcado = e.target.checked;
                    setSelecionarTodos(marcado);

                    const novoEstado = {};
                    filteredOperadores.forEach((operador) => {
                      novoEstado[operador.id] = marcado;
                    });

                    setCheckboxesSelecionados(novoEstado);
                  }}
                />
              </th>
              <th className="col-nome">Nome</th>
              <th className="col-status"></th> {/* Coluna para status */}
            </tr>
          </thead>
          <tbody>
            {filteredOperadores.map((operador) => (
              <tr key={operador.id}>
                <td className="col-checkbox">
                  <input
                    type="checkbox"
                    checked={checkboxesSelecionados[operador.id] || false}
                    onChange={(e) => {
                      const novoEstado = {
                        ...checkboxesSelecionados,
                        [operador.id]: e.target.checked,
                      };

                      setCheckboxesSelecionados(novoEstado);

                      const todosSelecionados = filteredOperadores.every(
                        (operador) => novoEstado[operador.id]
                      );

                      setSelecionarTodos(todosSelecionados);
                    }}
                  />
                </td>
                <td className="col-nome">
                  <ModalOptionsOperador className="action-icon" />{" "}
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

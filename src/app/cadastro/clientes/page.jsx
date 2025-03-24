"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar"; // ✅ Importa o Sidebar
import ClientesOptionsModal from "../../../components/ModalClientes";
import { FaEllipsisV, FaSearch } from "react-icons/fa";
import "../../../styles/clientes.css";

export default function ClientesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(""); // Estado da busca
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado do Sidebar
  const [statusFilter, setStatusFilter] = useState("todos"); // Filtro de status
  const [selecionarTodos, setSelecionarTodos] = useState(false);
  const [checkboxesSelecionados, setCheckboxesSelecionados] = useState({});

  // Lista de operadores com status
  const [clientes] = useState([
    { id: 1, nome: "Emmanuel", status: "ativo" },
    { id: 2, nome: "Juarez", status: "excluido" },
    { id: 3, nome: "Adriano", status: "inativo" },
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Filtragem de operadores
  const filteredclientes = clientes.filter((clientes) => {
    return (
      (statusFilter === "todos" || clientes.status === statusFilter) &&
      clientes.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  // ✅ Função para redirecionar para a tela de cadastro de operadores
  const handleAddOperator = () => {
    router.push("/cadastro/clientes/novoCliente");
  };
  return (
    <div
      className={`clientes-container ${isSidebarOpen ? "sidebar-open" : ""}`}
    >
      {/* ✅ Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="clientes-content">
        {/* ✅ Cabeçalho */}
        <div className="clientes-header">
          <h1 className="clientes-title">Clientes</h1>

          {/* ✅ Campo de pesquisa */}
          <div className="clientes-form">
            <input
              type="text"
              placeholder="Pesquise por nome"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>

          {/* ✅ Botão de adicionar operador */}
          <button className="add-client-btn" onClick={handleAddOperator}>
            Incluir Cliente
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
        <table className="clientes-table">
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
                    filteredclientes.forEach((cliente) => {
                      novoEstado[cliente.id] = marcado;
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
            {filteredclientes.map((clientes) => (
              <tr key={clientes.id}>
                <td className="col-checkbox">
                  <input
                    type="checkbox"
                    checked={checkboxesSelecionados[clientes.id] || false}
                    onChange={(e) => {
                      const novoEstado = {
                        ...checkboxesSelecionados,
                        [clientes.id]: e.target.checked,
                      };

                      setCheckboxesSelecionados(novoEstado);

                      const todosSelecionados =
                        filteredclientes.length > 0 &&
                        filteredclientes.every(
                          (cliente) => novoEstado[cliente.id]
                        );

                      setSelecionarTodos(todosSelecionados);
                    }}
                  />
                </td>
                <td className="col-nome">
                  <ClientesOptionsModal motorista={clientes} /> {clientes.nome}
                </td>
                <td className="col-status">
                  <img
                    src={`/icons/${clientes.status}.svg`}
                    alt={clientes.status}
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

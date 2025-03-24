"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar"; // ✅ Importa o Sidebar
import MaquinasOptionsModal from "../../../components/ModalMaquinas";
import { FaEllipsisV, FaSearch } from "react-icons/fa";
import "../../../styles/maquina.css";

export default function MaquinasPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(""); // Estado da busca
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado do Sidebar
  const [statusFilter, setStatusFilter] = useState("todos"); // Filtro de status
  const [selecionarTodos, setSelecionarTodos] = useState(false);
  const [checkboxesSelecionados, setCheckboxesSelecionados] = useState({});

  // Lista de operadores com status
  const [maquinas] = useState([
    { id: 1, nome: "HTX 900-01", status: "ativo" },
    { id: 2, nome: "HTX 900-02", status: "excluido" },
    { id: 3, nome: "HTX 900-03", status: "inativo" },
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Filtragem de operadores
  const filteredmaquinas = maquinas.filter((maquinas) => {
    return (
      (statusFilter === "todos" || maquinas.status === statusFilter) &&
      maquinas.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  // ✅ Função para redirecionar para a tela de cadastro de operadores
  const handleAddOperator = () => {
    router.push("/cadastro/maquinas/novaMaquina");
  };
  return (
    <div
      className={`maquinas-container ${isSidebarOpen ? "sidebar-open" : ""}`}
    >
      {/* ✅ Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="maquinas-content">
        {/* ✅ Cabeçalho */}
        <div className="maquinas-header">
          <h1 className="maquinas-title">Maquinas</h1>

          {/* ✅ Campo de pesquisa */}
          <div className="maquinas-form">
            <input
              type="text"
              placeholder="Pesquise por Modelo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>

          {/* ✅ Botão de adicionar operador */}
          <button className="add-client-btn" onClick={handleAddOperator}>
            Incluir Máquina
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
        <table className="maquinas-table">
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
                    filteredmaquinas.forEach((maq) => {
                      novoEstado[maq.id] = marcado;
                    });

                    setCheckboxesSelecionados(novoEstado);
                  }}
                />
              </th>
              <th className="col-nome"> Modelo</th>
              <th className="col-status"></th> {/* Coluna para status */}
            </tr>
          </thead>
          <tbody>
            {filteredmaquinas.map((maquinas) => (
              <tr key={maquinas.id}>
                <td className="col-checkbox">
                  <input
                    type="checkbox"
                    checked={checkboxesSelecionados[maquinas.id] || false}
                    onChange={(e) => {
                      const novoEstado = {
                        ...checkboxesSelecionados,
                        [maquinas.id]: e.target.checked,
                      };

                      setCheckboxesSelecionados(novoEstado);

                      const todosSelecionados =
                        filteredmaquinas.length > 0 &&
                        filteredmaquinas.every((maq) => novoEstado[maq.id]);

                      setSelecionarTodos(todosSelecionados);
                    }}
                  />
                </td>
                <td className="col-nome">
                  <MaquinasOptionsModal maquinas={maquinas} /> {maquinas.nome}
                </td>
                <td className="col-status">
                  <img
                    src={`/icons/${maquinas.status}.svg`}
                    alt={maquinas.status}
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

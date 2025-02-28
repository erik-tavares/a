"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import VeiculosOptionsModal from "../../../components/ModalVeiculos";
import { FaEllipsisV, FaSearch } from "react-icons/fa";
import "../../../styles/veiculo.css";

export default function VeiculoPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("todos"); // Estado para filtragem

  const [veiculos] = useState([
    {
      id: 1,
      modelo: "26-260",
      placa: "SOA3C45",
      marca: "VW",
      ano: 2024,
      tipo: "Caminhão",
      status: "#00BCC2", // Ativo
    },
    {
      id: 2,
      modelo: "FH400",
      placa: "IOB6345",
      marca: "Volvo",
      ano: 2008,
      tipo: "Cavalo Mecânico",
      status: "#E04545", // Excluído
    },
    {
      id: 3,
      modelo: "1635 LS",
      placa: "PCR4C04",
      marca: "Mercedes Benz",
      ano: 2018,
      tipo: "Cavalo Mecânico",
      status: "#A5A5A5", // Inativo
    },
  ]);

  // ✅ Atualiza o filtro de status
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  // ✅ Filtra os veículos com base no status selecionado
  const filteredVeiculos = veiculos.filter((veiculo) => {
    return statusFilter === "todos" || veiculo.status === statusFilter;
  });

  const handleNovoVeiculo = () => {
    router.push("/cadastro/veiculos/novoVeiculo");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className={`veiculos-container ${isSidebarOpen ? "sidebar-open" : ""}`}
    >
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="veiculos-content">
        {/* ✅ Cabeçalho */}
        <div className="veiculos-header">
          <h1 className="veiculos-title">Veículos</h1>

          {/* ✅ Campo de pesquisa */}
          <div className="veiculos-form">
            <input
              type="text"
              placeholder="Pesquise por Modelo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>

          {/* ✅ Botão de adicionar veículo */}
          <button className="add-client-btn" onClick={handleNovoVeiculo}>
            Incluir veículo
          </button>
        </div>

        {/* ✅ Filtro por status */}
        <div className="status-filters">
          <span
            className={statusFilter === "todos" ? "active" : ""}
            onClick={() => handleStatusFilter("todos")}
          >
            todos
          </span>
          <span
            className={statusFilter === "#00BCC2" ? "active" : ""}
            onClick={() => handleStatusFilter("#00BCC2")}
          >
            <img src="/icons/ativo.svg" alt="Ativos" className="status-icon" />{" "}
            ativos
          </span>
          <span
            className={statusFilter === "#A5A5A5" ? "active" : ""}
            onClick={() => handleStatusFilter("#A5A5A5")}
          >
            <img
              src="/icons/inativo.svg"
              alt="Inativos"
              className="status-icon"
            />{" "}
            inativos
          </span>
          <span
            className={statusFilter === "#E04545" ? "active" : ""}
            onClick={() => handleStatusFilter("#E04545")}
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

        {/* ✅ Tabela de veículos */}
        <table className="veiculos-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Modelo</th>
              <th>Placa</th>
              <th>Marca</th>
              <th>Ano</th>
              <th>Tipo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredVeiculos.map((veiculo) => (
              <tr key={veiculo.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <VeiculosOptionsModal veiculo={veiculo} /> {veiculo.modelo}
                </td>
                <td>{veiculo.placa}</td>
                <td>{veiculo.marca}</td>
                <td>{veiculo.ano}</td>
                <td>{veiculo.tipo}</td>
                <td>
                  <span
                    style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: veiculo.status,
                    }}
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

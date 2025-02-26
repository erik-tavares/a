"use client";

import { useState } from "react";
import { FaPlus, FaCalendarAlt } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import "../../../styles/manutencao.css";
import { useRouter } from "next/navigation"; // ✅ Importando o roteamento
export default function Manutencao() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [statusSelecionado, setStatusSelecionado] = useState("todos");
  const [placaPesquisa, setPlacaPesquisa] = useState("");
  const router = useRouter(); // ✅ Instanciando o roteador
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // ✅ Função para navegar até a página de nova manutenção
  const handleNovaManutencao = () => {
    router.push("/logistica/manutencao/novaManutencao");
  };
  const manutencoes = [...Array(10)].map((_, index) => ({
    num: index + 1,
    data: `0${index + 1}/01/2025`,
    placa: index % 2 === 0 ? "HTX 900-01" : "HTX 900-02",
    km: "09:00:25",
    motorista: index % 2 === 0 ? "Juarez" : "Emmanuel",
    componente: [
      "VIBROPRENSA",
      "CENTRAL DOSADORA",
      "MISTURADOR",
      "ROBÔ PALETIZADOR",
      "ESTEIRA 1 MISTURADOR",
      "CARRINHO DAS TÁBUAS",
      "PARAFUSO DO CONTRA MOLDE",
      "CORREIA DA EXTRATORA",
      "PAINEL CLP",
    ][index % 9],
    tipo:
      index % 3 === 0 ? "CORRETIVA" : index % 2 === 0 ? "AJUSTE" : "PREVENTIVA",
    valor: ["00:30", "01:00", "00:15", "00:35", "00:17"][index % 5],
    status:
      index % 3 === 0
        ? "finalizada"
        : index % 2 === 0
        ? "em andamento"
        : "pendente",
  }));

  // 🛠 Filtragem por status e placa
  const manutencoesFiltradas = manutencoes
    .filter(
      (m) => statusSelecionado === "todos" || m.status === statusSelecionado
    )
    .filter((m) => m.placa.toLowerCase().includes(placaPesquisa.toLowerCase()));

  return (
    <div
      className={`manutencao-container ${isSidebarOpen ? "sidebar-open" : ""}`}
    >
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="manutencao-content">
        {/* ✅ Cabeçalho */}
        <div className="manutencao-header">
          <h1 className="manutencao-title">Manutenções</h1>
          <button className="incluir-manutencao" onClick={handleNovaManutencao}>
            <FaPlus /> incluir manutenção
          </button>
        </div>

        {/* ✅ Filtros */}
        <div className="filtros">
          <input
            type="text"
            placeholder="Pesquise por placa"
            className="input-busca-placa"
            value={placaPesquisa}
            onChange={(e) => setPlacaPesquisa(e.target.value)}
          />
          <button className="filtro-botao">
            <FaCalendarAlt /> por período
          </button>
        </div>

        {/* ✅ Abas de status */}
        <div className="status-filtros">
          <span
            className={`status-todos ${
              statusSelecionado === "todos" ? "ativo" : ""
            }`}
            onClick={() => setStatusSelecionado("todos")}
          >
            todos
          </span>
          <span
            className={`status-andamento ${
              statusSelecionado === "em andamento" ? "ativo" : ""
            }`}
            onClick={() => setStatusSelecionado("em andamento")}
          >
            ● em andamento
          </span>
          <span
            className={`status-finalizada ${
              statusSelecionado === "finalizada" ? "ativo" : ""
            }`}
            onClick={() => setStatusSelecionado("finalizada")}
          >
            ● finalizada
          </span>
          <span
            className={`status-pendente ${
              statusSelecionado === "pendente" ? "ativo" : ""
            }`}
            onClick={() => setStatusSelecionado("pendente")}
          >
            ● pendente
          </span>
        </div>

        <hr className="status-divider" />

        {/* ✅ Tabela de Manutenção */}
        <div className="tabela-manutencao-container">
          <table className="tabela-manutencao">
            <thead>
              <tr>
                <th></th>
                <th>Num</th>
                <th>Data</th>
                <th>Placa</th>
                <th>Km</th>
                <th>Motorista</th>
                <th>Componente</th>
                <th>Tipo da Manutenção</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {manutencoesFiltradas.map((manutencao, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className="acoes">
                    <img
                      src="/3pontos.svg"
                      alt="Opções"
                      className="menu-acoes"
                    />
                    {manutencao.num}
                  </td>
                  <td>{manutencao.data}</td>
                  <td>{manutencao.placa}</td>
                  <td>{manutencao.km}</td>
                  <td>{manutencao.motorista}</td>
                  <td>{manutencao.componente}</td>
                  <td>{manutencao.tipo}</td>
                  <td>
                    {manutencao.valor}{" "}
                    <span
                      className={`status-indicador ${
                        manutencao.status === "finalizada"
                          ? "verde"
                          : manutencao.status === "em andamento"
                          ? "azul"
                          : "vermelho"
                      }`}
                    ></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Paginação */}
        <div className="paginacao">
          <span>01</span>
          <span>02</span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
}

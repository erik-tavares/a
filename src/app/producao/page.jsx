"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ModalOptionsProducao from "@/components/ModalProducao";
import {
  FaPrint,
  FaCalendarAlt,
  FaIndustry,
  FaFileAlt,
  FaEllipsisV,
} from "react-icons/fa";
import "../../styles/listarProducao.css";

export default function ListaDeProducao() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filtroPeriodo, setFiltroPeriodo] = useState("");
  const [statusSelecionado, setStatusSelecionado] = useState("todos");
  const [exibirOpcoesPeriodo, setExibirOpcoesPeriodo] = useState(false); // ✅ Estado para exibir as opções do período
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const togglePeriodo = () => {
    setExibirOpcoesPeriodo(!exibirOpcoesPeriodo);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const producoes = [...Array(10)].map((_, index) => ({
    num: index + 1,
    data: `2025-01-${String(index + 1).padStart(2, "0")}`,
    maquina: index % 2 === 0 ? "HTX 900-01" : "HTX 900-02",
    operador: index % 2 === 0 ? "Juarez" : "Emmanuel",
    receita:
      index % 2 === 0
        ? "PISO INTERTRAVADO H8 - 10X20X8"
        : "BLOCO DE CONCRETO - 19X19X39",
    quantidade: index % 3 === 0 ? "700" : "0",
    unidade: index % 2 === 0 ? "M²" : "UND",
    indice: index % 3 === 0 ? "1,5 %" : "0 %",
    status:
      index % 3 === 0
        ? "finalizada"
        : index % 2 === 0
        ? "em andamento"
        : "em aberto",
  }));

  const producoesFiltradas = producoes.filter((p) => {
    const statusMatch =
      statusSelecionado === "todos" || p.status === statusSelecionado;
    const periodoMatch = !filtroPeriodo || p.data === filtroPeriodo;
    return statusMatch && periodoMatch;
  });

  return (
    <div
      className={`lista-producao-container ${
        isSidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="lista-producao-content">
        <div className="lista-producao-header">
          <h1 className="lista-producao-title">Produções</h1>
          <button
            className="print-button"
            onClick={() => router.push("/producao/producoes")}
          >
            <FaPrint /> imprimir
          </button>
        </div>

        <div className="filtros">
          <input
            type="text"
            placeholder="Pesquise por máquina ou código"
            className="procurar"
          />
          <input
            type="date"
            className="periodo-button"
            value={filtroPeriodo}
            onClick={togglePeriodo}
            onChange={(e) => setFiltroPeriodo(e.target.value)}
          />
        </div>

        {/* ✅ Opções de Filtro de Período */}
        {exibirOpcoesPeriodo && (
          <div className="periodo-opcoes">
            <p>Período</p>
            <button className="periodo-btn">Sem Filtro</button>
            <button className="periodo-btn">Do Dia</button>
            <button className="periodo-btn">Do Mês</button>
            <button className="periodo-btn">Do Intervalo</button>
          </div>
        )}

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
            className={`status-aberto ${
              statusSelecionado === "em aberto" ? "ativo" : ""
            }`}
            onClick={() => setStatusSelecionado("em aberto")}
          >
            ● em aberto
          </span>
          <span
            className={`status-finalizada ${
              statusSelecionado === "finalizada" ? "ativo" : ""
            }`}
            onClick={() => setStatusSelecionado("finalizada")}
          >
            ● finalizada
          </span>
        </div>

        {/* ✅ Linha separadora abaixo do filtro de status */}
        <hr className="status-divider" />

        <div className="tabela-produtos-container">
          <table className="tabela-produtos">
            <thead>
              <tr>
                <th>Num</th>
                <th></th>
                <th>Data</th>
                <th>Máquina</th>
                <th>Operador</th>
                <th>Receita</th>
                <th>Quant</th>
                <th>Un</th>
                <th>Índice</th>
              </tr>
            </thead>
            <tbody>
              {producoesFiltradas.map((producao) => (
                <tr key={producao.num}>
                  <td>
                    <input type="checkbox" /> {producao.num}
                  </td>
                  {/* ✅ Agora a modal abre ao clicar no TD */}
                  <td className="acoes" onClick={toggleModal}>
                    <img
                      src="/3pontos.svg"
                      alt="Opções"
                      className="menu-acoes"
                    />
                  </td>
                  <td>{producao.data}</td>
                  <td>{producao.maquina}</td>
                  <td>{producao.operador}</td>
                  <td>{producao.receita}</td>
                  <td>{producao.quantidade}</td>
                  <td>{producao.unidade}</td>
                  <td>{producao.indice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="paginacao">
          <span>01</span>
          <span>02</span>
          <span>→</span>
        </div>
      </div>
      {/* ✅ Modal de Produção */}
      <ModalOptionsProducao isOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
}

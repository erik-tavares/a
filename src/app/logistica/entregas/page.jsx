"use client";

import { useState } from "react";
import { FaPlus, FaCalendarAlt } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import DatePicker from "react-datepicker"; // Importando o calendário
import "react-datepicker/dist/react-datepicker.css"; // Estilos do calendário
import "../../../styles/entregas.css";
import { useRouter } from "next/navigation"; // ✅ Importando useRouter

export default function Entregas() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [statusSelecionado, setStatusSelecionado] = useState("todos");
  const [dataFiltro, setDataFiltro] = useState(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState(""); // Estado para pesquisa
  const router = useRouter(); // ✅ Criando a instância do router
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const entregas = [...Array(10)].map((_, index) => ({
    num: index + 1,
    data: new Date(2025, 0, index + 1),
    placa: index % 2 === 0 ? "HTX 900-01" : "HTX 900-02",
    motorista: index % 2 === 0 ? "Juarez" : "Emmanuel",
    cliente:
      index % 2 === 0
        ? "PISO INTERTRAVADO H8 - 10X20X8"
        : "BLOCO DE CONCRETO - 19X19X39",
    pedido: index % 3 === 0 ? "700" : "0",
    nfe: index % 2 === 0 ? "M²" : "UND",
    frete: index % 3 === 0 ? "1,5 %" : "0 %",
    status:
      index % 3 === 0
        ? "finalizada"
        : index % 2 === 0
        ? "em andamento"
        : "pendente",
  }));
  const handleNovaEntrega = () => {
    router.push("/logistica/entregas/novaEntrega"); // ✅ Redirecionamento ao clicar no botão
  };
  // ✅ Função de filtragem
  const entregasFiltradas = entregas.filter((entrega) => {
    const statusMatch =
      statusSelecionado === "todos" || entrega.status === statusSelecionado;
    const dataMatch = dataFiltro
      ? entrega.data.toDateString() === dataFiltro.toDateString()
      : true;

    // ✅ Filtro de pesquisa (placa ou cliente)
    const pesquisaMatch = termoPesquisa
      ? entrega.placa.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        entrega.cliente.toLowerCase().includes(termoPesquisa.toLowerCase())
      : true;

    return statusMatch && dataMatch && pesquisaMatch;
  });

  return (
    <div
      className={`entregas-container ${isSidebarOpen ? "sidebar-open" : ""}`}
    >
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="entregas-content">
        {/* ✅ Cabeçalho */}
        <div className="entregas-header">
          <h1 className="entregas-title">Entregas</h1>
          <button className="incluir-entrega" onClick={handleNovaEntrega}>
            <FaPlus /> incluir entrega
          </button>
        </div>

        {/* ✅ Filtros */}
        <div className="filtros">
          <input
            type="text"
            placeholder="Pesquise por placa ou cliente"
            className="procurar"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)} // Atualiza o estado de pesquisa
          />

          {/* ✅ Filtro de data */}
          <div className="filtro-data">
            <button
              className="filtro-botao"
              onClick={() => setMostrarCalendario(!mostrarCalendario)}
            >
              <FaCalendarAlt /> por período
            </button>
            {mostrarCalendario && (
              <DatePicker
                selected={dataFiltro}
                onChange={(date) => {
                  setDataFiltro(date);
                  setMostrarCalendario(false);
                }}
                dateFormat="dd/MM/yyyy"
                className="date-picker"
                inline
              />
            )}
          </div>
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
        </div>

        <hr className="status-divider" />

        {/* ✅ Tabela de Entregas */}
        <div className="tabela-entregas-container">
          <table className="tabela-entregas">
            <thead>
              <tr>
                <th></th>
                <th>Num</th>
                <th>Data</th>
                <th>Placa</th>
                <th>Motorista</th>
                <th>Cliente</th>
                <th>Pedido</th>
                <th>NF-e</th>
                <th>Frete</th>
              </tr>
            </thead>
            <tbody>
              {entregasFiltradas.length > 0 ? (
                entregasFiltradas.map((entrega, index) => (
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
                      {entrega.num}
                    </td>
                    <td>{entrega.data.toLocaleDateString("pt-BR")}</td>
                    <td>{entrega.placa}</td>
                    <td>{entrega.motorista}</td>
                    <td>{entrega.cliente}</td>
                    <td>{entrega.pedido}</td>
                    <td>{entrega.nfe}</td>
                    <td>
                      {entrega.frete}{" "}
                      <span
                        className={`status-indicador ${
                          entrega.status === "finalizada"
                            ? "verde"
                            : entrega.status === "em andamento"
                            ? "azul"
                            : "vermelho"
                        }`}
                      ></span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="sem-resultados">
                    Nenhuma entrega encontrada para este filtro.
                  </td>
                </tr>
              )}
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

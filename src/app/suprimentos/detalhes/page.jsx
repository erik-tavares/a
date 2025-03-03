"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";
import "../../../styles/detalhes.css";

export default function DetalhesProduto() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState("lançamentos");
  const searchParams = useSearchParams();
  const codigo = searchParams.get("codigo"); // Obtém o código da URL
  const [descricao, setDescricao] = useState("");
  const [exibirOpcoesOrdenacao, setExibirOpcoesOrdenacao] = useState(false); // ✅ Estado para exibir opções de ordenação
  const [exibirOpcoesSituacao, setExibirOpcoesSituacao] = useState(false); // ✅ Estado para exibir filtros de situação

  // ✅ Alternar exibição dos botões de ordenação
  const toggleOrdenacao = () => {
    setExibirOpcoesOrdenacao(!exibirOpcoesOrdenacao);
  };

  // ✅ Alternar exibição dos filtros de situação
  const toggleSituacao = () => {
    setExibirOpcoesSituacao(!exibirOpcoesSituacao);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  const produtos = [
    { descricao: "BLOCO DE CONCRETO - 19X19X39", codigo: 1 },
    { descricao: "BLOCO DE CONCRETO - 14X19X39", codigo: 2 },
    { descricao: "BLOCO DE CONCRETO - 09X19X39", codigo: 3 },
    { descricao: "CANALETA DE CONCRETO - 19X19X39", codigo: 4 },
    { descricao: "CANALETA DE CONCRETO - 14X19X39", codigo: 5 },
    { descricao: "CANALETA DE CONCRETO - 09X19X39", codigo: 6 },
    { descricao: "PISO INTERTRAVADO H8 - 10X20X8", codigo: 7 },
    { descricao: "PISO INTERTRAVADO H6 - 10X20X6", codigo: 8 },
    { descricao: "PISO INTERTRAVADO H4 - 10X20X4", codigo: 9 },
    { descricao: "MEIO-FIO - 10X12X30X50", codigo: 10 },
  ];

  useEffect(() => {
    if (codigo) {
      const produtoSelecionado = produtos.find(
        (p) => p.codigo === Number(codigo)
      );
      if (produtoSelecionado) {
        setDescricao(produtoSelecionado.descricao);
      }
    }
  }, [codigo]);

  const lancamentos = [...Array(10)].map((_, index) => ({
    dataHora: "11/02/2025 - 13:58",
    entrada: index + 1,
    saida: index % 2 === 0 ? "12000" : "",
    custo: "1,50",
    observacao: "12000",
  }));

  const lotes = [...Array(10)].map((_, index) => ({
    dataFabricacao: "11/02/2025",
    numeroLote: `11022025-${index + 1}`,
    primeiraLinha: "12000",
    segundaLinha: "12000",
    estoqueTotal: "12000",
  }));

  return (
    <div
      className={`detalhes-container ${isSidebarOpen ? "sidebar-open" : ""}`}
    >
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="detalhes-content">
        {/* ✅ Cabeçalho */}
        <div className="detalhes-header">
          <h1 className="detalhes-title">
            {descricao || "Produto não encontrado"}
          </h1>
          <button className="incluir-lancamento" onClick={toggleRightSidebar}>
            <FaPlus /> incluir lançamento
          </button>
        </div>

        {/* ✅ Sidebar Direito */}
        <RightSidebar isOpen={isRightSidebarOpen} toggle={toggleRightSidebar} />
      </div>

      {/* ✅ Filtros */}
      <div className="filtros">
        <button className="filtro-botao">depósito Geral</button>
        <button className="filtro-botao" onClick={toggleOrdenacao}>
          por período
        </button>
        <button className="filtro-botao" onClick={toggleSituacao}>
          por tipo
        </button>
        <button className="filtro-botao limpar">limpar filtros</button>
      </div>

      {exibirOpcoesOrdenacao && (
        <div className="ordenacao-opcoes">
          <label>Ordenar por:</label>
          <button className="ordenacao-btn">Sem filtro</button>
          <button className="ordenacao-btn">Do dia</button>
          <button className="ordenacao-btn">Do mês</button>
          <button className="ordenacao-btn">Do intervalo</button>
        </div>
      )}

      {/* ✅ Opções de filtro de situação */}
      {exibirOpcoesSituacao && (
        <div className="situacao-opcoes">
          <label>Situação: </label>
          <button className="situacao-btn">Sem Filtro</button>
          <button className="situacao-btn">Entrada</button>
          <button className="situacao-btn">Saída</button>
          <button className="situacao-btn">Balanço</button>
        </div>
      )}

      {/* ✅ Tabs de lançamentos e lotes */}
      <div className="tabs">
        <span
          className={`tab ${abaSelecionada === "lançamentos" ? "ativo" : ""}`}
          onClick={() => setAbaSelecionada("lançamentos")}
        >
          lançamentos
        </span>
        <span
          className={`tab ${abaSelecionada === "lotes" ? "ativo" : ""}`}
          onClick={() => setAbaSelecionada("lotes")}
        >
          lotes
        </span>
      </div>

      <hr className="status-divider" />

      {/* ✅ Conteúdo Dinâmico das Abas */}
      {abaSelecionada === "lançamentos" ? (
        <div className="tabela-lancamentos-container">
          {/* ✅ Saldo Atual */}
          <span className="vinte">20</span>
          <div className="saldo-atual">saldo atual</div>
          <table className="tabela-lancamentos">
            <thead>
              <tr>
                <th></th>
                <th>Data e hora</th>
                <th>Entrada</th>
                <th>Saída</th>
                <th>Custo</th>
                <th>Observação</th>
              </tr>
            </thead>
            <tbody>
              {lancamentos.map((lancamento, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src="/3pontos.svg"
                      alt="Opções"
                      className="menu-acoes"
                    />
                  </td>
                  <td>{lancamento.dataHora}</td>
                  <td>{lancamento.entrada}</td>
                  <td>{lancamento.saida}</td>
                  <td>{lancamento.custo}</td>
                  <td>{lancamento.observacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="tabela-lancamentos-container">
          <table className="tabela-lancamentos">
            <thead>
              <tr>
                <th>Data da Fabricação</th>
                <th>Número do lote</th>
                <th>Primeira Linha</th>
                <th>Segunda Linha</th>
                <th>Estoque Total</th>
              </tr>
            </thead>
            <tbody>
              {lotes.map((lote, index) => (
                <tr key={index}>
                  <td>{lote.dataFabricacao}</td>
                  <td>{lote.numeroLote}</td>
                  <td>{lote.primeiraLinha}</td>
                  <td>{lote.segundaLinha}</td>
                  <td>{lote.estoqueTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Rodapé de paginação e totais */}
      <div className="paginacao">
        <span>01</span>
        <span>02</span>
        <span>→</span>
      </div>
    </div>
  );
}

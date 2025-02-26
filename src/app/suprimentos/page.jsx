"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { FaPrint } from "react-icons/fa";
import "../../styles/suprimentos.css";
import { useRouter } from "next/navigation"; // Importação para navegação
export default function ControleDeEstoques() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter(); // Hook para navegação
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const produtos = [
    {
      descricao: "BLOCO DE CONCRETO - 19X19X39",
      codigo: 1,
      custo: "2,45",
      unidade: "UND",
      primeira: 9500,
      segunda: 500,
      total: 10000,
    },
    {
      descricao: "BLOCO DE CONCRETO - 14X19X39",
      codigo: 2,
      custo: "1,95",
      unidade: "UND",
      primeira: 7800,
      segunda: 200,
      total: 8000,
    },
    {
      descricao: "BLOCO DE CONCRETO - 09X19X39",
      codigo: 3,
      custo: "1,50",
      unidade: "UND",
      primeira: 12000,
      segunda: 12000,
      total: 12000,
    },
    {
      descricao: "CANALETA DE CONCRETO - 19X19X39",
      codigo: 4,
      custo: "1,50",
      unidade: "UND",
      primeira: 12000,
      segunda: 12000,
      total: 12000,
    },
    {
      descricao: "CANALETA DE CONCRETO - 14X19X39",
      codigo: 5,
      custo: "1,50",
      unidade: "UND",
      primeira: 12000,
      segunda: 12000,
      total: 12000,
    },
    {
      descricao: "CANALETA DE CONCRETO - 09X19X39",
      codigo: 6,
      custo: "1,50",
      unidade: "UND",
      primeira: 12000,
      segunda: 12000,
      total: 12000,
    },
    {
      descricao: "PISO INTERTRAVADO H8 - 10X20X8",
      codigo: 7,
      custo: "1,50",
      unidade: "M²",
      primeira: 12000,
      segunda: 12000,
      total: 12000,
    },
    {
      descricao: "PISO INTERTRAVADO H6 - 10X20X6",
      codigo: 8,
      custo: "1,50",
      unidade: "M²",
      primeira: 12000,
      segunda: 12000,
      total: 12000,
    },
    {
      descricao: "PISO INTERTRAVADO H4 - 10X20X4",
      codigo: 9,
      custo: "1,50",
      unidade: "M²",
      primeira: 12000,
      segunda: 12000,
      total: 12000,
    },
    {
      descricao: "MEIO-FIO - 10X12X30X50",
      codigo: 10,
      custo: "8,00",
      unidade: "UND",
      primeira: 12000,
      segunda: 12000,
      total: 12000,
    },
  ];

  //   Função para redirecionamento ao clicar nos três pontinhos
  const handleClick = (codigo) => {
    if (codigo === 2) {
      router.push(`/suprimentos/detalhes`);
    }
  };

  return (
    <div
      className={`lista-producao-container ${
        isSidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="lista-producao-content">
        <div className="lista-producao-header">
          <h1 className="lista-producao-title">Controle de Estoques</h1>
          <button className="print-button">
            <FaPrint /> imprimir
          </button>
        </div>

        <div className="filtros">
          <input
            type="text"
            placeholder="Pesquise por descrição ou código"
            className="procurar"
          />

          <button className="filtro-botao">
            <span>⇅</span> nome
          </button>

          <button className="filtro-botao ativo">por situação</button>
        </div>

        {/* ✅ Filtros de categorias */}
        <div className="status-filtros">
          <span className="status-todos ativo">todos</span>
          <span className="status-andamento">fabricado</span>
          <span className="status-aberto">matéria-prima</span>
        </div>

        <hr className="status-divider" />

        <div className="tabela-produtos-container">
          <table className="tabela-produtos">
            <thead>
              <tr>
                <th></th>
                <th>Descrição</th>
                <th>Código</th>
                <th>Custo Médio</th>
                <th>Unidade</th>
                <th>Primeira Linha</th>
                <th>Segunda Linha</th>
                <th>Estoque Total</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className="acoes">
                    <img
                      src="\3pontos.svg"
                      alt="Opções"
                      className="menu-acoes"
                      onClick={() => handleClick(produto.codigo)} // Adicionando evento de clique
                    />
                    {produto.descricao}
                  </td>
                  <td>{produto.codigo}</td>
                  <td>{produto.custo}</td>
                  <td>{produto.unidade}</td>
                  <td>{produto.primeira}</td>
                  <td>{produto.segunda}</td>
                  <td>{produto.total}</td>
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
    </div>
  );
}

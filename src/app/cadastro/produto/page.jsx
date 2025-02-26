"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar"; // ✅ Importando o Sidebar
import { HiChevronUpDown } from "react-icons/hi2"; // Ícone para ordenação
import { FaEllipsisV, FaSearch } from "react-icons/fa"; // Ícones de ações e pesquisa
import { useRouter } from "next/navigation"; // ✅ Para Next.js 13+ com App Router

import "../../../styles/produto.css";

export default function ProdutosPage() {
  const [pesquisa, setPesquisa] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [ordemAsc, setOrdemAsc] = useState(true);
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      descricao: "BLOCO DE CONCRETO - 19X19X39",
      codigo: 1,
      unidade: "UND",
      custo: "2,45",
      estoque: 10000,
    },
    {
      id: 2,
      descricao: "BLOCO DE CONCRETO - 14X19X39",
      codigo: 2,
      unidade: "UND",
      custo: "1,95",
      estoque: 8000,
    },
    {
      id: 3,
      descricao: "BLOCO DE CONCRETO - 09X19X39",
      codigo: 3,
      unidade: "UND",
      custo: "1,50",
      estoque: 12000,
    },
    {
      id: 4,
      descricao: "CANALETA DE CONCRETO - 19X19X39",
      codigo: 4,
      unidade: "UND",
      custo: "1,50",
      estoque: 12000,
    },
    {
      id: 5,
      descricao: "CANALETA DE CONCRETO - 14X19X39",
      codigo: 5,
      unidade: "UND",
      custo: "1,50",
      estoque: 12000,
    },
    {
      id: 6,
      descricao: "CANALETA DE CONCRETO - 09X19X39",
      codigo: 6,
      unidade: "UND",
      custo: "1,50",
      estoque: 12000,
    },
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const router = useRouter(); // ✅ Criando a instância corretamente
  // Função para inverter a ordem da tabela
  const inverterOrdem = () => {
    setProdutos([...produtos].reverse());
    setOrdemAsc(!ordemAsc);
  };
  const handleIncluirProduto = () => {
    router.push("produto/novoProduto"); // ✅ Agora o router está definido corretamente
  };
  return (
    <div
      className={`produtos-container ${isSidebarOpen ? "sidebar-open" : ""}`}
    >
      {/* ✅ Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="produtos-content">
        {/* Cabeçalho */}
        <div className="produtos-header">
          {/* Título */}
          <h1 className="produtos-title">Produtos</h1>

          {/* Botões de ação alinhados à direita */}
          <div className="acoes-container">
            <button className="add-produto-btn" onClick={handleIncluirProduto}>
              incluir produto
            </button>
            <button className="acoes-btn">
              ações <FaEllipsisV />
            </button>
          </div>
        </div>

        {/* Campo de pesquisa + Filtros */}
        <div className="pesquisa-e-filtros">
          {/* Campo de pesquisa */}
          <div className="produtos-form">
            <input
              type="text"
              placeholder="Pesquise por descrição ou código"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>

          {/* Botões de filtro */}
          <div className="filtros">
            <button className="filtro-btn">
              <HiChevronUpDown /> nome
            </button>
            <button className="filtro-btn">por situação</button>
          </div>
        </div>

        {/* Filtros */}
        <div className="status-filters">
          <span className="active">todos</span>
          <span>fabricado</span>
          <span>matéria-prima</span>
        </div>

        {/* Linha separadora abaixo dos filtros */}
        <hr className="status-divider" />

        {/* Tabela de produtos */}
        <div className="produtos-table-container">
          <table className="produtos-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" className="custom-checkbox" />
                </th>
                <th>
                  Descrição
                  <button className="sort-button" onClick={inverterOrdem}>
                    <HiChevronUpDown />
                  </button>
                </th>
                <th>Código</th>
                <th>Unidade</th>
                <th>Custo</th>
                <th>Estoque</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>
                    <input type="checkbox" className="custom-checkbox" />
                  </td>
                  <td>{produto.descricao}</td>
                  <td>{produto.codigo}</td>
                  <td>{produto.unidade}</td>
                  <td>{produto.custo}</td>
                  <td>{produto.estoque}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Linha separadora antes da paginação */}
        <hr className="pagination-divider" />

        {/* Paginação */}
        <div className="pagination">
          <span>01</span>
          <span>02</span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
}

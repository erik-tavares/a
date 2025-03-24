"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar"; // ✅ Importando o Sidebar
import ModalOptionsProduto from "@/components/ModalProduto";
import { HiChevronUpDown } from "react-icons/hi2"; // Ícone para ordenação
import { FaEllipsisV, FaSearch } from "react-icons/fa"; // Ícones de ações e pesquisa
import { useRouter } from "next/navigation"; // ✅ Para Next.js 13+ com App Router

import "../../../styles/produto.css";

export default function ProdutosPage() {
  const [pesquisa, setPesquisa] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [ordemAsc, setOrdemAsc] = useState(true);
  const [exibirOpcoesOrdenacao, setExibirOpcoesOrdenacao] = useState(false); // ✅ Estado para exibir opções de ordenação
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const [exibirOpcoesSituacao, setExibirOpcoesSituacao] = useState(false); // ✅ Estado para exibir filtros de situação
  const [selecionarTodos, setSelecionarTodos] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  const [checkboxesSelecionados, setCheckboxesSelecionados] = useState({});

  const [produtos, setProdutos] = useState([
    {
      id: 1,
      descricao: "BLOCO DE CONCRETO - 19X19X39",
      codigo: 1,
      unidade: "UND",
      custo: "2,45",
      estoque: 10000,
      tipo: "fabricado",
    },
    {
      id: 2,
      descricao: "BLOCO DE CONCRETO - 14X19X39",
      codigo: 2,
      unidade: "UND",
      custo: "1,95",
      estoque: 8000,
      tipo: "fabricado",
    },
    {
      id: 3,
      descricao: "BLOCO DE CONCRETO - 09X19X39",
      codigo: 3,
      unidade: "UND",
      custo: "1,50",
      estoque: 12000,
      tipo: "fabricado",
    },
    {
      id: 4,
      descricao: "CANALETA DE CONCRETO - 19X19X39",
      codigo: 4,
      unidade: "UND",
      custo: "1,50",
      estoque: 12000,
      tipo: "matéria-prima",
    },
    {
      id: 5,
      descricao: "CANALETA DE CONCRETO - 14X19X39",
      codigo: 5,
      unidade: "UND",
      custo: "1,50",
      estoque: 12000,
      tipo: "matéria-prima",
    },
    {
      id: 6,
      descricao: "CANALETA DE CONCRETO - 09X19X39",
      codigo: 6,
      unidade: "UND",
      custo: "1,50",
      estoque: 12000,
      tipo: "matéria-prima",
    },
    {
      id: 7,
      descricao: "CANALETA DE CONCRETO - 09X19X39",
      codigo: 7,
      unidade: "UND",
      custo: "1,50",
      estoque: 12000,
      tipo: "matéria-prima",
    },
    {
      id: 8,
      descricao: "BLOCO DE CONCRETO - 09X19X39",
      codigo: 8,
      unidade: "UND",
      custo: "1,50",
      estoque: 12000,
      tipo: "fabricado",
    },
    {
      id: 9,
      descricao: "CANALETA DE CONCRETO - 09X19X39",
      codigo: 9,
      unidade: "UND",
      custo: "1,50",
      estoque: 12000,
      tipo: "matéria-prima",
    },
    {
      id: 10,
      descricao: "BLOCO DE CONCRETO - 09X19X39",
      codigo: 10,
      unidade: "UND",
      custo: "1,50",
      estoque: 12000,
      tipo: "fabricado",
    },
  ]);

  const produtosFiltrados = produtos.filter((produto) =>
    tipoFiltro === "todos" ? true : produto.tipo === tipoFiltro
  );

  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);

  const produtosPaginados = produtosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // ✅ Alternar exibição dos botões de ordenação
  const toggleOrdenacao = () => {
    setExibirOpcoesOrdenacao(!exibirOpcoesOrdenacao);
  };

  // ✅ Alternar exibição dos filtros de situação
  const toggleSituacao = () => {
    setExibirOpcoesSituacao(!exibirOpcoesSituacao);
  };

  const router = useRouter(); // ✅ Criando a instância corretamente
  // Função para inverter a ordem da tabela
  // const inverterOrdem = () => {
  //   setProdutos([...produtos].reverse());
  //   setOrdemAsc(!ordemAsc);
  // };

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
              ações <img src="/ponto-azul.svg" alt="" />
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
            <button className="filtro-btn" onClick={toggleOrdenacao}>
              <HiChevronUpDown /> nome
            </button>
            <button className="filtro-btn" onClick={toggleSituacao}>
              por situação
            </button>
          </div>
        </div>
        {exibirOpcoesOrdenacao && (
          <div className="ordenacao-opcoes">
            <label>Ordenar por:</label>
            <button className="ordenacao-btn">Ordenar por Nome</button>
            <button className="ordenacao-btn">Ordenar por Código</button>
          </div>
        )}

        {/* ✅ Opções de filtro de situação */}
        {exibirOpcoesSituacao && (
          <div className="situacao-opcoes">
            <label>Situação: </label>
            <button className="situacao-btn">Sem Filtro</button>
            <button className="situacao-btn">Ativos</button>
            <button className="situacao-btn">Inativos</button>
            <button className="situacao-btn">Excluídos</button>
          </div>
        )}
        {/* ✅ Opções de ordenação (aparecem ao clicar no botão) */}

        {/* Filtros */}
        <div className="status-filters">
          <span
            className={tipoFiltro === "todos" ? "active" : ""}
            onClick={() => {
              setTipoFiltro("todos");
              setPaginaAtual(1);
            }}
          >
            todos
          </span>
          <span
            className={tipoFiltro === "fabricado" ? "active" : ""}
            onClick={() => {
              setTipoFiltro("fabricado");
              setPaginaAtual(1);
            }}
          >
            fabricado
          </span>
          <span
            className={tipoFiltro === "matéria-prima" ? "active" : ""}
            onClick={() => {
              setTipoFiltro("matéria-prima");
              setPaginaAtual(1);
            }}
          >
            matéria-prima
          </span>
        </div>

        {/* Linha separadora abaixo dos filtros */}
        <hr className="status-divider" />

        {/* Tabela de produtos */}
        <div className="produtos-table-container">
          <table className="produtos-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={selecionarTodos}
                    onChange={(e) => {
                      const marcado = e.target.checked;
                      setSelecionarTodos(marcado);

                      // Atualiza checkboxes visíveis com base no filtro
                      const novoEstado = {};
                      produtos.forEach((produto) => {
                        novoEstado[produto.id] = marcado;
                      });

                      setCheckboxesSelecionados(novoEstado);
                    }}
                  />
                </th>
                <th>Descrição</th>
                <th></th>
                <th>Código</th>
                <th>Unidade</th>
                <th>Custo</th>
                <th>Estoque</th>
              </tr>
            </thead>
            <tbody>
              {produtosPaginados.map((produto) => (
                <tr key={produto.id}>
                  <td>
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={checkboxesSelecionados[produto.id] || false}
                      onChange={(e) => {
                        const novoEstado = {
                          ...checkboxesSelecionados,
                          [produto.id]: e.target.checked,
                        };

                        setCheckboxesSelecionados(novoEstado);

                        const produtosVisiveis = produtos.filter((p) =>
                          tipoFiltro === "todos" ? true : p.tipo === tipoFiltro
                        );

                        const todosMarcados = produtosVisiveis.every(
                          (p) => novoEstado[p.id]
                        );

                        setSelecionarTodos(todosMarcados);
                      }}
                    />
                  </td>
                  <td className="nome-produto">
                    <ModalOptionsProduto
                      className="action-icon"
                      produto={produto}
                    />{" "}
                    {produto.nome}
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
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
            (pagina) => (
              <span
                key={pagina}
                onClick={() => setPaginaAtual(pagina)}
                className={paginaAtual === pagina ? "active" : ""}
              >
                {String(pagina).padStart(2, "0")}
              </span>
            )
          )}
          {paginaAtual < totalPaginas && (
            <span onClick={() => setPaginaAtual(paginaAtual + 1)}>→</span>
          )}
        </div>
      </div>
    </div>
  );
}

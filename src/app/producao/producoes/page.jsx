"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ProducaoModal from "@/components/ModalProducoes";
import {
  FaArrowLeft,
  FaPlusCircle,
  FaCalculator,
  FaTrash,
  FaEllipsisV,
} from "react-icons/fa";

import "../../../styles/producoes.css";

export default function producoesPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState("dados-gerais");
  const [preco, setPreco] = useState("0,00");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const formatarPreco = (valor) => {
    if (!valor) return "0,00"; // Se valor for undefined ou null, retorna "0,00"
    valor = valor.toString().replace(/\D/g, ""); // Remove tudo que não for número
    valor = (parseFloat(valor) / 100).toFixed(2).replace(".", ","); // Formata para moeda
    return valor;
  };

  const removerTabela = (index) => {
    const novasTabelas = tabelas.filter((_, i) => i !== index);
    setTabelas(novasTabelas);
  };

  const atualizarCusto = (e, index) => {
    let valor = e.target.value || "0,00"; // Garante que há um valor válido
    valor = valor.replace(/\D/g, ""); // Remove caracteres não numéricos
    valor = (parseFloat(valor) / 100).toFixed(2).replace(".", ","); // Formata corretamente

    const novasTabelas = [...tabelas];
    if (!novasTabelas[index]) return; // Verifica se a tabela existe

    novasTabelas[index].custo = valor;

    const quantidade =
      parseFloat((novasTabelas[index].quantidade || "0").replace(",", ".")) ||
      0;
    const custo = parseFloat(valor.replace(",", ".")) || 0;
    novasTabelas[index].total = (quantidade * custo)
      .toFixed(2)
      .replace(".", ",");

    setTabelas(novasTabelas);
  };

  const atualizarQuantidade = (e, index) => {
    const novasTabelas = [...tabelas];
    novasTabelas[index].quantidade = e.target.value;
    const quantidade = parseFloat(e.target.value.replace(",", ".")) || 0;
    const custo = parseFloat(novasTabelas[index].custo.replace(",", ".")) || 0;
    novasTabelas[index].total = (quantidade * custo)
      .toFixed(2)
      .replace(".", ",");
    setTabelas(novasTabelas);
  };

  // ✅ Atualiza o estado do preço ao digitar
  const handlePrecoChange = (e) => {
    setPreco(formatarPreco(e.target.value));
  };

  const [tabelas, setTabelas] = useState([
    { id: 1, custo: "0,00", total: "0,00" },
  ]);

  // ✅ Função para adicionar uma nova tabela
  const adicionarTabela = () => {
    const novoCusto = tabelas.length === 0 ? "" : "0,00";
    setTabelas([
      ...tabelas,
      { id: Date.now(), quantidade: "", custo: novoCusto, total: "0,00" },
    ]);
  };

  // ✅ Função para atualizar o custo da última tabela
  const atualizarCustoProduto = (index, novoCusto) => {
    if (
      tabelas.length === 0 ||
      index < 0 ||
      index >= tabelas.length ||
      !novoCusto
    )
      return;

    const novasTabelas = [...tabelas];
    novasTabelas[index].custo = formatarPreco(novoCusto);
    setTabelas(novasTabelas);
  };

  return (
    <div
      className={`novo-produto-container ${
        isSidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="novo-produto-content">
        {/* ✅ Cabeçalho */}
        <div className="novo-produto-header">
          <h1 className="novo-produto-title">Produção</h1>
          <div className="acoes-container">
            <button onClick={() => router.back()} className="back-button">
              <FaArrowLeft /> voltar
            </button>
            <button className="acoes-btnModal">
              <ProducaoModal />
            </button>
          </div>
        </div>

        {/* ✅ Abas */}
        <div className="tabs">
          <span
            className={`tab ${
              abaSelecionada === "dados-gerais" ? "active" : ""
            }`}
            onClick={() => setAbaSelecionada("dados-gerais")}
          >
            dados gerais
          </span>
          <span
            className={`tab ${abaSelecionada === "eventos" ? "active" : ""}`}
            onClick={() => setAbaSelecionada("eventos")}
          >
            eventos
          </span>
        </div>

        <hr className="tabs-divider" />

        {/* ✅ Conteúdo das abas */}
        <div className="aba-conteudo">
          {abaSelecionada === "dados-gerais" && (
            <div className="dados-gerais-form">
              {/* Primeira linha */}
              <div className="form-row">
                <div className="form-group descricao">
                  <label>Receita</label>
                  <input
                    type="text"
                    placeholder="PISO INTERTRAVADO H8 - 10X20X8"
                  />
                  Data Produção Número da Produção 03/01/2025 03
                </div>
                <div className="form-group codigo">
                  <label>Primeira Linha</label>
                  <input type="text" value="Automático" disabled />
                </div>
                <div className="form-group tipo">
                  <label>Quantidade Total</label>
                  <input type="text" placeholder="700" />
                </div>
                <div className="form-group tipo">
                  <label>Indice 2° Linha</label>
                  <input type="text" placeholder="1,5 %" />
                </div>
              </div>

              {/* Segunda linha */}
              <div className="form-row">
                <div className="form-group unidade">
                  <label>Segunda Linha</label>
                  <input type="text" placeholder="10,5" />
                </div>
                <div className="form-group unidade">
                  <label htmlFor="">Unidade</label>
                  <input type="text" placeholder="M²" />
                </div>
                <div className="form-group preco">
                  <label>Comissão Operador</label>
                  <div className="input-group">
                    <span className="prefix">R$</span>
                    <input
                      type="text"
                      value={preco}
                      onChange={handlePrecoChange}
                    />
                  </div>
                </div>
              </div>

              <hr className="section-divider" />

              {/* ✅ Dimensões e Peso */}
              <div className="section-title">Lançamentos</div>
              <div className="form-row2">
                <div className="form-group">
                  <label>Meta Ciclos</label>
                  <div className="input-group">
                    <input type="text" placeholder="2000" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Tempo Total de Produção</label>
                  <div className="input-group">
                    <input type="text" placeholder="9.00" />
                    <span className="unit">Hr</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Solicitações</label>
                  <div className="input-group">
                    <input type="text" placeholder="Em Unidade" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Areia</label>
                  <div className="input-group">
                    <input type="text" placeholder="Areia" />
                    <span className="unit">Kg</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Areia Industrial</label>
                  <div className="input-group">
                    <input type="text" placeholder="Areia Industrial" />
                    <span className="unit">Kg</span>
                  </div>
                </div>
              </div>
              <div className="form-row2">
                <div className="form-group">
                  <label>Ciclos Atingidos</label>
                  <div className="input-group">
                    <input type="text" placeholder="Ciclos Atingidos" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Tempo Parado</label>
                  <div className="input-group">
                    <input type="text" placeholder="Tempo Parado" />
                    <span className="unit">Hr</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Cimento</label>
                  <div className="input-group">
                    <input type="text" placeholder="Cimento" />
                    <span className="unit">Kg</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Brita</label>
                  <div className="input-group">
                    <input type="text" placeholder="Brita" />
                    <span className="unit">Kg</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Aditivo</label>
                  <div className="input-group">
                    <input type="text" placeholder="Aditivo" />
                    <span className="unit">L</span>
                  </div>
                </div>
              </div>

              <hr className="section-divider" />

              {/* ✅ Estoque */}
              <div className="section-title">Estrutura</div>

              {/* Botões */}
            </div>
          )}

          {abaSelecionada === "eventos" && (
            <div className="producao-content">
              <h2 className="section-title">Estrutura</h2>

              {/* ✅ Estado para armazenar múltiplas tabelas */}
              {tabelas.map((tabela, index) => (
                <div key={tabela.id} className="tabela-produtos-container">
                  <table className="tabela-produtos">
                    <thead>
                      <tr>
                        <th>Produto</th>
                        <th>Unidade</th>
                        <th>Quantidade</th>
                        <th>Custo</th>
                        <th>Total</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input type="text" className="input-produto" />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input-unidade"
                            onChange={(e) => atualizarQuantidade(e, index)}
                          />
                        </td>
                        <td>
                          <input type="text" className="input-quantidade" />
                        </td>
                        <td>
                          <div className="input-group input-custo">
                            <span className="prefix">R$</span>
                            <input
                              type="text"
                              value={tabela.custo}
                              onChange={(e) => atualizarCusto(e, index)}
                              placeholder="0,00"
                            />
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input-total"
                            value={tabela.total}
                            readOnly
                          />
                        </td>
                        <td className="acoes">
                          <div className="botoes-acoes">
                            <button className="save-btn">Salvar</button>
                            <button
                              className="delete-btn"
                              onClick={() => removerTabela(index)}
                            >
                              <FaTrash /> Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="1" className="totais-label">
                          Totais
                        </td>
                        <td>0</td>
                        <td>0,00</td>
                        <td></td>
                        <td>0,00</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}

              {/* ✅ Botões abaixo da tabela */}
              <div className="estrutura-actions">
                <button className="add-item-btn" onClick={adicionarTabela}>
                  <FaPlusCircle /> adicionar item
                </button>
                <button
                  className="update-cost-btn"
                  onClick={atualizarCustoProduto}
                >
                  <FaCalculator /> atualizar custo do produto
                </button>
              </div>
              <hr className="tabs-dividerDisperdicio" />
              <div className="indice-desperdicio">
                <h2 className="section-title">Índice desperdício</h2>
                <div className="form-group porcentagem">
                  <label>Porcentagem</label>
                  <div className="input-group">
                    <input name="porcentagem" type="text" placeholder="0,0" />
                    <span className="unit">%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <hr className="tabs-dividerDisperdicio" />
          <div className="form-actions">
            <button className="salvar-btn">salvar</button>
            <button className="cancelar-btn">cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

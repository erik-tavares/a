"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import {
  FaArrowLeft,
  FaPlusCircle,
  FaCalculator,
  FaTrash,
} from "react-icons/fa";

import "../../../../styles/novoProduto.css"; // ✅ Importação do CSS atualizado

export default function NovoProdutoPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState("dados-gerais");
  const [pesoLiquido, setPesoLiquido] = useState("");
  const [estoqueMaximo, setEstoqueMaximo] = useState("");
  const [estoqueMinimo, setEstoqueMinimo] = useState("");
  const [porcentagem, setPorcentagem] = useState("");
  const [dimensoes, setDimensoes] = useState({
    largura: "",
    altura: "",
    comprimento: "",
  });

  const handlePorcentagemChange = (e) => {
    let value = e.target.value;

    // Remove tudo que não for número ou vírgula
    value = value.replace(/[^0-9,]/g, "");

    // Impede múltiplas vírgulas
    const parts = value.split(",");
    if (parts.length > 2) {
      value = parts[0] + "," + parts.slice(1).join("");
    }

    // Garante no máximo uma casa decimal
    if (value.includes(",")) {
      const [integer, decimal] = value.split(",");
      value = integer + "," + (decimal.slice(0, 1) || "");
    }

    setPorcentagem(value);
  };

  const handleEstoqueMinimoChange = (e) => {
    let value = e.target.value;

    // Remove tudo que não for número (impede letras, símbolos, vírgulas e pontos)
    value = value.replace(/\D/g, "");

    setEstoqueMinimo(value);
  };

  const [largura, setLargura] = useState("");
  const [numeroVolume, setNumeroVolume] = useState("");
  const [pesos, setPesos] = useState({
    pesoLiquido: "",
    pesoBruto: "",
  });

  const [preco, setPreco] = useState("0,00");
  const [formData, setFormData] = useState({
    unidade: "", // Inicializando o campo unidade
  });
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEstoqueMaximoChange = (e) => {
    let value = e.target.value;

    // Remove tudo que não for número ou vírgula
    value = value.replace(/[^0-9,]/g, "");

    // Impede múltiplas vírgulas
    const parts = value.split(",");
    if (parts.length > 2) {
      value = parts[0] + "," + parts.slice(1).join("");
    }

    // Garante no máximo uma casa decimal
    if (value.includes(",")) {
      const [integer, decimal] = value.split(",");
      value = integer + "," + (decimal.slice(0, 1) || "");
    }

    setEstoqueMaximo(value);
  };

  const handleDimensaoChange = (field, value) => {
    // Remove tudo que não for número ou vírgula
    value = value.replace(/[^0-9,]/g, "");

    // Impede múltiplas vírgulas
    const parts = value.split(",");
    if (parts.length > 2) {
      value = parts[0] + "," + parts.slice(1).join("");
    }

    // Garante no máximo uma casa decimal
    if (value.includes(",")) {
      const [integer, decimal] = value.split(",");
      value = integer + "," + (decimal.slice(0, 1) || "");
    }

    setDimensoes((prev) => ({ ...prev, [field]: value }));
  };

  const handleLarguraChange = (e) => {
    let value = e.target.value;

    // Remove tudo que não for número ou vírgula
    value = value.replace(/[^0-9,]/g, "");

    // Impede múltiplas vírgulas
    const parts = value.split(",");
    if (parts.length > 2) {
      value = parts[0] + "," + parts.slice(1).join("");
    }

    // Garante no máximo uma casa decimal
    if (value.includes(",")) {
      const [integer, decimal] = value.split(",");
      value = integer + "," + (decimal.slice(0, 1) || "");
    }

    setLargura(value);
  };

  const handleNumeroVolumeChange = (e) => {
    let value = e.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, "");

    setNumeroVolume(value);
  };

  const handlePesoLiquidoChange = (e) => {
    let value = e.target.value;

    // Remove tudo que não for número ou ponto
    value = value.replace(/[^0-9.]/g, "");

    // Impede múltiplos pontos decimais
    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    // Limita a duas casas decimais
    if (value.includes(".")) {
      const [integer, decimal] = value.split(".");
      value = integer + "." + (decimal.slice(0, 2) || "");
    }

    setPesoLiquido(value);
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

  const handlePesoChange = (field, value) => {
    // Remove tudo que não for número ou ponto decimal
    value = value.replace(/[^0-9.]/g, "");

    // Impede múltiplos pontos decimais
    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    // Limita a duas casas decimais
    if (value.includes(".")) {
      const [integer, decimal] = value.split(".");
      value = integer + "." + (decimal.slice(0, 2) || "");
    }

    setPesos((prev) => ({ ...prev, [field]: value }));
  };

  const handleUnidadeChange = (e) => {
    let value = e.target.value.toUpperCase(); // Converte para maiúsculas automaticamente

    // Permite apenas números, letras, espaços e o caractere "²"
    value = value.replace(/[^A-Z0-9²\s]/g, "");

    setFormData((prev) => ({ ...prev, unidade: value }));
  };

  const atualizarQuantidade = (e, index) => {
    let value = e.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, "");

    const novasTabelas = [...tabelas];
    if (!novasTabelas[index]) return; // Evita erro se o índice não existir

    novasTabelas[index].quantidade = value || ""; // Garante que sempre há um valor definido

    // Calcula o total corretamente
    const quantidade = parseFloat(value.replace(",", ".")) || 0;
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
    { id: 1, quantidade: "", custo: "0,00", total: "0,00" },
  ]);

  // ✅ Função para adicionar uma nova tabela
  const adicionarTabela = () => {
    const novoCusto = tabelas.length === 0 ? "" : "0,00";
    setTabelas([
      ...tabelas,
      { id: Date.now(), quantidade: "", custo: novoCusto, total: "0,00" },
    ]);
  };
  const handleQuantidadeChange = (e, index) => {
    let value = e.target.value;

    // Remove tudo que não for número (impede letras, símbolos, vírgulas e pontos)
    value = value.replace(/\D/g, "");

    // Atualiza a quantidade no array de tabelas
    const novasTabelas = [...tabelas];
    novasTabelas[index].quantidade = value || ""; // Garante que sempre há um valor definido
    setTabelas(novasTabelas);
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
          <h1 className="novo-produto-title">Novo produto</h1>
          <button onClick={() => router.back()} className="back-button">
            <FaArrowLeft /> voltar
          </button>
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
            className={`tab ${abaSelecionada === "producao" ? "active" : ""}`}
            onClick={() => setAbaSelecionada("producao")}
          >
            produção
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
                  <label>Descrição</label>
                  <input
                    type="text"
                    placeholder="Descrição completa do produto"
                  />
                </div>
                <div className="form-group codigo">
                  <label>Código</label>
                  <input type="text" value="Automático" disabled />
                </div>
                <div className="form-group tipo">
                  <label>Tipo</label>
                  <select>
                    <option>Fabricado</option>
                    <option>Matéria</option>
                  </select>
                </div>
              </div>

              {/* Segunda linha */}
              <div className="form-row">
                <div className="form-group unidade">
                  <label>Unidade</label>
                  <input
                    type="text"
                    placeholder="Ex: UND, M²"
                    value={formData.unidade}
                    onChange={handleUnidadeChange}
                  />
                </div>
                <div className="form-group preco">
                  <label>Preço de custo</label>
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
              <div className="section-title">Dimensões e peso</div>
              <div className="form-row2">
                <div className="form-group">
                  <label>Peso Líquido</label>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Em Kg"
                      value={pesos.pesoLiquido}
                      onChange={(e) =>
                        handlePesoChange("pesoLiquido", e.target.value)
                      }
                    />
                    <span className="unit">Kg</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Peso Bruto</label>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Em Kg"
                      value={pesos.pesoBruto}
                      onChange={(e) =>
                        handlePesoChange("pesoBruto", e.target.value)
                      }
                    />
                    <span className="unit">Kg</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>N° de VOL. por embalagem</label>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Em Unidade"
                      value={numeroVolume}
                      onChange={handleNumeroVolumeChange}
                    />
                    <span className="unit">un</span>
                  </div>
                </div>
              </div>
              {/* ✅ Adicionando imagem à direita */}

              <div className="form-row2">
                <div className="form-group">
                  <label>Largura</label>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="0,0"
                      value={dimensoes.largura}
                      onChange={(e) =>
                        handleDimensaoChange("largura", e.target.value)
                      }
                    />
                    <span className="unit">cm</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Altura</label>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="0,0"
                      value={dimensoes.altura}
                      onChange={(e) =>
                        handleDimensaoChange("altura", e.target.value)
                      }
                    />
                    <span className="unit">cm</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Comprimento</label>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="0,0"
                      value={dimensoes.comprimento}
                      onChange={(e) =>
                        handleDimensaoChange("comprimento", e.target.value)
                      }
                    />
                    <span className="unit">cm</span>
                  </div>
                </div>
                <div className="dimensoes-imagem">
                  <img src="/pacote-caixa.svg" alt="Dimensões do Produto" />
                </div>
              </div>

              <hr className="section-divider" />

              {/* ✅ Estoque */}
              <div className="section-title">Estoque</div>
              <div className="form-row2">
                <div className="form-group">
                  <label>Controlar estoque</label>
                  <select>
                    <option>Sim</option>
                    <option>Não</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Estoque mínimo</label>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="0"
                      value={estoqueMinimo}
                      onChange={handleEstoqueMinimoChange}
                    />
                    <span className="unit">un</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Estoque máximo</label>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="0,0"
                      value={estoqueMaximo}
                      onChange={handleEstoqueMaximoChange}
                    />
                    <span className="unit">cm</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Controlar lotes</label>
                  <select>
                    <option>Sim</option>
                    <option>Não</option>
                  </select>
                </div>
              </div>

              {/* Botões */}
            </div>
          )}

          {abaSelecionada === "producao" && (
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
                            className="input-quantidade"
                            value={tabelas[index]?.quantidade || ""}
                            onChange={(e) => atualizarQuantidade(e, index)}
                          />
                        </td>

                        <td>
                          <input
                            type="text"
                            className="input-quantidade"
                            value={tabelas[index]?.quantidade || ""}
                            onChange={(e) => handleQuantidadeChange(e, index)}
                          />
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
                              Excluir
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
                    <input
                      name="porcentagem"
                      type="text"
                      placeholder="0,0"
                      value={porcentagem}
                      onChange={handlePorcentagemChange}
                    />
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

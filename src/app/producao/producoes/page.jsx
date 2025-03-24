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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [checkboxesSelecionados, setCheckboxesSelecionados] = useState({});
  const [selecionarTodos, setSelecionarTodos] = useState(false);

  const [formData, setFormData] = useState({
    quantidadeTotal: "", // Adicionando campo Quantidade Total
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
    let value = e.target.value;

    // 🔹 Remove tudo que não for número (impede letras, espaços e símbolos)
    value = value.replace(/\D/g, "");

    setTabelas((prevTabelas) => {
      const novasTabelas = [...prevTabelas];
      novasTabelas[index] = {
        ...novasTabelas[index],
        quantidade: value, // Garante que apenas números sejam armazenados
        total: (
          parseFloat(value || "0") *
          parseFloat(novasTabelas[index].custo.replace(",", ".") || "0")
        )
          .toFixed(2)
          .replace(".", ","),
      };
      return novasTabelas;
    });
  };

  // ✅ Atualiza o estado do preço ao digitar
  const formatarPreco = (valor) => {
    if (!valor) return "0,00";
    valor = valor.toString().replace(/\D/g, ""); // Remove tudo que não for número
    valor = (parseFloat(valor) / 100).toFixed(2).replace(".", ",");
    return valor;
  };

  const handlePrecoChange = (e) => {
    let value = formatarPreco(e.target.value);
    setPreco(value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.preco;
      return newErrors;
    });
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

  const handleQuantidadeChange = (e, field) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

    setFormData((prev) => {
      const newErrors = { ...errors };
      delete newErrors[field];

      return { ...prev, [field]: value };
    });
  };

  const handlePorcentagemChange = (e) => {
    let value = e.target.value.replace(/[^0-9,]/g, ""); // Apenas números e vírgula
    if (value.includes(",")) {
      const parts = value.split(",");
      value = parts[0] + "," + (parts[1] ? parts[1].slice(0, 1) : ""); // Uma casa decimal no máximo
    }
    setFormData((prev) => ({ ...prev, indiceLinha: value || "" }));
  };

  const handleSegundaLinhaChange = (e) => {
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

    setFormData((prev) => ({ ...prev, segundaLinha: value }));
  };

  const handleSave = () => {
    let newErrors = {};

    // Valida cada campo obrigatório
    if (!formData.segundaLinha) newErrors.segundaLinha = "Campo obrigatório";
    if (!formData.unidade) newErrors.unidade = "Campo obrigatório";
    if (!formData.metaCiclos) newErrors.metaCiclos = "Campo obrigatório";
    if (!formData.tempo) newErrors.tempo = "Campo obrigatório";
    if (!formData.solicitacoes) newErrors.solicitacoes = "Campo obrigatório";
    if (!formData.areia) newErrors.areia = "Campo obrigatório";
    if (!formData.areiaIndustrial)
      newErrors.areiaIndustrial = "Campo obrigatório";
    if (!formData.valor) newErrors.valor = "Campo obrigatório"; // Ciclos atingidos
    if (!formData.tempoParado) newErrors.tempoParado = "Campo obrigatório";
    if (!formData.cimento) newErrors.cimento = "Campo obrigatório";
    if (!formData.brita) newErrors.brita = "Campo obrigatório";
    if (!formData.aditivo) newErrors.aditivo = "Campo obrigatório";
    if (!formData.preco) newErrors.preco = "Campo obrigatório";
    if (!formData.quantidadeTotal)
      newErrors.quantidadeTotal = "Campo obrigatório";
    if (!formData.indiceLinha) newErrors.indiceLinha = "Campo obrigatório";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Dados salvos:", formData);
    }
  };

  const handleUnidadeChange = (e) => {
    let value = e.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, "");

    // Atualiza o estado sem adicionar o "²" no input
    setFormData((prev) => ({ ...prev, unidade: value }));
  };

  const handleMetaCiclosChange = (e) => {
    let value = e.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, "");

    setFormData((prev) => ({ ...prev, metaCiclos: value }));
  };

  const handleTempoChange = (e, field) => {
    let value = e.target.value.replace(/\D/g, ""); // Apenas números

    if (value.length > 2) {
      value = value.slice(0, 2) + ":" + value.slice(2, 4);
    }

    if (value.includes(":")) {
      const [horas, minutos] = value.split(":");
      if (parseInt(horas, 10) > 99) value = "99:" + minutos;
      if (parseInt(minutos, 10) > 59) value = horas + ":59";
    }

    setFormData((prev) => {
      const newErrors = { ...errors };
      delete newErrors[field];

      return { ...prev, [field]: value };
    });
  };

  const handleSolicitacoesChange = (e) => {
    let value = e.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, "");

    setFormData((prev) => ({ ...prev, solicitacoes: value }));
  };

  const handleAreiaChange = (e) => {
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

    setFormData((prev) => ({ ...prev, areia: value }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.areia; // Remove o erro ao digitar
      return newErrors;
    });
  };

  const handleAreiaIndustrialChange = (e) => {
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

    setFormData((prev) => ({ ...prev, areiaIndustrial: value }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.areiaIndustrial; // Remove o erro ao digitar
      return newErrors;
    });
  };

  const handleTempoParadoChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

    // Formata no padrão HH:MM
    if (value.length > 2) {
      value = value.slice(0, 2) + ":" + value.slice(2, 4);
    }

    // Garante que o valor máximo de horas seja 99 e minutos 59
    const [horas, minutos] = value.split(":");
    if (horas && parseInt(horas, 10) > 99) {
      value = "99" + (minutos ? ":" + minutos : "");
    }
    if (minutos && parseInt(minutos, 10) > 59) {
      value = horas + ":59";
    }

    setFormData((prev) => ({
      ...prev,
      tempoParado: value, // Atualiza o campo corretamente
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.tempoParado; // Remove o erro quando o usuário digita
      return newErrors;
    });
  };

  const handleCimentoChange = (e) => {
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

    setFormData((prev) => ({ ...prev, cimento: value }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.cimento; // Remove o erro ao digitar
      return newErrors;
    });
  };

  const handleBritaChange = (e) => {
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

    setFormData((prev) => ({ ...prev, brita: value }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.brita; // Remove o erro ao digitar
      return newErrors;
    });
  };

  const handleAditivoChange = (e) => {
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

    setFormData((prev) => ({ ...prev, aditivo: value }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.aditivo; // Remove o erro ao digitar
      return newErrors;
    });
  };

  const atualizarUnidade = (e, index) => {
    let value = e.target.value.replace(/\D/g, ""); // 🔹 Remove tudo que não for número

    setTabelas((prevTabelas) => {
      const novasTabelas = [...prevTabelas];
      novasTabelas[index] = {
        ...novasTabelas[index],
        unidade: value, // 🔹 Agora o campo unidade aceita apenas números
      };
      return novasTabelas;
    });
  };

  const handleNumeroChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

    setFormData((prev) => ({
      ...prev,
      valor: value, // Atualiza o campo Ciclos Atingidos corretamente
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.valor; // Remove o erro quando o usuário digita
      return newErrors;
    });
  };

  const handleCheckboxChange = (id, checked) => {
    const novoEstado = {
      ...checkboxesSelecionados,
      [id]: checked,
    };

    setCheckboxesSelecionados(novoEstado);

    // Verifica se todos foram marcados
    const todosSelecionados =
      Object.values(novoEstado).length === 10 &&
      Object.values(novoEstado).every((v) => v);

    setSelecionarTodos(todosSelecionados);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Remove tudo que não for número
    const numericValue = value.replace(/\D/g, "");

    setFormData((prev) => ({ ...prev, [name]: numericValue }));

    // Remove o erro quando o usuário digita algo
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const validarCampos = () => {
    let newErrors = {};

    if (!formData.quantidadeTotal || formData.quantidadeTotal.trim() === "")
      newErrors.quantidadeTotal = "Campo obrigatório";
    if (!formData.indiceLinha || formData.indiceLinha.trim() === "")
      newErrors.indiceLinha = "Campo obrigatório";
    if (!formData.segundaLinha || formData.segundaLinha.trim() === "")
      newErrors.segundaLinha = "Campo obrigatório";
    if (!formData.unidade || formData.unidade.trim() === "")
      newErrors.unidade = "Campo obrigatório";
    if (!preco || preco.trim() === "0,00")
      newErrors.preco = "Campo obrigatório";
    if (!formData.metaCiclos || formData.metaCiclos.trim() === "")
      newErrors.metaCiclos = "Campo obrigatório";
    if (!formData.tempo || formData.tempo.trim() === "")
      newErrors.tempo = "Campo obrigatório";
    if (!formData.solicitacoes || formData.solicitacoes.trim() === "")
      newErrors.solicitacoes = "Campo obrigatório";
    if (!formData.areia || formData.areia.trim() === "")
      newErrors.areia = "Campo obrigatório";
    if (!formData.areiaIndustrial || formData.areiaIndustrial.trim() === "")
      newErrors.areiaIndustrial = "Campo obrigatório";
    if (!formData.valor || formData.valor.trim() === "")
      newErrors.valor = "Campo obrigatório";
    if (!formData.tempoParado || formData.tempoParado.trim() === "")
      newErrors.tempoParado = "Campo obrigatório";
    if (!formData.cimento || formData.cimento.trim() === "")
      newErrors.cimento = "Campo obrigatório";
    if (!formData.brita || formData.brita.trim() === "")
      newErrors.brita = "Campo obrigatório";
    if (!formData.aditivo || formData.aditivo.trim() === "")
      newErrors.aditivo = "Campo obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna "true" se não houver erros
  };

  return (
    <div
      className={`novo-producoes-container ${
        isSidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="novo-producoes-content">
        {/* ✅ Cabeçalho */}
        <div className="novo-producoes-header">
          <h1 className="novo-producoes-title">Produção</h1>
          <div className="acoes-container">
            <button onClick={() => router.back()} className="back-button">
              <FaArrowLeft /> voltar
            </button>
            <button className="acoes-btnModal" onClick={toggleModal}></button>

            <ProducaoModal isOpen={isModalOpen} toggleModal={toggleModal} />
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
                    disabled
                  />
                </div>
                <div className="form-group codigo">
                  <label>Primeira Linha</label>
                  <input type="text" value="Automático" disabled />
                </div>
                <div className="form-group tipo">
                  <label>Quantidade Total</label>
                  <input
                    type="text"
                    placeholder="700"
                    value={formData.quantidadeTotal || ""}
                    onChange={(e) =>
                      handleQuantidadeChange(e, "quantidadeTotal")
                    }
                    className={errors.quantidadeTotal ? "input-error" : ""}
                  />
                  {errors.quantidadeTotal && (
                    <span className="error-message">
                      {errors.quantidadeTotal}
                    </span>
                  )}
                </div>

                <div className="form-group tipo">
                  <label>Indice 2° Linha</label>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="1,5"
                      value={formData.indiceLinha || ""}
                      onChange={(e) => handleQuantidadeChange(e, "indiceLinha")}
                      className={errors.indiceLinha ? "input-error" : ""}
                    />
                    <span className="unit">%</span>
                  </div>
                  {errors.indiceLinha && (
                    <span className="error-message">{errors.indiceLinha}</span>
                  )}
                </div>
              </div>
              <div className="containerProducao">
                <div className="textoAbaixo">
                  <span>Data Produção</span>
                  <strong>03/01/2025</strong>
                </div>
                <div className="textoProducao">
                  <span>Número da Produção</span>
                  <strong>03</strong>
                </div>
              </div>

              {/* Segunda linha */}
              <div className="form-row">
                <div className="form-group unidade">
                  <label>Segunda Linha</label>
                  <input
                    type="text"
                    name="segundaLinha"
                    placeholder="10,5"
                    value={formData.segundaLinha || ""}
                    onChange={handleChange}
                    className={errors.segundaLinha ? "input-error" : ""}
                  />
                  {errors.segundaLinha && (
                    <span className="error-message">{errors.segundaLinha}</span>
                  )}
                </div>

                <div className="form-group unidade">
                  <label htmlFor="unidade">Unidade</label>
                  <div className="input-group">
                    <input
                      type="text"
                      name="unidade"
                      placeholder="M²"
                      value={formData.unidade || ""}
                      onChange={handleChange}
                      className={errors.unidade ? "input-error" : ""}
                    />
                    <span className="unit">²</span>
                  </div>
                  {errors.unidade && (
                    <span className="error-message">{errors.unidade}</span>
                  )}
                </div>

                <div className="form-group preco">
                  <label>Comissão Operador</label>
                  <div className="input-group">
                    <span className="prefix">R$</span>
                    <input
                      type="text"
                      value={preco}
                      onChange={handlePrecoChange}
                      className={errors.preco ? "input-error" : ""}
                    />
                  </div>
                  {errors.preco && (
                    <span className="error-message">{errors.preco}</span>
                  )}
                </div>
              </div>

              <hr className="section-divider" />

              {/* ✅ Dimensões e Peso */}
              <div className="section-title">Lançamentos</div>
              {/* Informações da Máquina e Operador */}
              <div className="form-content">
                <div className="form-row2">
                  <div className="form-group">
                    <label>Meta Ciclos</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="metaCiclos"
                        placeholder="2000"
                        value={formData.metaCiclos || ""}
                        onChange={handleChange}
                        className={errors.metaCiclos ? "input-error" : ""}
                      />
                    </div>
                    {errors.metaCiclos && (
                      <span className="error-message">{errors.metaCiclos}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Tempo Total de Produção</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="tempo"
                        placeholder="9:00"
                        value={formData.tempo || ""}
                        onChange={handleChange}
                        className={errors.tempo ? "input-error" : ""}
                      />
                    </div>
                    {errors.tempo && (
                      <span className="error-message">{errors.tempo}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Solicitações</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="solicitacoes"
                        placeholder="Em Unidade"
                        value={formData.solicitacoes || ""}
                        onChange={handleChange}
                        className={errors.solicitacoes ? "input-error" : ""}
                      />
                    </div>
                    {errors.solicitacoes && (
                      <span className="error-message">
                        {errors.solicitacoes}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Areia</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="areia"
                        placeholder="0,0"
                        value={formData.areia || ""}
                        onChange={handleAreiaChange}
                        className={errors.areia ? "input-error" : ""}
                      />
                      <span className="unit">Kg</span>
                    </div>
                    {errors.areia && (
                      <span className="error-message">{errors.areia}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Areia Industrial</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="areiaIndustrial"
                        placeholder="0,0"
                        value={formData.areiaIndustrial || ""}
                        onChange={handleAreiaIndustrialChange}
                        className={errors.areiaIndustrial ? "input-error" : ""}
                      />
                      <span className="unit">Kg</span>
                    </div>
                    {errors.areiaIndustrial && (
                      <span className="error-message">
                        {errors.areiaIndustrial}
                      </span>
                    )}
                  </div>
                </div>
                <div className="info-box">
                  <span>Máquina</span>
                  <strong>HTX 900-01</strong>
                  <div className="info-operador">
                    <span>Operador</span>
                    <strong>Juarez</strong>
                  </div>
                </div>
                <div className="form-row2">
                  <div className="form-group">
                    <label>Ciclos Atingidos</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="valor" // Certifique-se que o name está correto
                        placeholder="2300"
                        value={formData.valor || ""}
                        onChange={handleChange} // Alterado para handleChange
                        className={errors.valor ? "input-error" : ""}
                      />
                    </div>
                    {errors.valor && (
                      <span className="error-message">{errors.valor}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Tempo Parado</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="tempoParado"
                        placeholder="00:30"
                        value={formData.tempoParado || ""}
                        onChange={handleTempoParadoChange}
                        maxLength="5"
                        className={errors.tempoParado ? "input-error" : ""}
                      />
                      <span className="unit">Hr</span>
                    </div>
                    {errors.tempoParado && (
                      <span className="error-message">
                        {errors.tempoParado}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Cimento</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="cimento"
                        placeholder="0,0"
                        value={formData.cimento || ""}
                        onChange={handleCimentoChange}
                        className={errors.cimento ? "input-error" : ""}
                      />
                      <span className="unit">Kg</span>
                    </div>
                    {errors.cimento && (
                      <span className="error-message">{errors.cimento}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Brita</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="brita"
                        placeholder="0,0"
                        value={formData.brita || ""}
                        onChange={handleBritaChange}
                        className={errors.brita ? "input-error" : ""}
                      />
                      <span className="unit">Kg</span>
                    </div>
                    {errors.brita && (
                      <span className="error-message">{errors.brita}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Aditivo</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="aditivo"
                        placeholder="70"
                        value={formData.aditivo || ""}
                        onChange={handleAditivoChange}
                        className={errors.aditivo ? "input-error" : ""}
                      />
                      <span className="unit">L</span>
                    </div>
                    {errors.aditivo && (
                      <span className="error-message">{errors.aditivo}</span>
                    )}
                  </div>
                </div>

                {/* ✅ Estoque */}
                <div className="section-title2">Estrutura</div>
                {/* ✅ Estado para armazenar múltiplas tabelas */}
                {tabelas.map((tabela, index) => (
                  <div key={tabela.id} className="tabela-producoes-container">
                    <table className="tabela-producoes">
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
                              value={tabelas[index]?.quantidade || ""} // Mantém sincronizado com o estado
                              onChange={(e) => atualizarQuantidade(e, index)}
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              className="input-unidade"
                              value={tabelas[index]?.unidade || ""}
                              onChange={(e) => atualizarUnidade(e, index)}
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
                {/* Botões */}
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
              </div>
              <hr className="tabs-divider" />

              <div className="form-actions">
                <button className="salvar-btn" onClick={handleSave}>
                  Finalizar
                </button>
              </div>
            </div>
          )}

          {abaSelecionada === "eventos" && (
            <div className="producao-content">
              <table className="tabela-eventos">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selecionarTodos}
                        onChange={(e) => {
                          const marcado = e.target.checked;
                          setSelecionarTodos(marcado);

                          const novosCheckboxes = {};
                          for (let i = 1; i <= 10; i++) {
                            novosCheckboxes[i] = marcado;
                          }

                          setCheckboxesSelecionados(novosCheckboxes);
                        }}
                      />
                    </th>
                    <th>Num</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Operador</th>
                    <th>Equipamento</th>
                    <th>Tipo de Parada</th>
                    <th>Motivo</th>
                    <th>Solução</th>
                    <th>Tempo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkboxesSelecionados[1] || false}
                        onChange={(e) =>
                          handleCheckboxChange(1, e.target.checked)
                        }
                      />
                    </td>
                    <td>1</td>
                    <td>01/01/2025</td>
                    <td>09:00:25</td>
                    <td>
                      <strong>Juarez</strong>
                    </td>
                    <td>VIBROPRENSA</td>
                    <td>AJUSTE</td>
                    <td>DESCREVER O MOTIVO</td>
                    <td>DESCREVER A SOLUÇÃO</td>
                    <td>00:30</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkboxesSelecionados[2] || false}
                        onChange={(e) =>
                          handleCheckboxChange(2, e.target.checked)
                        }
                      />
                    </td>
                    <td>2</td>
                    <td>01/01/2025</td>
                    <td>09:00:25</td>
                    <td>
                      <strong>Emmanuel</strong>
                    </td>
                    <td>CENTRAL DOSADORA</td>
                    <td>AJUSTE</td>
                    <td>DESCREVER O MOTIVO</td>
                    <td>DESCREVER A SOLUÇÃO</td>
                    <td>01:00</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkboxesSelecionados[3] || false}
                        onChange={(e) =>
                          handleCheckboxChange(2, e.target.checked)
                        }
                      />
                    </td>
                    <td>3</td>
                    <td>03/01/2025</td>
                    <td>09:00:25</td>
                    <td>
                      <strong>Juarez</strong>
                    </td>
                    <td>MISTURADOR</td>
                    <td>CORRETIVA</td>
                    <td>DESCREVER O MOTIVO</td>
                    <td>DESCREVER A SOLUÇÃO</td>
                    <td>00:15</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkboxesSelecionados[4] || false}
                        onChange={(e) =>
                          handleCheckboxChange(2, e.target.checked)
                        }
                      />
                    </td>
                    <td>4</td>
                    <td>04/01/2025</td>
                    <td>09:00:25</td>
                    <td>
                      <strong>Emmanuel</strong>
                    </td>
                    <td>ROBÔ PALETIZADOR</td>
                    <td>PREVENTIVA</td>
                    <td>DESCREVER O MOTIVO</td>
                    <td>DESCREVER A SOLUÇÃO</td>
                    <td>00:35</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkboxesSelecionados[5] || false}
                        onChange={(e) =>
                          handleCheckboxChange(2, e.target.checked)
                        }
                      />
                    </td>
                    <td>5</td>
                    <td>05/01/2025</td>
                    <td>09:00:25</td>
                    <td>
                      <strong>Juarez</strong>
                    </td>
                    <td>ESTEIRA 1 MISTURADOR</td>
                    <td>CORRETIVA</td>
                    <td>DESCREVER O MOTIVO</td>
                    <td>DESCREVER A SOLUÇÃO</td>
                    <td>00:35</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkboxesSelecionados[6] || false}
                        onChange={(e) =>
                          handleCheckboxChange(2, e.target.checked)
                        }
                      />
                    </td>
                    <td>6</td>
                    <td>06/01/2025</td>
                    <td>09:00:25</td>
                    <td>
                      <strong>Emmanuel</strong>
                    </td>
                    <td>CARRINHO DAS TÁBUAS</td>
                    <td>CORRETIVA</td>
                    <td>DESCREVER O MOTIVO</td>
                    <td>DESCREVER A SOLUÇÃO</td>
                    <td>00:15</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkboxesSelecionados[7] || false}
                        onChange={(e) =>
                          handleCheckboxChange(2, e.target.checked)
                        }
                      />
                    </td>
                    <td>7</td>
                    <td>07/01/2025</td>
                    <td>09:00:25</td>
                    <td>
                      <strong>Juarez</strong>
                    </td>
                    <td>PARAFUSO DO CONTRA MOLDE</td>
                    <td>CORRETIVA</td>
                    <td>DESCREVER O MOTIVO</td>
                    <td>DESCREVER A SOLUÇÃO</td>
                    <td>01:00</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkboxesSelecionados[8] || false}
                        onChange={(e) =>
                          handleCheckboxChange(2, e.target.checked)
                        }
                      />
                    </td>
                    <td>8</td>
                    <td>08/01/2025</td>
                    <td>09:00:25</td>
                    <td>
                      <strong>Emmanuel</strong>
                    </td>
                    <td>CORREIA DA EXTRATORA</td>
                    <td>AJUSTE</td>
                    <td>DESCREVER O MOTIVO</td>
                    <td>DESCREVER A SOLUÇÃO</td>
                    <td>00:15</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkboxesSelecionados[9] || false}
                        onChange={(e) =>
                          handleCheckboxChange(2, e.target.checked)
                        }
                      />
                    </td>
                    <td>9</td>
                    <td>09/01/2025</td>
                    <td>09:00:25</td>
                    <td>
                      <strong>Juarez</strong>
                    </td>
                    <td>PAINEL CLP</td>
                    <td>CORRETIVA</td>
                    <td>DESCREVER O MOTIVO</td>
                    <td>DESCREVER A SOLUÇÃO</td>
                    <td>00:35</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkboxesSelecionados[10] || false}
                        onChange={(e) =>
                          handleCheckboxChange(2, e.target.checked)
                        }
                      />
                    </td>
                    <td>10</td>
                    <td>10/01/2025</td>
                    <td>09:00:25</td>
                    <td>
                      <strong>Emmanuel</strong>
                    </td>
                    <td>VIBROPRENSA</td>
                    <td>AJUSTE</td>
                    <td>DESCREVER O MOTIVO</td>
                    <td>DESCREVER A SOLUÇÃO</td>
                    <td>00:17</td>
                  </tr>
                </tbody>
              </table>
              <hr className="divider-tabela" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

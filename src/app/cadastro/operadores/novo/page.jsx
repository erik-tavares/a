"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import { FaSave, FaPlusCircle, FaTrash } from "react-icons/fa";
import "../../../../styles/novoOperador.css";
import InputMask from "react-input-mask-next";

export default function NovoOperadorPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState("dados-gerais"); // Estado para controlar a aba ativa
  const [exibirTabela, setExibirTabela] = useState(true); // Estado para exibir ou remover a tabela
  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    tipo: "pista",
    email: "",
    celular: "",
    situacao: "ativo",
    usuarioSistema: "",
    senhaSistema: "",
  });
  const [produtos, setProdutos] = useState([
    { id: 1, produto: "", unidade: "", quantidade: "", valor: "" },
  ]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    if (
      !formData.nome ||
      !formData.email ||
      !formData.celular ||
      !formData.usuarioSistema ||
      !formData.senhaSistema
    ) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    console.log("Novo operador:", formData);
    router.push("/cadastro/operadores");
  };

  const adicionarItem = () => {
    setProdutos([
      ...produtos,
      {
        id: produtos.length + 1,
        produto: "",
        unidade: "",
        quantidade: "",
        valor: "",
      },
    ]);
  };

  const handleProdutoChange = (id, field, value) => {
    setProdutos(
      produtos.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleValorChange = (id, value) => {
    // Remove tudo que não for número
    let numericValue = value.replace(/\D/g, "");

    // Converte para número decimal
    if (numericValue.length > 2) {
      numericValue =
        numericValue.slice(0, numericValue.length - 2) +
        "." +
        numericValue.slice(numericValue.length - 2);
    } else if (numericValue.length === 2) {
      numericValue = "0." + numericValue;
    } else if (numericValue.length === 1) {
      numericValue = "0.0" + numericValue;
    } else {
      numericValue = "0.00";
    }

    // Converte para formato de moeda brasileira (R$)
    const formattedValue = parseFloat(numericValue).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    handleProdutoChange(id, "valor", formattedValue);
  };

  const handleQuantidadeChange = (id, value) => {
    // Remove tudo que não for número
    let formattedValue = value.replace(/\D/g, "");

    // Garante que o valor não comece com zero (exceto se for "0" sozinho)
    if (formattedValue.length > 1 && formattedValue.startsWith("0")) {
      formattedValue = formattedValue.slice(1);
    }

    handleProdutoChange(id, "quantidade", formattedValue);
  };

  const handleUnidadeChange = (id, value) => {
    // Remove tudo que não for número ou ponto decimal
    let formattedValue = value.replace(/[^0-9.]/g, "");

    // Garante que haja no máximo um único ponto decimal
    const parts = formattedValue.split(".");
    if (parts.length > 2) {
      formattedValue = parts[0] + "." + parts.slice(1).join("");
    }

    // Limita a duas casas decimais
    if (formattedValue.includes(".")) {
      const [integer, decimal] = formattedValue.split(".");
      formattedValue = integer + "." + (decimal.slice(0, 2) || "");
    }

    handleProdutoChange(id, "unidade", formattedValue);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

    // Formata para o padrão (XX) XXXXX-XXXX
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    setFormData((prev) => ({ ...prev, celular: value }));
  };

  const removerItem = (id) => {
    setProdutos(produtos.filter((item) => item.id !== id));
  };
  return (
    <div
      className={`novo-operador-container ${
        isSidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="novo-operador-content">
        <div className="novo-operador-header">
          <h1 className="novo-operador-title">Novo operador</h1>
          <button onClick={() => router.back()} className="back-button">
            &larr; voltar
          </button>
        </div>

        <div className="tabs">
          <span
            className={`tab ${
              abaSelecionada === "dados-gerais" ? "active" : "inactive"
            }`}
            onClick={() => setAbaSelecionada("dados-gerais")}
          >
            dados gerais
          </span>
          <span
            className={`tab ${
              abaSelecionada === "comissao" ? "active" : "inactive"
            }`}
            onClick={() => setAbaSelecionada("comissao")}
          >
            comissão
          </span>
        </div>

        <div className="aba-conteudo">
          {abaSelecionada === "dados-gerais" && (
            <>
              <div className="novo-operador-form">
                <div className="form-row three-cols">
                  <div className="form-group nome-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                      id="nome"
                      type="text"
                      name="nome"
                      placeholder="Nome completo do operador"
                      value={formData.nome}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group codigo-group">
                    <label htmlFor="codigo">Código</label>
                    <input
                      id="codigo"
                      type="text"
                      name="codigo"
                      placeholder="Opcional"
                      value={formData.codigo}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                  <div className="form-group tipo-group">
                    <label htmlFor="tipo">Tipo</label>
                    <select
                      id="tipo"
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleChange}
                    >
                      <option value="pista">Pista</option>
                      <option value="lider">Líder</option>
                    </select>
                  </div>
                </div>

                <div className="form-row three-cols">
                  <div className="form-group email-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group celular-group">
                    <label htmlFor="celular">Celular</label>
                    <input
                      id="celular"
                      type="text"
                      name="celular"
                      value={formData.celular}
                      onChange={handlePhoneChange}
                      placeholder="(99) 99999-9999"
                      maxLength={15}
                    />
                  </div>
                  <div className="form-group situacao-group">
                    <label htmlFor="situacao">Situação</label>
                    <select
                      id="situacao"
                      name="situacao"
                      value={formData.situacao}
                      onChange={handleChange}
                    >
                      <option value="ativo">Ativo</option>
                      <option value="inativo">Inativo</option>
                    </select>
                  </div>
                </div>
              </div>

              <hr />
              <h2 className="dados-acesso-title">Dados de Acesso</h2>

              <div className="novo-operador-form form-column">
                <div className="form-group">
                  <label htmlFor="usuarioSistema">Usuário do Sistema</label>
                  <input
                    id="usuarioSistema"
                    type="text"
                    name="usuarioSistema"
                    value={formData.usuarioSistema}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="senhaSistema">Senha do Sistema</label>
                  <input
                    id="senhaSistema"
                    type="password"
                    name="senhaSistema"
                    value={formData.senhaSistema}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          {abaSelecionada === "comissao" && (
            <div className="comissao-content">
              <div className="tabela-produtos-container">
                <h2 className="section-title">Produtos</h2>
                <table className="tabela-produtos">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Unidade</th>
                      <th>Quantidade</th>
                      <th>Valor</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtos.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <input
                            type="text"
                            className="input-produto"
                            value={item.produto}
                            onChange={(e) =>
                              handleProdutoChange(
                                item.id,
                                "produto",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input-unidade"
                            value={item.unidade}
                            onChange={(e) =>
                              handleUnidadeChange(item.id, e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input-quantidade"
                            value={item.quantidade}
                            onChange={(e) =>
                              handleQuantidadeChange(item.id, e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input-valor"
                            value={item.valor}
                            onChange={(e) =>
                              handleValorChange(item.id, e.target.value)
                            }
                          />
                        </td>
                        <td className="acoes">
                          <button className="save-btn">
                            salvar <FaSave />
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => removerItem(item.id)}
                          >
                            excluir <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="total">
                      <td>Totais</td>
                      <td></td>
                      <td></td>
                      <td>0,00</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <button className="add-item-btn" onClick={adicionarItem}>
                  <FaPlusCircle /> adicionar item
                </button>
                <hr className="hrButtons2" />
                <div className="form-group regra-comissao-container">
                  <label htmlFor="regra-comissao">
                    Regra para liberação de comissões
                  </label>
                  <select id="regra-comissao" className="select-comissao">
                    <option>Total produção</option>
                    <option>Média produção Operador</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        <hr className="hrButtons" />
        <div className="buttons">
          <button className="save-btn" onClick={handleSave}>
            salvar
          </button>

          <button
            className="cancel-btn"
            onClick={() => router.push("/cadastro/operadores")}
          >
            cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

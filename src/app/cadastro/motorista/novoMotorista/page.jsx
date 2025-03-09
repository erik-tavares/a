"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import "../../../../styles/novoMotorista.css";

export default function NovoMotoristaPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState("dados-gerais"); // Estado para controlar a aba ativa
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    tipo: "pista",
    email: "",
    celular: "",
    situacao: "ativo",
    cnh: "",
    categoria: "",
    vencimento: "",
    usuarioSistema: "",
    senhaSistema: "",
  });

  const validarCampos = () => {
    let newErrors = {};

    if (!formData.nome || formData.nome.trim() === "")
      newErrors.nome = "Campo obrigatório";
    if (!formData.email || formData.email.trim() === "")
      if (!formData.cnh || formData.cnh.trim() === "")
        newErrors.cnh = "Campo obrigatório";
    newErrors.email = "Campo obrigatório";
    if (!formData.categoria || formData.categoria.trim() === "")
      newErrors.categoria = "Campo obrigatório";
    if (!formData.vencimento || formData.vencimento.trim() === "")
      newErrors.vencimento = "Campo obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna "true" se não houver erros
  };

  const handleCelularChange = (e) => {
    let value = e.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, "");

    // Limita o número a 11 dígitos (DDD + 9 números)
    value = value.slice(0, 11);

    // Formata como (99) 99999-9999
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    setFormData((prev) => ({ ...prev, celular: value }));
  };

  const handleCNHChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Apenas números
    setFormData((prev) => ({ ...prev, cnh: value }));

    if (value.trim() !== "") {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.cnh;
        return newErrors;
      });
    }
  };

  const handleCategoriaCNHChange = (e) => {
    let value = e.target.value.toUpperCase(); // Converte para maiúsculas automaticamente
    value = value.replace(/[^A-E]/g, ""); // Apenas letras permitidas

    setFormData((prev) => ({ ...prev, categoria: value }));

    if (value.trim() !== "") {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.categoria;
        return newErrors;
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (value.trim() !== "") {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name]; // Remove erro ao preencher
        return newErrors;
      });
    }
  };

  const handleSave = () => {
    if (validarCampos()) {
      console.log("Formulário válido! Enviar dados ao backend...");
      setErrors({}); // ✅ Limpa todos os erros após salvar com sucesso
    }
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
          <h1 className="novo-operador-title">Novo Motorista</h1>
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
                      placeholder="Nome completo do motorista"
                      value={formData.nome}
                      onChange={handleChange}
                      className={errors.nome ? "input-error" : ""}
                    />
                    {errors.nome && (
                      <span className="error-message">{errors.nome}</span>
                    )}
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
                      <option value="pista">Truck</option>
                      <option value="lider">Toco</option>
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
                      className={errors.email ? "input-error" : ""}
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>
                  <div className="form-group celular-group">
                    <label htmlFor="celular">Celular</label>
                    <input
                      id="celular"
                      type="text"
                      name="celular"
                      value={formData.celular}
                      onChange={handleCelularChange}
                      placeholder="(99) 99999-9999"
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

                {/* ✅ Novos campos adicionados (CNH, Categoria, Vencimento) */}
                <div className="form-row three-cols">
                  <div className="form-group cnh-group">
                    <label htmlFor="cnh">CNH</label>
                    <input
                      id="cnh"
                      type="text"
                      name="cnh"
                      value={formData.cnh}
                      onChange={handleCNHChange}
                      maxLength="11"
                      className={errors.cnh ? "input-error" : ""}
                    />
                    {errors.cnh && (
                      <span className="error-message">{errors.cnh}</span>
                    )}
                  </div>

                  <div className="form-group categoria-group">
                    <label htmlFor="categoria">Categoria</label>
                    <input
                      id="categoria"
                      type="text"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleCategoriaCNHChange}
                      maxLength="2"
                      className={errors.categoria ? "input-error" : ""}
                    />
                    {errors.categoria && (
                      <span className="error-message">{errors.categoria}</span>
                    )}
                  </div>

                  <div className="form-group vencimento-group">
                    <label htmlFor="vencimento">Vencimento</label>
                    <input
                      id="vencimento"
                      type="date"
                      name="vencimento"
                      value={formData.vencimento}
                      onChange={handleChange}
                      className={errors.vencimento ? "input-error" : ""}
                    />
                    {errors.vencimento && (
                      <span className="error-message">{errors.vencimento}</span>
                    )}
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

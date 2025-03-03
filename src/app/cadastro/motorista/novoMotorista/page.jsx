"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import "../../../../styles/novoMotorista.css";

export default function NovoMotoristaPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState("dados-gerais"); // Estado para controlar a aba ativa
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
      !formData.cnh ||
      !formData.categoria ||
      !formData.vencimento ||
      !formData.usuarioSistema ||
      !formData.senhaSistema
    ) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    router.push("/cadastro/motorista/novoMotorista");
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
                      onChange={handleChange}
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
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group categoria-group">
                    <label htmlFor="categoria">Categoria</label>
                    <input
                      id="categoria"
                      type="text"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group vencimento-group">
                    <label htmlFor="vencimento">Vencimento</label>
                    <input
                      id="vencimento"
                      type="date"
                      name="vencimento"
                      value={formData.vencimento}
                      onChange={handleChange}
                    />
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

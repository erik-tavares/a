"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import "../../../../styles/novoOperador.css";

export default function NovoOperadorPage() {
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
      !formData.usuarioSistema ||
      !formData.senhaSistema
    ) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    console.log("Novo operador:", formData);
    router.push("/cadastro/operadores");
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
              <h2>Configuração de Comissão</h2>
              <p>EM BREVE</p>
            </div>
          )}
        </div>

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

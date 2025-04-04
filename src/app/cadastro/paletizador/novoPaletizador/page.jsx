"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import "../../../../styles/novoPaletizador.css";
import { IoMdAddCircle } from "react-icons/io";
export default function NovoPaletizadorPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nome: "",
    codigo: "Auto",
    situacao: "ativo",
    email: "",
    celular: "",
    salario: "",
  });

  const validarCampos = () => {
    let newErrors = {};

    if (!formData.nome || formData.nome.trim() === "")
      newErrors.nome = "Campo obrigatório";
    if (!formData.email || formData.email.trim() === "")
      newErrors.email = "Campo obrigatório";
    if (!formData.celular || formData.celular.trim() === "")
      newErrors.celular = "Campo obrigatório";
    if (!formData.salario || formData.salario.trim() === "")
      newErrors.salario = "Campo obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna "true" se não houver erros
  };

  const [metas, setMetas] = useState([
    { produto: "", tipo: "Palete", quantidade: "Palete" },
  ]);

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

  const handleSalarioChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Apenas números
    let numericValue = parseFloat(value) / 100;

    value = numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setFormData((prev) => ({ ...prev, salario: value }));

    if (value.trim() !== "R$ 0,00") {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.salario;
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

  const handleQuantidadeChange = (e, index) => {
    let value = e.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, "");

    // Atualiza a quantidade no array de metas
    const newMetas = [...metas];
    newMetas[index].quantidade = value || ""; // Garante que o valor sempre seja uma string vazia quando apagado
    setMetas(newMetas);
  };

  const handleMetaChange = (index, e) => {
    const { name, value } = e.target;
    const newMetas = [...metas];
    newMetas[index][name] = value;
    setMetas(newMetas);
  };

  const addMeta = () => {
    setMetas([...metas, { produto: "", tipo: "Palete", quantidade: "Palete" }]);
  };

  return (
    <div
      className={`paletizadorNovo-container ${
        isSidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="paletizadorNovo-content">
        <div className="paletizadorNovo-header">
          <h1 className="paletizador-title">Paletizador</h1>
          <button onClick={() => router.back()} className="back-button">
            &larr; voltar
          </button>
        </div>
        <hr className="linha-divisoria" />
        {/* Dados Gerais */}
        <div className="dados-gerais">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                name="nome"
                className={`input-nome ${errors.nome ? "input-error" : ""}`}
                placeholder="Nome completo do paletizador"
                value={formData.nome}
                onChange={handleChange}
              />
              {errors.nome && (
                <span className="error-message">{errors.nome}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="codigo">Código</label>
              <input
                id="codigo"
                type="text"
                name="codigo"
                className="input-codigo"
                value={formData.codigo}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="situacao">Situação</label>
              <select
                id="situacao"
                name="situacao"
                className="input-situacao"
                value={formData.situacao}
                onChange={handleChange}
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                className={`input-email ${errors.email ? "input-error" : ""}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="celular">Celular</label>
              <input
                id="celular"
                type="text"
                name="celular"
                className={`input-celular ${
                  errors.celular ? "input-error" : ""
                }`}
                value={formData.celular}
                onChange={handleCelularChange}
                placeholder="(99) 99999-9999"
              />
              {errors.celular && (
                <span className="error-message">{errors.celular}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="salario">Salário</label>
              <input
                id="salario"
                type="text"
                name="salario"
                className={`input-salario ${
                  errors.salario ? "input-error" : ""
                }`}
                value={formData.salario}
                onChange={handleSalarioChange}
                placeholder="R$ 0,00"
              />
              {errors.salario && (
                <span className="error-message">{errors.salario}</span>
              )}
            </div>
          </div>
        </div>

        {/* Metas de Produção */}
        <hr className="linha-divisoria3" />
        <h2 className="metas-title">Metas Produção</h2>
        <div className="metas-producao">
          <table className="metas-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Tipo</th>
                <th>Quantidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {metas.map((meta, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      name="produto"
                      className="input-produto"
                      value={meta.produto}
                      onChange={(e) => handleMetaChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input-tipo"
                      placeholder="Palete"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input-quantidade"
                      value={metas[index]?.quantidade || ""}
                      onChange={(e) => handleQuantidadeChange(e, index)}
                    />
                  </td>

                  <td>
                    <button className="salvar-meta">salvar</button>
                  </td>
                </tr>
              ))}
              <tr>
                <th colSpan="1">Totais</th>
                <td>0</td>
                <td>0,00</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <button className="add-meta-btn" onClick={addMeta}>
            <IoMdAddCircle /> adicionar item
          </button>
        </div>

        <hr className="linha-divisoria2" />
        <div className="buttons">
          <button className="save-btn" onClick={handleSave}>
            salvar
          </button>
          <button className="cancel-btn">cancelar</button>
        </div>
      </div>
    </div>
  );
}

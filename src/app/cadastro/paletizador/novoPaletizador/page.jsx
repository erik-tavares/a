"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import "../../../../styles/novoPaletizador.css";
import { IoMdAddCircle } from "react-icons/io";
export default function NovoPaletizadorPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    codigo: "Auto",
    situacao: "ativo",
    email: "",
    celular: "",
    salario: "",
  });

  const [metas, setMetas] = useState([
    { produto: "", tipo: "Palete", quantidade: "Palete" },
  ]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
                className="input-nome"
                placeholder="Nome completo do paletizador"
                value={formData.nome}
                onChange={handleChange}
              />
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
                className="input-email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="celular">Celular</label>
              <input
                id="celular"
                type="text"
                name="celular"
                className="input-celular"
                value={formData.celular}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="salario">Salário</label>
              <input
                id="salario"
                type="text"
                name="salario"
                className="input-salario"
                value={formData.salario}
                onChange={handleChange}
              />
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
                      placeholder="Palete"
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
          <button className="save-btn">salvar</button>
          <button className="cancel-btn">cancelar</button>
        </div>
      </div>
    </div>
  );
}

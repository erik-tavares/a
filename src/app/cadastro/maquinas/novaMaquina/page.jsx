"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Sidebar from "@/components/Sidebar"; // ✅ Importação do Sidebar
import { FaArrowLeft } from "react-icons/fa";
import "../../../../styles/novaMaquina.css";

export default function NovaMaquinaPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ Estado do Sidebar
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [situacao, setSituacao] = useState("Ativo");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`nova-maquina-container ${
        isSidebarOpen ? "sidebar-open" : ""
      }`}
    >
      {/* ✅ Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* ✅ Conteúdo principal */}
      <div className="nova-maquina-content">
        {/* ✅ Cabeçalho */}
        <div className="nova-maquina-header">
          <h1 className="nova-maquina-title">Máquina</h1>
          <button className="voltar-button" onClick={() => router.back()}>
            <FaArrowLeft /> voltar
          </button>
        </div>

        <hr className="status-divider" />

        {/* ✅ Formulário */}
        <form className="nova-maquina-form">
          <div className="form-group">
            <label htmlFor="nome">Modelo</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="codigo">Código</label>
            <input
              type="text"
              id="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Auto"
              className="codigo-input"
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="situacao">Situação</label>
            <select
              id="situacao"
              value={situacao}
              onChange={(e) => setSituacao(e.target.value)}
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
        </form>

        {/* ✅ Botões */}
        <div className="botoes-container">
          <hr className="status-divider" />
          <button className="salvar-button">salvar</button>
          <button className="cancelar-button" onClick={() => router.back()}>
            cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

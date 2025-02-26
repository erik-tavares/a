"use client";

import { FaTimes } from "react-icons/fa";
import "../styles/rightSidebar.css";

export default function RightSidebar({ isOpen, toggle }) {
  return (
    <div className={`right-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-content">
        {/* ✅ Botão de Fechar */}
        <button className="close-sidebar" onClick={toggle}>
          fechar <FaTimes />
        </button>

        {/* ✅ Título */}
        <h2>Lançamento de estoque</h2>

        {/* ✅ Formulário */}
        <form>
          <div className="form-row">
            <div className="form-group">
              <label>Tipo</label>
              <select>
                <option>Entrada | Saída</option>
              </select>
            </div>

            <div className="form-group">
              <label>Data</label>
              <input type="date" />
            </div>

            <div className="form-group">
              <label>Hora</label>
              <input type="time" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Quantidade</label>
              <input type="number" placeholder="Quantidade" />
            </div>

            <div className="form-group">
              <label>Lote</label>
              <select>
                <option>Buscar Lote</option>
              </select>
            </div>

            <div className="form-group">
              <label>Linha</label>
              <select>
                <option>Primeira |</option>
              </select>
            </div>

            <div className="form-group">
              <label>Depósito</label>
              <select>
                <option>Selecionar</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Observações</label>
            <textarea placeholder="Digite suas observações..."></textarea>
          </div>

          {/* ✅ Botões de Ação */}
          <div className="form-buttons">
            <button type="submit" className="salvar">
              salvar
            </button>
            <button type="button" className="cancelar" onClick={toggle}>
              cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

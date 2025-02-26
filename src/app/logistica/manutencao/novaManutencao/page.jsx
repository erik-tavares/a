"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaEllipsisV, FaPlus } from "react-icons/fa";
import Sidebar from "@/components/Sidebar"; // ✅ Importando Sidebar
import "../../../../styles/novaManutencao.css";
import "../../../../styles/novaEntrega.css";

export default function NovaManutencao() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ Estado para controle do Sidebar

  const handleVoltar = () => {
    router.back();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // ✅ Alterna entre aberto e fechado
  };

  return (
    <div
      className={`nova-entrega-container ${
        isSidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-6">
        {/* ✅ Botão para abrir/fechar o Sidebar */}

        {/* ✅ Cabeçalho */}
        <div className="nova-manutencao">
          <div className="nova-manutencao-header">
            <h1 className="nova-manutencao-title">Nova manutenção</h1>
            <div className="botoes-container">
              <button className="voltar-button" onClick={handleVoltar}>
                <FaArrowLeft /> voltar
              </button>
              <button className="acoes-button">
                ações <FaEllipsisV />
              </button>
            </div>
          </div>
        </div>

        <h2 className="dados-gerais-title">dados gerais</h2>
        <hr className="status-divider" />
        {/* ✅ Dados gerais */}
        <div className="dados-gerais">
          <div className="grid-container">
            <div className="form-group">
              <label>Placa</label>
              <select className="input-placa"></select>
            </div>
            <div className="form-group">
              <label>Motorista</label>
              <select className="input-motorista"></select>
            </div>
            <div className="form-group">
              <label>Marca</label>
              <input type="text" className="input-marca" disabled />
            </div>
            <div className="form-group">
              <label>Modelo</label>
              <input type="text" className="input-modelo" disabled />
            </div>
            <div className="form-group">
              <label>Número da Manutenção</label>
              <input
                type="text"
                className="input-num-manu"
                value="03"
                disabled
              />
            </div>
            <div className="form-group">
              <label>Data Inicial</label>
              <input type="date" className="input-data-inicial" />
            </div>
            <div className="form-group">
              <label>Data Final</label>
              <input type="date" className="input-data-final" />
            </div>
            <div className="form-group">
              <label>Km hodômetro</label>
              <input type="text" className="input-km-hodometro" />
            </div>
            <div className="form-group">
              <label>Tipo</label>
              <input type="text" className="input-tipo" disabled />
            </div>
            <div className="form-group">
              <label>Valor Manutenção (R$)</label>
              <div className="valor-manutencao">
                <span className="icone-moeda">R$</span>
                <input
                  type="text"
                  className="input-valor-manu"
                  placeholder="1.500,00"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Componente</label>
              <input type="text" className="input-componente" />
            </div>
            <div className="form-group">
              <label>Tipo da Manutenção</label>
              <select className="input-tipo-manu">
                <option>Ajuste | Corretiva</option>
              </select>
            </div>
          </div>
        </div>
        <hr className="status-divider" />

        <h2 className="cliente-title">Peças e Mão de Obra</h2>
        {/* ✅ Peças e Mão de Obra */}
        <div className="cliente-produtos">
          <div className="tabela-produtos-container">
            <table className="tabela-produtos">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Aplicação</th>
                  <th>Unidade</th>
                  <th>Quantidade</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="text" className="input-produto" />
                  </td>
                  <td>
                    <input type="text" className="input-aplicacao" />
                  </td>
                  <td>
                    <input type="text" className="input-unidade" />
                  </td>
                  <td>
                    <input type="text" className="input-quantidade" />
                  </td>
                  <td>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="input-valor"
                        value="1.500,00"
                        disabled
                      />
                    </div>
                  </td>
                  <td className="botoes-acoes">
                    <button className="save-btn">salvar</button>
                  </td>
                </tr>
                <tr>
                  <th>Totais</th>
                  <td></td>
                  <th>0</th>
                  <th>0,00</th>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="adicionar-item">
            <FaPlus /> adicionar item
          </button>
        </div>

        {/* ✅ Observações */}
        <div className="cliente-produtos">
          <h2 className="cliente-produtos-title">Observações:</h2>
          <textarea
            className="w-full border p-3 rounded-md"
            rows="3"
          ></textarea>
        </div>
        <hr className="status-divider" />
        {/* ✅ Botões */}
        <div className="botoes-container">
          <button className="salvar-button">salvar</button>
          <button className="finalizar-button">finalizar</button>
        </div>
      </div>
    </div>
  );
}

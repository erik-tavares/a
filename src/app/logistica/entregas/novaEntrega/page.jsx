"use client";

import { useState } from "react";
import {
  FaArrowLeft,
  FaEllipsisH,
  FaPlus,
  FaTrash,
  FaEllipsisV,
} from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import "../../../../styles/novaEntrega.css";
import "../../../../styles/produto.css";
import { useRouter } from "next/navigation"; // Importa o roteador do Next.js
import ModalOptionsNovaEntrega from "@/components/ModalNovaEntrega";

export default function NovaEntrega() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tabelas, setTabelas] = useState([1]); // Estado inicial com uma tabela
  const router = useRouter(); // Instancia o roteador
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // ✅ Função para adicionar nova tabela
  const adicionarTabela = () => {
    setTabelas([...tabelas, tabelas.length + 1]);
  };

  // ✅ Função para excluir uma tabela específica
  const excluirTabela = (id) => {
    setTabelas(tabelas.filter((tabela) => tabela !== id));
  };

  return (
    <div
      className={`nova-entrega-container ${
        isSidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="nova-entrega-content">
        {/* ✅ Cabeçalho */}
        <div className="produtos-header">
          {/* Título */}
          <h1 className="produtos-title">Nova Entrega</h1>

          {/* Botões de ação alinhados à direita */}
          <div className="acoes-container">
            <button
              className="add-produto-btn"
              onClick={() => router.push("/logistica/entregas")}
            >
              {" "}
              &larr; Voltar{" "}
            </button>
            <button className="modalNovaEntrega" onClick={toggleModal}></button>

            <ModalOptionsNovaEntrega
              isOpen={isModalOpen}
              toggleModal={toggleModal}
            />
          </div>
        </div>
        <h2 className="dados-gerais-title">dados gerais</h2>

        <hr className="status-divider" />

        {/* ✅ Seção de Dados Gerais */}
        <div className="dados-gerais">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="placa">Placa</label>
              <select id="placa" className="input select">
                <option>Selecione</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="motorista">Motorista</label>
              <select id="motorista" className="input select">
                <option>Selecione</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="marca">Marca</label>
              <input
                id="marca"
                type="text"
                className="input-marca"
                placeholder="Marca"
              />
            </div>

            <div className="form-group">
              <label htmlFor="modelo">Modelo</label>
              <input
                id="modelo"
                type="text"
                className="input-modelo"
                placeholder="Modelo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="num-entrega">Número da Entrega</label>
              <input
                id="num-entrega"
                type="text"
                className="input-num-entrega"
                placeholder="03"
              />
            </div>

            <div className="form-group">
              <label htmlFor="data-entrega">Data da Entrega</label>
              <input id="data-entrega" type="date" className="input-date" />
            </div>

            <div className="form-group">
              <label htmlFor="tipo-frete">Tipo de Frete</label>
              <select id="tipo-frete" className="input select">
                <option>Selecione</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="distancia">Distância (Km)</label>
              <input
                id="distancia"
                type="text"
                className="input-distancia"
                placeholder="Distância (Km)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tipo">Tipo</label>
              <input
                id="tipo"
                type="text"
                className="input-tipo"
                placeholder="Tipo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="valor-frete">Valor do Frete (R$)</label>
              <input
                id="valor-frete"
                type="text"
                className="input-frete"
                placeholder="R$ 1.500"
                readOnly
              />
            </div>
          </div>
        </div>

        <hr className="status-divider" />
        <h2 className="cliente-produtos-title">Cliente | Produtos</h2>

        {/* ✅ Seção Cliente | Produtos */}
        <div className="cliente-produtos">
          <div className="cliente-produtos-grid">
            <div className="form-group nome">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                className="input-nome"
                placeholder="Nome"
              />
            </div>

            <div className="form-group cidade">
              <label htmlFor="cidade">Cidade</label>
              <input
                id="cidade"
                type="text"
                className="input-cidade"
                placeholder="Cidade"
              />
            </div>

            <div className="form-group uf">
              <label htmlFor="uf">UF</label>
              <input
                id="uf"
                type="text"
                className="input-uf"
                placeholder="UF"
              />
            </div>

            <div className="form-group gps">
              <label htmlFor="gps">Localização GPS</label>
              <input
                id="gps"
                type="text"
                className="input-gps"
                placeholder="Localização GPS"
              />
            </div>

            <div className="form-group-container">
              {/* Num Pedido */}
              <div className="form-group">
                <label htmlFor="num-pedido">Num Pedido</label>
                <input
                  type="text"
                  id="num-pedido"
                  className="input-num-pedido"
                  placeholder="Num Pedido"
                />
              </div>

              {/* UF */}
              <div className="form-group uf">
                <label htmlFor="uf">Num NF-e</label>
                <input
                  id="nf-e"
                  type="text"
                  className="input-uf"
                  placeholder="NF-e"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Renderização dinâmica das tabelas */}
        {tabelas.map((id) => (
          <div key={id} className="tabela-produtos-container">
            <table className="tabela-produtos">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Unidade</th>
                  <th>Quantidade</th>
                  <th>Lote</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="text" className="input-produto" />
                  </td>
                  <td>
                    <input type="text" className="input-unidade" />
                  </td>
                  <td>
                    <input type="text" className="input-quantidade" />
                  </td>
                  <td>
                    <div className="select-lote">
                      <select className="lote">
                        <option> Mostra Lote + Estoque</option>
                      </select>
                    </div>
                  </td>
                  <td className="acoes">
                    <div className="botoes-acoes">
                      <button className="save-btn">Salvar</button>
                      <button
                        className="delete-btn"
                        onClick={() => excluirTabela(id)}
                      >
                        <FaTrash /> Excluir
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
                </tr>
              </tbody>
            </table>
          </div>
        ))}

        {/* ✅ Botão Adicionar Item */}
        <button className="adicionar-item" onClick={adicionarTabela}>
          <FaPlus /> adicionar item
        </button>
        <hr className="status-divider" />
        {/* ✅ Botões Salvar e Finalizar */}
        <div className="botoes-container">
          <button className="salvar-button">salvar</button>
          <button className="finalizar-button">finalizar</button>
        </div>
      </div>
    </div>
  );
}

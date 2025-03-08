"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import "../../../../styles/novoVeiculo.css";

export default function NovoVeiculoPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dados");
  const [formData, setFormData] = useState({
    modelo: "",
    ano: "",
    placa: "",
    codigo: "Auto",
    situacao: "Ativo",
    marca: "",
    tipo: "",
    km: "",
  });

  const registros = [
    {
      num: 1,
      data: "01/01/2025",
      km: "09:00:25",
      motorista: "Juarez",
      componente: "VIBROPRENSA",
      tipo: "AJUSTE",
      motivo: "DESCREVER O MOTIVO",
      resumo: "DESCREVER A SOLUÇÃO",
      valor: "00:30",
    },
    {
      num: 2,
      data: "01/01/2025",
      km: "09:00:25",
      motorista: "Emmanuel",
      componente: "CENTRAL DOSADORA",
      tipo: "AJUSTE",
      motivo: "DESCREVER O MOTIVO",
      resumo: "DESCREVER A SOLUÇÃO",
      valor: "01:00",
    },
    {
      num: 3,
      data: "03/01/2025",
      km: "09:00:25",
      motorista: "Juarez",
      componente: "MISTURADOR",
      tipo: "CORRETIVA",
      motivo: "DESCREVER O MOTIVO",
      resumo: "DESCREVER A SOLUÇÃO",
      valor: "00:15",
    },
    {
      num: 4,
      data: "04/01/2025",
      km: "09:00:25",
      motorista: "Emmanuel",
      componente: "ROBÔ PALETIZADOR",
      tipo: "PREVENTIVA",
      motivo: "DESCREVER O MOTIVO",
      resumo: "DESCREVER A SOLUÇÃO",
      valor: "00:35",
    },
    {
      num: 5,
      data: "05/01/2025",
      km: "09:00:25",
      motorista: "Juarez",
      componente: "ESTEIRA 1 MISTURADOR",
      tipo: "CORRETIVA",
      motivo: "DESCREVER O MOTIVO",
      resumo: "DESCREVER A SOLUÇÃO",
      valor: "00:17",
    },
    {
      num: 6,
      data: "06/01/2025",
      km: "09:00:25",
      motorista: "Emmanuel",
      componente: "CARRINHO DAS TÁBUAS",
      tipo: "CORRETIVA",
      motivo: "DESCREVER O MOTIVO",
      resumo: "DESCREVER A SOLUÇÃO",
      valor: "00:30",
    },
    {
      num: 7,
      data: "07/01/2025",
      km: "09:00:25",
      motorista: "Juarez",
      componente: "PARAFUSO DO CONTRA MOLDE",
      tipo: "CORRETIVA",
      motivo: "DESCREVER O MOTIVO",
      resumo: "DESCREVER A SOLUÇÃO",
      valor: "01:00",
    },
    {
      num: 8,
      data: "08/01/2025",
      km: "09:00:25",
      motorista: "Emmanuel",
      componente: "CORREIA DA EXTRATORA",
      tipo: "AJUSTE",
      motivo: "DESCREVER O MOTIVO",
      resumo: "DESCREVER A SOLUÇÃO",
      valor: "00:15",
    },
    {
      num: 9,
      data: "09/01/2025",
      km: "09:00:25",
      motorista: "Juarez",
      componente: "PAINEL CLP",
      tipo: "CORRETIVA",
      motivo: "DESCREVER O MOTIVO",
      resumo: "DESCREVER A SOLUÇÃO",
      valor: "00:35",
    },
    {
      num: 10,
      data: "10/01/2025",
      km: "09:00:25",
      motorista: "Emmanuel",
      componente: "VIBROPRENSA",
      tipo: "AJUSTE",
      motivo: "DESCREVER O MOTIVO",
      resumo: "DESCREVER A SOLUÇÃO",
      valor: "00:17",
    },
  ];

  const handleAnoChange = (e) => {
    let value = e.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, "");

    // Limita a 4 dígitos
    value = value.slice(0, 4);

    setFormData((prev) => ({ ...prev, ano: value }));
  };

  const handlePlacaChange = (e) => {
    let value = e.target.value.toUpperCase(); // Converte para maiúsculas automaticamente

    // Remove tudo que não for letra ou número
    value = value.replace(/[^A-Z0-9]/g, "");

    if (value.length <= 3) {
      // Mantém apenas letras na primeira parte
      value = value.replace(/[^A-Z]/g, "");
    } else if (value.length === 4) {
      // Se for Mercosul, força um número na 4ª posição
      value = value.replace(/^([A-Z]{3})([A-Z])/g, "$1-$2");
    } else {
      // Formata para AAA-0A00 (Mercosul) ou AAA-0000 (padrão antigo)
      value = value.replace(/^([A-Z]{3})-?(\d)([A-Z]?)(\d{0,2})$/, "$1-$2$3$4");
    }

    setFormData((prev) => ({ ...prev, placa: value }));
  };

  return (
    <div
      className={`novoVeiculo-container ${isSidebarOpen ? "sidebar-open" : ""}`}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="novoVeiculo-content">
        <div className="novoVeiculo-header">
          <h1 className="novoVeiculo-title">
            <h1 className="novoVeiculo-title">
              {activeTab === "dados" ? "Novo veículo" : "Veículos"}
            </h1>
          </h1>
          <button className="btn-voltar" onClick={() => router.back()}>
            &larr; voltar
          </button>
        </div>

        <div className="novoVeiculo-tabs">
          <span
            className={activeTab === "dados" ? "active" : ""}
            onClick={() => setActiveTab("dados")}
          >
            dados gerais
          </span>
          <span
            className={activeTab === "registros" ? "active" : ""}
            onClick={() => setActiveTab("registros")}
          >
            registros
          </span>
        </div>
        <hr className="status-dividerTop" />
        <div className="novoVeiculo-form">
          {activeTab === "dados" && (
            <div className="form-grid">
              <div className="form-group">
                <label>Modelo</label>
                <input type="text" className="input-modelo" />
              </div>
              <div className="form-group">
                <label>Ano</label>
                <input
                  type="text"
                  className="input-ano"
                  value={formData.ano}
                  onChange={handleAnoChange}
                />
              </div>

              <div className="form-group">
                <label>Placa</label>
                <input
                  type="text"
                  className="input-placa"
                  value={formData.placa || ""}
                  onChange={handlePlacaChange}
                  maxLength="8"
                />
              </div>

              <div className="form-group">
                <label>Código</label>
                <input
                  type="text"
                  value="Auto"
                  className="input-codigo"
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Situação</label>
                <select className="input-situacao">
                  <option>Ativo</option>
                  <option>Inativo</option>
                </select>
              </div>
              <div className="form-group">
                <label>Marca</label>
                <input type="text" className="input-marca" />
              </div>
              <div className="form-group">
                <label>Tipo</label>
                <input type="text" className="input-tipo" />
              </div>
              <div className="form-group">
                <label>Km</label>
                <input type="text" className="input-km" disabled />
              </div>
            </div>
          )}
        </div>

        {activeTab === "registros" && (
          <table className="novoVeiculo-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Num</th>
                <th>Data</th>
                <th>Km</th>
                <th>Motorista</th>
                <th>Componente</th>
                <th>Tipo da Manutenção</th>
                <th>Motivo</th>
                <th>Resumo</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro) => (
                <tr key={registro.num}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{registro.num}</td>
                  <td>{registro.data}</td>
                  <td>{registro.km}</td>
                  <td>{registro.motorista}</td>
                  <td>{registro.componente}</td>
                  <td>{registro.tipo}</td>
                  <td>{registro.motivo}</td>
                  <td>{registro.resumo}</td>
                  <td>{registro.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <hr className="status-dividerBottom" />

        <div className="novoVeiculo-footer">
          <button className="btn-salvar">salvar</button>
          <button className="btn-cancelar">cancelar</button>
        </div>
      </div>
    </div>
  );
}

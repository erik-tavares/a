"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import "../../../../styles/novoCliente.css";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function NovoClientePage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState("dados-gerais"); // Estado para controlar a aba ativa
  const [formData, setFormData] = useState({
    nome: "",
    cnpjCpf: "",
    codigo: "Auto",
    email: "",
    celular: "",
    situacao: "ativo",
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
      !formData.cnpjCpf ||
      !formData.email ||
      !formData.celular
    ) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    router.push("/cadastro/cliente/novoCliente");
  };

  // Dados da tabela de entregas (mockados para teste)
  const entregas = [
    {
      num: 1,
      data: "01/01/2025",
      placa: "HTX 900-01",
      motorista: "Juarez",
      endereco: "CONCATENAR CIDADE + UF",
      pedido: 0,
      nfe: "M²",
      frete: "0%",
      numEntrega: 1,
    },
    {
      num: 2,
      data: "01/01/2025",
      placa: "HTX 900-02",
      motorista: "Emmanuel",
      endereco: "BLOCO DE CONCRETO - 19X19X39",
      pedido: 0,
      nfe: "UND",
      frete: "0%",
      numEntrega: 2,
    },
    {
      num: 3,
      data: "03/01/2025",
      placa: "HTX 900-01",
      motorista: "Juarez",
      endereco: "PISO INTERTRAVADO H8 - 10X20X8",
      pedido: 700,
      nfe: "M²",
      frete: "1,5%",
      numEntrega: 3,
    },
    {
      num: 4,
      data: "04/01/2025",
      placa: "HTX 900-02",
      motorista: "Emmanuel",
      endereco: "PISO INTERTRAVADO H8 - 10X20X8",
      pedido: 0,
      nfe: "M²",
      frete: "0%",
      numEntrega: 4,
    },
    {
      num: 5,
      data: "05/01/2025",
      placa: "HTX 900-01",
      motorista: "Juarez",
      endereco: "BLOCO DE CONCRETO - 19X19X39",
      pedido: 0,
      nfe: "UND",
      frete: "0%",
      numEntrega: 5,
    },
    {
      num: 6,
      data: "06/01/2025",
      placa: "HTX 900-02",
      motorista: "Emmanuel",
      endereco: "PISO INTERTRAVADO H8 - 10X20X8",
      pedido: 700,
      nfe: "M²",
      frete: "1,5%",
      numEntrega: 6,
    },
    {
      num: 7,
      data: "07/01/2025",
      placa: "HTX 900-01",
      motorista: "Juarez",
      endereco: "PISO INTERTRAVADO H8 - 10X20X8",
      pedido: 0,
      nfe: "M²",
      frete: "0%",
      numEntrega: 7,
    },
    {
      num: 8,
      data: "08/01/2025",
      placa: "HTX 900-02",
      motorista: "Emmanuel",
      endereco: "BLOCO DE CONCRETO - 19X19X39",
      pedido: 0,
      nfe: "UND",
      frete: "0%",
      numEntrega: 8,
    },
    {
      num: 9,
      data: "09/01/2025",
      placa: "HTX 900-01",
      motorista: "Juarez",
      endereco: "PISO INTERTRAVADO H8 - 10X20X8",
      pedido: 700,
      nfe: "M²",
      frete: "1,5%",
      numEntrega: 9,
    },
    {
      num: 10,
      data: "10/01/2025",
      placa: "HTX 900-02",
      motorista: "Emmanuel",
      endereco: "PISO INTERTRAVADO H8 - 10X20X8",
      pedido: 700,
      nfe: "M²",
      frete: "1,5%",
      numEntrega: 10,
    },
  ];

  return (
    <div
      className={`clientesNovo-container ${
        isSidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="clientesNovo-content">
        <div className="clientesNovo-header">
          <h1 className="clientesNovo-title">
            {abaSelecionada === "entregas" ? "Clientes" : "Novo Cliente"}
          </h1>
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
              abaSelecionada === "entregas" ? "active" : "inactive"
            }`}
            onClick={() => setAbaSelecionada("entregas")}
          >
            entregas
          </span>
        </div>
        <hr className="status-divider" />
        <div className="aba-conteudo">
          {abaSelecionada === "dados-gerais" && (
            <>
              <div className="novo-clientes-form">
                <div className="form-row three-cols">
                  <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                      id="nome"
                      type="text"
                      name="nome"
                      className="input-nome"
                      placeholder="Razão ou Fantasia"
                      value={formData.nome}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cnpjCpf">CNPJ/CPF</label>
                    <input
                      id="cnpjCpf"
                      type="text"
                      name="cnpjCpf"
                      className="input-cnpj-cpf"
                      value={formData.cnpjCpf}
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
                </div>

                <div className="form-row three-cols">
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
              </div>
              <hr className="status-divider2" />
              <div className="buttons">
                <button className="save-btn" onClick={handleSave}>
                  salvar
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => router.push("/cadastro/clientes")}
                >
                  cancelar
                </button>
              </div>
            </>
          )}
          {abaSelecionada === "entregas" && (
            <>
              <table className="entregas-table">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>Num</th>
                    <th>Data</th>
                    <th>Placa</th>
                    <th>Motorista</th>
                    <th>Endereço</th>
                    <th>Pedido</th>
                    <th>NF-e</th>
                    <th>Frete</th>
                    <th>Num Entrega</th>
                  </tr>
                </thead>
                <tbody>
                  {entregas.map((entrega, index) => (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{entrega.num}</td>
                      <td>{entrega.data}</td>
                      <td>{entrega.placa}</td>
                      <td>{entrega.motorista}</td>
                      <td>{entrega.endereco}</td>
                      <td>{entrega.pedido}</td>
                      <td>{entrega.nfe}</td>
                      <td>{entrega.frete}</td>
                      <td>{entrega.numEntrega}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr className="status-divider3" />
              <div className="paginacao">
                <span>01</span>
                <span>02</span>
                <span>
                  <FaLongArrowAltRight />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

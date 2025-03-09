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
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nome: "",
    cnpjCpf: "",
    codigo: "Auto",
    email: "",
    celular: "",
    situacao: "ativo",
  });

  const validarCampos = () => {
    let newErrors = {};

    if (!formData.nome || formData.nome.trim() === "")
      newErrors.nome = "Campo obrigatório";
    if (!formData.cnpjCpf || formData.cnpjCpf.trim() === "")
      newErrors.cnpjCpf = "Campo obrigatório";
    if (!formData.email || formData.email.trim() === "")
      newErrors.email = "Campo obrigatório";
    if (!formData.celular || formData.celular.trim() === "")
      newErrors.celular = "Campo obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna "true" se não houver erros
  };

  const handleCnpjCpfChange = (e) => {
    let value = e.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, "");

    if (value.length <= 11) {
      // CPF: 000.000.000-00
      value = value
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2");
    } else {
      // CNPJ: 00.000.000/0000-00
      value = value
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    setFormData((prev) => ({ ...prev, cnpjCpf: value }));
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

  const handleSave = () => {
    if (validarCampos()) {
      console.log("Formulário válido! Enviar dados ao backend...");
      setErrors({}); // ✅ Limpa todos os erros após salvar com sucesso
    }
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
                      className={`input-nome ${
                        errors.nome ? "input-error" : ""
                      }`}
                      placeholder="Razão ou Fantasia"
                      value={formData.nome}
                      onChange={handleChange}
                    />
                    {errors.nome && (
                      <span className="error-message">{errors.nome}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="cnpjCpf">CNPJ/CPF</label>
                    <input
                      id="cnpjCpf"
                      type="text"
                      name="cnpjCpf"
                      className={`input-cnpj-cpf ${
                        errors.cnpjCpf ? "input-error" : ""
                      }`}
                      value={formData.cnpjCpf}
                      onChange={handleCnpjCpfChange}
                    />
                    {errors.cnpjCpf && (
                      <span className="error-message">{errors.cnpjCpf}</span>
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
                </div>

                <div className="form-row three-cols">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className={`input-email ${
                        errors.email ? "input-error" : ""
                      }`}
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

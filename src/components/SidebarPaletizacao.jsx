import { useState, useEffect } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";

export default function SidebarEstoque({ isOpen, toggleSidebar }) {
  const [isClosing, setIsClosing] = useState(false);
  const [rows, setRows] = useState([
    {
      id: 1,
      produto: "PISO INTERTRAVADO H8 - 10X20X8",
      lote: "",
      colaborador: "Primeira",
      quantidade: "",
      deposito: "",
    },
  ]);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(true);
      setTimeout(() => setIsClosing(false), 300);
    }
  }, [isOpen]);

  // Função para adicionar uma nova linha à tabela
  //   const adicionarLinha = () => {
  //     setRows([
  //       ...rows,
  //       {
  //         id: Date.now(),
  //         produto: "PISO INTERTRAVADO H8 - 10X20X8",
  //         lote: "",
  //         colaborador: "Primeira",
  //         quantidade: "",
  //         deposito: "",
  //       },
  //     ]);
  //   };

  // Função para atualizar os valores da tabela
  const atualizarLinha = (id, campo, valor) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [campo]: valor } : row))
    );
  };

  return (
    <div
      className={`sidebar-right ${isOpen ? "open" : ""} ${
        isClosing ? "closing" : ""
      }`}
    >
      <div className="sidebar-content">
        {/* Cabeçalho */}
        <div className="sidebar-header">
          <div className="texto-sidebar">
            <h2 className="texto-estoque">Lançamento paletização</h2>
            <span className="subtexto">
              Informar as quantidades por colaborador
            </span>
          </div>
          <button className="close-sidebar" onClick={toggleSidebar}>
            fechar <FaTimes />
          </button>
        </div>

        {/* Tabela */}
        <div className="sidebar-table">
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Lote</th>
                <th>Colaborador</th>
                <th>Quantidade</th>
                <th>Depósito</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="text"
                      value={row.produto}
                      disabled
                      className="disabled-inputproduto"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.lote}
                      className="input-lote"
                      onChange={(e) =>
                        atualizarLinha(row.id, "lote", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={row.linha}
                      className="select-linha"
                      onChange={(e) =>
                        atualizarLinha(row.id, "linha", e.target.value)
                      }
                    >
                      <option>Marcelo</option>
                      <option>Anderson</option>
                      <option>Erik</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.quantidade}
                      className="input-quantidadesidebar"
                      onChange={(e) =>
                        atualizarLinha(row.id, "quantidade", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={row.deposito}
                      className="select-depositosidebar"
                      onChange={(e) =>
                        atualizarLinha(row.id, "deposito", e.target.value)
                      }
                    >
                      <option>Selecione</option>
                    </select>
                  </td>
                  <td>
                    <img className="image" src="/3pontos.svg" alt="" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botão para adicionar nova linha */}
        {/* <button className="add-row-btn" onClick={adicionarLinha}>
          <FaPlus /> Adicionar linha
        </button> */}
        {/* Rodapé */}
        <div className="sidebar-footer">
          <hr />
          <button className="save-btnSidebar">salvar</button>
        </div>
      </div>
    </div>
  );
}

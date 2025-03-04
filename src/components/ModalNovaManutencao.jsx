import { useState } from "react";
import { FaEllipsisV, FaTrash, FaEdit, FaTimes } from "react-icons/fa";

export default function MotoristaModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      {/* ✅ Botão que abre a modal */}
      <button className="acoes-btn" onClick={toggleModal}>
        ações <FaEllipsisV />
      </button>

      {/* ✅ Modal - só exibe se isOpen for true */}
      {isOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) toggleModal(); // Fecha apenas se clicar no fundo
          }}
          role="dialog"
          aria-hidden={!isOpen}
          aria-labelledby="modal-title"
        >
          <div className="modal-content">
            {/* ✅ Botão de Fechar */}
            <button
              className="close-btn"
              onClick={toggleModal}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>

            {/* ✅ Conteúdo da modal */}
            <h3 id="modal-title" className="entrega-titulo">
              <FaEllipsisV /> Ações
            </h3>
            <button className="modal-option">
              <FaTrash /> Excluir manutenção
            </button>
            <button className="modal-option">
              <FaEdit /> Alterar cadastro
            </button>
          </div>
        </div>
      )}
    </>
  );
}

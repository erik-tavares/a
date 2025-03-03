import { useState } from "react";
import { FaEllipsisV, FaTrash, FaEdit, FaTimes } from "react-icons/fa";

export default function MotoristaModal({ entrega }) {
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
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* ✅ Botão de Fechar */}
            <button className="close-btn" onClick={toggleModal}>
              <FaTimes />
            </button>

            {/* ✅ Conteúdo da modal */}
            <h3 className="entrega-titulo">
              <FaEllipsisV /> ações
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

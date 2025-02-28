import { useState } from "react";
import {
  FaEllipsisV,
  FaBox,
  FaEdit,
  FaTimes,
  FaClipboardList,
} from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";

export default function ProducaoModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="acoes-dropdown">
      {/* ✅ Botão que abre a modal */}
      <button className="acoes-btn" onClick={toggleModal}>
        <FaEllipsisV /> Ações
      </button>

      {/* ✅ Modal - Só aparece quando isOpen for true */}
      {isOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleModal}>
              <FaTimes />
            </button>
            <h3 className="motorista-titulo">
              <FaEllipsisV /> Mais ações
            </h3>
            <button className="modal-option">
              <FaBox /> Lançar estoque
            </button>
            <button className="modal-option">
              <FaClipboardList /> Lançar dados paletização
            </button>
            <button className="modal-option">
              <IoReloadOutline /> Estornar estoque
            </button>
            <button className="modal-option">
              <IoReloadOutline /> Estornar dados paletização
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

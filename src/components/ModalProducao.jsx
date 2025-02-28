import { useState } from "react";
import {
  FaEllipsisV,
  FaBox,
  FaEdit,
  FaTimes,
  FaClipboardList,
} from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
export default function MotoristaModal({ motorista }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Ícone que abre a modal */}
      <FaEllipsisV className="action-icon" onClick={toggleModal} />

      {/* Modal - só exibe se isOpen for true */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={toggleModal}>
              <FaTimes />
            </button>
            <h3 className="motorista-titulo"> Produção</h3>
            <button className="modal-option">
              <FaBox /> Lançar estoque
            </button>
            <button className="modal-option">
              <FaClipboardList /> lançar dados paletização
            </button>
            <button className="modal-option">
              <IoReloadOutline /> estornar estoque
            </button>
            <button className="modal-option">
              <IoReloadOutline /> estornar dados paletização
            </button>
          </div>
        </div>
      )}
    </>
  );
}

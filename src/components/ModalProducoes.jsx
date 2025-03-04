import { useState, useEffect } from "react";
import {
  FaEllipsisV,
  FaBox,
  FaEdit,
  FaTimes,
  FaClipboardList,
} from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import SidebarEstoque from "@/components/SidebarEstoque";

export default function ProducaoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldReopenModal, setShouldReopenModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    if (!isSidebarOpen) {
      setShouldReopenModal(isOpen); // Guarda o estado da modal antes de abrir o sidebar
      setIsOpen(false); // Fecha a modal ao abrir o sidebar
    }
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Quando o sidebar for fechado, reabre a modal apenas se ela estava aberta antes
  useEffect(() => {
    if (!isSidebarOpen && shouldReopenModal) {
      setIsOpen(true);
    }
  }, [isSidebarOpen, shouldReopenModal]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setShouldReopenModal(false); // Resetar controle de reabertura
  };

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
            <button className="modal-option" onClick={toggleSidebar}>
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
      {/* Sidebar separado */}
      <SidebarEstoque isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}

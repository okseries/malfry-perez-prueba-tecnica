import React from "react";

interface ModalProps {
  openButton?: React.ReactNode; // botón personalizado para abrir
  title?: string; // título del modal
  children: React.ReactNode; // contenido del modal
  footer?: React.ReactNode; // pie de página del modal
  showCloseButton?: boolean; // mostrar botón de cerrar
  onOpenChange?: (open: boolean) => void;
  isOpen: boolean; // estado de apertura del modal
  onCloseModal: (open: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  openButton,
  title,
  children,
  footer,
  showCloseButton = true,
  onOpenChange,
  isOpen = false,
  onCloseModal,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg rounded-xl bg-white shadow-lg shadow-black/20">
            <div className="border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {title || ""}
                </h2>
                {showCloseButton && (
                  <button
                    onClick={() =>  onCloseModal(false)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="px-6 py-4">{children}</div>

            {footer && <div className="border-t px-6 py-3">{footer}</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
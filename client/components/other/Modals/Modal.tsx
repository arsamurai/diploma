import React from "react";
import cn from "classnames";

interface ModalProps {
  title?: string;
  activeModal: boolean;
  setActiveModal: (activeModal: boolean) => void;
  //modalForImg,
  children: React.ReactNode;
	className?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  activeModal,
  setActiveModal,
  //modalForImg,
  children,
	className,
}) => {
  const closeActiveModal = () => {
    setActiveModal(false);
  };

  return (
    <div
      className={cn("modal", { active: activeModal })}
      onClick={closeActiveModal}
    >
      <div
        className={cn(
          "modal__content",
					className,
          {
            "active": activeModal,
          },
          // {
          //   "modalForImg": modalForImg,
          // }
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          {title && <h3 className="modal__title">{title}</h3>}
          <div className="modal__close" onClick={closeActiveModal}>
            <span>×</span>
          </div>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

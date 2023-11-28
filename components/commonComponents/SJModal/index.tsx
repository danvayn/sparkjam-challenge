import SJButton from "../SJButton/SJButton";
import { SJButtonColorScheme } from "../SJButton/helpers";
import modalStyles from "./modal.module.css";
// import ModalButtons from "./ModalButtons";

export type SJModalType = "Normal" | "Warning";

const buttonColorSchemes = {
  "Normal": {left: SJButtonColorScheme.NEUTRAL, right: SJButtonColorScheme.GREEN},
  "Warning": {left: SJButtonColorScheme.NEUTRAL, right: SJButtonColorScheme.RED},
}

export interface SJModalProps {
  type?: SJModalType;
  isModalOpen?: boolean;
  title: String;
  message: JSX.Element | String;
  hasCloseButton: boolean;
  onClose?: Function;
  onConfirm?: Function;
  children?: React.ReactNode;
}

const SJModal: React.FC<SJModalProps> = ({
  type="Normal",
  isModalOpen,
  title,
  message,
  hasCloseButton,
  onClose,
  onConfirm,
  children,
}) => {

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    close();
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    close();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

  return (
    <div className={modalStyles.wrapper}>
      <dialog
        open={isModalOpen}
        onKeyDown={handleKeyDown}
        className={modalStyles.modal}
      >
        {hasCloseButton && (// Todo: UseIconButton instead of x
          <button className={modalStyles.closeButton} onClick={handleClose}>
            x
          </button>
        )}
        {
          <>
            <h2 className="text-3xl text-center">{title}</h2>
            <p className="text-xl text-black">{message}</p>
            <div className={modalStyles.buttonContainer}>
              {children || (
              <>
                <SJButton
                  colorScheme={buttonColorSchemes[type].left}
                  onClick={handleClose}
                  className="grow rounded-full"
                >
                  Cancel
                </SJButton>
                <SJButton
                  colorScheme={buttonColorSchemes[type].right}
                  onClick={handleConfirm}
                  className="grow rounded-full"
                >
                  Confirm
                </SJButton>
                </>)}
            </div>
          </>
        }
      </dialog>
      <div className={modalStyles.background} onClick={handleClose}/>
    </div>
  );
};

export default SJModal;

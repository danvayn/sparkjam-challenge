import React, { createContext, useContext, useRef, useState } from "react";
import SJModal from "@/components/commonComponents/SJModal";
import { SJModalType } from "@/components/commonComponents/SJModal";
// import SJButton from "@/components/commonComponents/SJButton/SJButton";
// import { SJButtonColorScheme } from "@/components/commonComponents/SJButton/helpers";

type ModalContextType = {
  showModal: (
    title: string,
    message: JSX.Element | String,
    type?: SJModalType
  ) => Promise<boolean>;
};

type ModalContextProviderProps = {
  children: React.ReactNode;
};

const ModalContext = createContext<ModalContextType>({} as ModalContextType);

const ModalContextProvider: React.FC<ModalContextProviderProps> = ({
  children,
}) => {
  const [modalContent, setContent] = useState<{
    title: String;
    message: JSX.Element | String;
    type?: SJModalType;
  } | null>();

  const resolver = useRef<Function>();

  const handleShow = (
    title: string,
    message: JSX.Element | String,
    type?: SJModalType
  ): Promise<boolean> => {
    setContent({
      title,
      message,
      type,
    });
    return new Promise(function (resolve) {
      resolver.current = resolve;
    });
  };

  const modalContext: ModalContextType = {
    showModal: handleShow,
  };

  const handleOk = () => {
    resolver.current && resolver.current(true);
    setContent(null);
  };

  const handleCancel = () => {
    resolver.current && resolver.current(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider value={modalContext}>
      {children}
      {modalContent && (
        <>
          <SJModal
            isModalOpen={true}
            type={modalContent.type}
            hasCloseButton={true}
            title={modalContent.title}
            message={modalContent.message}
            onClose={handleCancel}
            onConfirm={handleOk}
          />
          {/* <SJModal
            isModalOpen={true}
            type={modalContent.type}
            hasCloseButton={true}
            title={modalContent.title}
            message={modalContent.message}
          >
            <SJButton
              colorScheme={SJButtonColorScheme.BLACK}
              onClick={handleCancel}
              className="grow rounded-full"
            >
              Cancel
            </SJButton>
            <SJButton
              colorScheme={SJButtonColorScheme.RED}
              onClick={handleOk}
              className="grow rounded-full"
            >
              Confirm
            </SJButton>
          </SJModal> */}
        </>
      )}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ModalContextType => useContext(ModalContext);

export default ModalContextProvider;

import { ReactNode } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 380px;
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    padding-bottom: 40px;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

interface ModalLayoutProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalLayout = ({ show, onClose, children }: ModalLayoutProps) => {
  if (!show) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalBackground>
  );
};

export default ModalLayout;

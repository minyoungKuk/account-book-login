import React from "react";
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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 340px;
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

const ModalButtonWrapper = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    padding: 12px 20px;
    border: none;
    background-color: #57648c;
    font-weight: 600;
    cursor: pointer;
    border-radius: 4px;
    color: #fff;

    &:first-child {
      background-color: #934a5f;
    }
  }
`;

const Modal = ({ show, onClose, message, onConfirm }) => {
  if (!show) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <ModalButtonWrapper>
          <button onClick={onConfirm}>확인</button>
          <button onClick={onClose}>취소</button>
        </ModalButtonWrapper>
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;

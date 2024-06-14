import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api/api";
import ModalLayout from "../layouts/ModalLayout";
import useLoggedIn from "../zustand/login.store";
import CustomInput from "./CustomInput";

const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  button {
    width: 120px;
    padding: 12px 0;
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

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
}

const LoginModal = ({ show, onClose }: LoginModalProps) => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { logIn } = useLoggedIn();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (user: { id: string; password: string }) =>
      api.auth.login(user),

    onSuccess: (data) => {
      const user = {
        id: data.userId,
        nickname: data.nickname,
        avatar: data.avatar,
      };
      localStorage.setItem("accessToken", data.accessToken);
      logIn(data.accessToken, user);
      console.log("로그인 성공", user);
      navigate("/");
      onClose();
    },

    onError: (error) => {
      console.log("로그인 실패", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      id: userId,
      password: userPassword,
    });
  };

  return (
    <ModalLayout show={show} onClose={onClose}>
      <h4 className="pb-8"> 로그인 후 서비스를 이용해주세요. </h4>
      <form onSubmit={handleSubmit}>
        <CustomInput
          label="아이디"
          type="text"
          id="userId"
          placeholder="아이디를 입력해주세요"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <CustomInput
          label="비밀번호"
          type="password"
          id="userPassword"
          placeholder="비밀번호를 입력해주세요"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />

        <ModalButtonWrapper>
          <button type="button" onClick={onClose}>
            취소
          </button>

          <button type="submit"> 로그인 </button>
        </ModalButtonWrapper>
      </form>
    </ModalLayout>
  );
};

export default LoginModal;

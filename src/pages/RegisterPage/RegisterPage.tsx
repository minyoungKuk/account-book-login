import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import CustomInput from "../../components/CustomInput";

function MyPage() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const mutation = useMutation<
    unknown,
    AxiosError,
    { id: string; password: string; nickname: string }
  >({
    mutationFn: (newUser) => api.auth.register(newUser),

    onSuccess: (data) => {
      console.log("회원가입 성공", data);
      setErrorMessage("");
    },

    onError: (error) => {
      console.log("회원가입 실패", error);

      if (error.response && error.response.status === 409) {
        setErrorMessage("중복된 아이디입니다. 다른 아이디를 입력해주세요");
      } else {
        setErrorMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userId.length < 4 || userId.length > 10) {
      setErrorMessage("아이디는 4~10글자여야 합니다.");
      return;
    }

    if (userPassword.length < 4 || userPassword.length > 15) {
      setErrorMessage("비밀번호는 4~15글자여야 합니다.");
      return;
    }

    if (userPassword !== userPasswordCheck) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (userNickname.length < 1 || userNickname.length > 10) {
      setErrorMessage("닉네임은 1~10글자여야 합니다.");
      return;
    }

    if (userPassword !== userPasswordCheck) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    mutation.mutate({
      id: userId,
      password: userPassword,
      nickname: userNickname,
    });

    setUserId("");
    setUserPassword("");
    setUserPasswordCheck("");
    setUserNickname("");

    alert("회원가입이 완료되었습니다. 로그인해주세요.");

    navigate("/");
  };

  return (
    <div className="flex flex-col items-center mx-8 my-12">
      <h2 className="text-xl font-bold pb-8"> 회원가입 </h2>
      {errorMessage && (
        <p className="text-alert font-bold pb-10">{errorMessage}</p>
      )}
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
        <CustomInput
          label="비밀번호 확인"
          type="password"
          id="userPasswordCheck"
          placeholder="비밀번호를 확인해주세요"
          value={userPasswordCheck}
          onChange={(e) => setUserPasswordCheck(e.target.value)}
        />
        <CustomInput
          label="닉네임"
          type="text"
          id="userNickname"
          placeholder="닉네임을 입력해주세요."
          value={userNickname}
          onChange={(e) => setUserNickname(e.target.value)}
        />

        <button
          className="w-full bg-primary text-sub border-primary py-6 rounded ml-6 hover:bg-tertiary active:bg-secondary hover:text-primary transition-all duration-200"
          type="submit"
        >
          회원가입하기
        </button>
      </form>
    </div>
  );
}

export default MyPage;

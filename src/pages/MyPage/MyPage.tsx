import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import CustomInput from "../../components/CustomInput";
import useLoggedIn from "../../zustand/login.store";

function MyPage() {
  const { user, isLoggedIn, accessToken, setUser } = useLoggedIn();
  const [newNickname, setNewNickname] = useState("");
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인 이후 접근 가능한 페이지입니다.");
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const mutation = useMutation({
    mutationFn: ({
      nickname,
      avatar,
    }: {
      nickname: string;
      avatar: File | null;
    }) => {
      if (accessToken) {
        return api.auth.updateProfile(accessToken, nickname, avatar);
      } else {
        return Promise.reject("Access Token이 없습니다.");
      }
    },

    onSuccess: (data) => {
      setUser(data);
      alert("변경 완료");
    },
    onError: (error) => {
      console.log("회원 정보 변경 실패", error);
      alert("회원 정보 변경 실패");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({ nickname: newNickname, avatar: newAvatar });
    setNewNickname("");
    setNewAvatar(null);
  };

  return (
    <div className="flex flex-col mx-8 my-12">
      <h2 className="text-2xl font-bold pb-2"> 마이페이지 </h2>
      <p className="py-6 font-semibold text-lg">
        안녕하세요. <br />
        <span className="text-xl font-bold">{user?.nickname}</span>님의 정보를
        확인하고 변경가능합니다.
      </p>

      <div className="flex justify-evenly mt-12">
        <div className="flex flex-col justify-between">
          <p className="text-sm font-bold pt-6">프로필 사진</p>
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="프로필 사진"
              className="w-60 h-auto rounded-full"
            />
          ) : (
            <p>프로필 사진이 없습니다.</p>
          )}
          <p className="text-sm font-bold pt-6">아이디</p>
          <p>{user?.id}</p>
          <p className="text-sm font-bold pt-6">닉네임</p>
          <p>{user?.nickname}</p>
        </div>

        <form className="flex flex-col justify-between" onSubmit={handleSubmit}>
          <CustomInput
            label="닉네임"
            type="text"
            id="userNewNickname"
            placeholder="변경할 닉네임을 입력해주세요."
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
          <div className="my-4">
            <label htmlFor="avatar" className="block text-sm font-bold">
              프로필 사진 변경
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setNewAvatar(e.target.files[0]);
                }
              }}
              className="mt-2"
            />
          </div>

          <button
            type="submit"
            className="px-8 py-4 mx-0 my-4 border border-primary rounded hover:bg-tertiary hover:border-transparent active:bg-secondary transition-all duration-200"
          >
            회원정보 수정하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyPage;

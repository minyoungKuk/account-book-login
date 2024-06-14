import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "../components/LoginModal";
import { setCurrentMonth } from "../redux/slices/account.slice";
import useLoggedIn from "../zustand/login.store";

const StyledHeaderWrap = styled.div`
  width: 100%;
  height: 80px;
  background-color: #e0e7e9;
  position: sticky;
  z-index: 99;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  font-family: "Ubuntu", sans-serif;
  font-weight: 700;
  font-style: normal;

  h1 {
    color: #354649;
    font-size: 24px;
  }
`;

function Header() {
  const { isLoggedIn, logIn, logOut } = useLoggedIn();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const currentMonthString = useSelector(
    (state: any) => state.account.currentMonth
  );
  const currentMonth = new Date(currentMonthString);

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  const handlePreviousMonth = () => {
    const prevMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    ).toISOString();
    dispatch(setCurrentMonth(prevMonth));
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    ).toISOString();
    dispatch(setCurrentMonth(nextMonth));
  };

  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  return (
    <StyledHeaderWrap>
      <h1 onClick={() => navigate("/")} className="cursor-pointer">
        Account B
      </h1>

      <div style={{ display: "flex", alignItems: "center" }}>
        {isLoggedIn ? (
          <>
            <img
              src="/src/assets/images/ic-arrow-left.png"
              style={{ width: "30px", padding: "4px", cursor: "pointer" }}
              onClick={handlePreviousMonth}
            />
            <p style={{ padding: "0px 10px" }}>
              {monthNames[currentMonth.getMonth()]}
            </p>
            <img
              src="/src/assets/images/ic-arrow-right.png"
              style={{ width: "30px", padding: "4px", cursor: "pointer" }}
              onClick={handleNextMonth}
            />
            <button
              onClick={() => navigate("/mypage")}
              // onClick={() => navigate("/mypage")}
              className="px-4 py-2 border border-primary rounded ml-6 hover:bg-tertiary hover:border-transparent active:bg-secondary transition-all duration-200"
            >
              마이페이지
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-transparent text-white rounded ml-4 bg-alert hover:bg-tertiary hover:text-primary active:bg-secondary transition-all duration-200"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 border border-primary rounded ml-6 hover:bg-tertiary hover:border-transparent active:bg-secondary transition-all duration-200"
            >
              회원가입
            </button>
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-2 border border-transparent text-white rounded ml-4 bg-alert hover:bg-tertiary hover:text-primary active:bg-secondary transition-all duration-200"
            >
              로그인
            </button>
          </>
        )}
      </div>

      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </StyledHeaderWrap>
  );
}

export default Header;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import api from "./api/api";
import Header from "./layouts/Header";
import GlobalStyle from "./styles/GlobalStyle";
import useLoggedIn from "./zustand/login.store";

const App = () => {
  const { isLoggedIn, logIn, logOut, setUser } = useLoggedIn();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      api.auth
        .getUser(token)
        .then((user) => {
          logIn(token, user);
          setUser(user);
        })
        .catch(() => {
          logOut();
        });
    }
  }, [logIn, logOut, setUser]);

  const { isAlertModalVisible, alertMessage } = useSelector(
    (prevState: any) => prevState.account
  );
  const dispatch = useDispatch();

  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
      {/* <Modal
        show={isAlertModalVisible}
        onClose={() => dispatch(closeAlertModal())}
      > */}
      {/* <p>{alertMessage}</p> */}
      {/* <button onClick={() => dispatch(closeAlertModal())}>확인</button> */}
      {/* </Modal> */}
    </>
  );
};

export default App;

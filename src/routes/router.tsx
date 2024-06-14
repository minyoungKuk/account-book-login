import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import MyPage from "../pages/MyPage";
import RegisterPage from "../pages/RegisterPage";
import store from "../redux/store";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/:postsId",
        element: <DetailPage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default AppRouter;

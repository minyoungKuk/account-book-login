import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import store from "./redux/store";
import AppRouter from "./routes/router";
// import DefaultLayout from "./layouts/DefaultLayout";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

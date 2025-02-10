import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App.tsx";
import AuthContextProvider from "./Modules/Context/AuthContext.tsx";
import { StrictMode } from "react";
import { store } from "./Modules/Redux/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthContextProvider>
  </StrictMode>
);

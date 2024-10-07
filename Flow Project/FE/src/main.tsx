import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <ToastContainer
      position="top-right"
      style={{ marginTop: "7.5rem", fontSize: "1.8rem" }}
      newestOnTop={true}
    />
  </>
);

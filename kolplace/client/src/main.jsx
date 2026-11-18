import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* Outer boundary catches crashes in the providers, header and footer. */}
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </BrowserRouter>
);

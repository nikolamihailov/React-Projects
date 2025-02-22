import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/routes";

import "./index.css";

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;

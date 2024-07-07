import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/routes";

import "./index.css";

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;

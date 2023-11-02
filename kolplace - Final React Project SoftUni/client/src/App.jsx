import { useEffect } from "react";
import "./App.css";
import TopNav from "./components/Navigation/TopNavigation/TopNav";

function App() {
  // dynamically set page title
  useEffect(() => {
    document.title = "KolPlace - Your Online Shop";
  }, []);

  return (
    <>
      <TopNav />
    </>
  );
}

export default App;

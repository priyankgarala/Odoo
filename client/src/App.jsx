import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AuthPage from "../component/AuthPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <AuthPage />
      </div>
    </>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/HomePage/Home";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

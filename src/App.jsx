import logo from "./logo.svg";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/HomePage/Home";
import { Box } from "@mui/material";
import Header from "./components/header/header.jsx";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write-paper" element={<></>} />
        <Route path="/tools" element={<></>} />
        <Route path="/bibliography" element={<></>} />
      </Routes>
    </HashRouter>
  );
}

export default App;

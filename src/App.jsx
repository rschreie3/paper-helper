import logo from "./logo.svg";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/HomePage/Home";
import Header from "./components/header/header.jsx";
import { WritePaper } from "./components/PaperWriterPage/write-paper";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write-paper" element={<WritePaper />} />
        <Route path="/tools" element={<></>} />
        <Route path="/bibliography" element={<></>} />
      </Routes>
    </HashRouter>
  );
}

export default App;

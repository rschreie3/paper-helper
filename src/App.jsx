import logo from "./logo.svg";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/HomePage/Home";
import Header from "./components/header/header.jsx";
import { WritePaper } from "./components/PaperWriterPage/write-paper";
import { Tools } from "./components/PaperToolsPage/tools";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#008b8b",
    },
  },
});

function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write-paper" element={<WritePaper />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/bibliography" element={<></>} />
        </Routes>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;

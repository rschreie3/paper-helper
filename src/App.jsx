import logo from "./logo.svg";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/HomePage/Home";
import Header from "./components/header/header.jsx";
import { WritePaper } from "./components/PaperWriterPage/write-paper";
import { Tools } from "./components/PaperToolsPage/tools";
import { BibliographyPage } from "./components/BibliographyPage/BibliographyPage";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useReducer } from "react";
import { docsReducer } from "./state/docs/docs-reducer.js";
import { DocsContext } from "./state/docs/docs-context";
import { CurrDocReducer } from "./state/currDoc/currDoc-reducer";
import { CurrDocContext } from "./state/currDoc/currDoc-context";
import { CurrContentReducer } from "./state/currContent/currContent-reducer";
import { CurrContentContext } from "./state/currContent/currContent-context";
import { SecretPage } from "./mySecretPage/apiKeyInput";
import { apiKeyReducer } from "./state/apiKey/apiKey-reducer";
import { ApiContext } from "./state/apiKey/apiKey-context";

const theme = createTheme({
  palette: {
    primary: {
      main: "#008b8b",
    },
  },
});

function App() {
  const [docsState, docsDispatch] = useReducer(docsReducer, {
    docs: [],
  });

  const [currDoc, currDocDispatch] = useReducer(CurrDocReducer, {
    currDoc: docsState.docs[0],
  });

  const [currContent, currContentDispatch] = useReducer(CurrContentReducer, {
    currContent: "",
  });

  const [apiKey, apiKeyDispatch] = useReducer(apiKeyReducer, {
    apiKey: "",
  });

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <DocsContext.Provider value={{ docsState, docsDispatch }}>
          <CurrDocContext.Provider value={{ currDoc, currDocDispatch }}>
            <CurrContentContext.Provider
              value={{ currContent, currContentDispatch }}
            >
              <ApiContext.Provider value={{ apiKey, apiKeyDispatch }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/write-paper" element={<WritePaper />} />

                  <Route path="/tools" element={<Tools />} />
                  <Route path="/bibliography" element={<BibliographyPage />} />
                  <Route path="/secret-page" element={<SecretPage />} />
                </Routes>
              </ApiContext.Provider>
            </CurrContentContext.Provider>
          </CurrDocContext.Provider>
        </DocsContext.Provider>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;

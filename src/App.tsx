import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FolderPage from "./pages/FolderPage";
import Auth from "./pages/AuthPage";
import "./App.css";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const authKey = localStorage.getItem("authKey");
    console.log(authKey, process.env.REACT_APP_SECRET_KEY);
    if (authKey === process.env.REACT_APP_SECRET_KEY) {
      setAuthenticated(true);
    }
  }, []);

  const handleAuth = () => {
    setAuthenticated(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {!authenticated ? (
            <Route path="*" element={<Auth onAuth={handleAuth} />} />
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/folders/:id" element={<FolderPage />} />
            </>
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

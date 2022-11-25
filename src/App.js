import React from "react";
import {Routes, Route} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Client from "./client/Client";
import NotFound from "./components/NotFound";
import MonCompte from "./client/MonCompte";
import Dashboard from "./client/Dashboard";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="client" element={< Client/>}>
          <Route path="/client/moncompte" element={< MonCompte/>} />
          <Route path="/client/dashboard" element={< Dashboard/>} />
        </Route>
        <Route path="*" element={< NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

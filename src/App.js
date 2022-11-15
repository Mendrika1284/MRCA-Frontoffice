import React from "react";
import {Routes, Route} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Client from "./client/Client";
import NotFound from "./components/NotFound";
import MonCompte from "./client/MonCompte";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="client" element={< Client/>}>
          <Route path="/client/moncompte" element={< MonCompte/>} />
        </Route>
        <Route path="*" element={< NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

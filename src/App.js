import React from "react";
import ClientRoute from "./route/ClientRoute";
import LoginRoute from "./route/LoginRoute";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<LoginRoute/>}/>
        <Route path="/client/*" element={<ClientRoute/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

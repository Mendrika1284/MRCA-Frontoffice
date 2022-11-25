import {Routes, Route} from "react-router-dom";
import LoginPage from "../components/LoginPage";
import Client from "./Client";
import NotFound from "../components/NotFound";
import MonCompte from "./MonCompte";
import Dashboard from "./Dashboard";

const ClientRoute = () => {
    return ( 
        <Routes>
        <Route index element={<LoginPage />} />
        <Route index path="/login" element={<LoginPage />} />
        <Route path="client" element={< Client/>}>
          <Route path="moncompte" element={< MonCompte/>} />
          <Route path="dashboard" element={< Dashboard/>} />
        </Route>
        <Route path="*" element={< NotFound />} />
      </Routes>
     );
}
 
export default ClientRoute;
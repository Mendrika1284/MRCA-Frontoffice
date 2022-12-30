import {Routes, Route} from "react-router-dom";
import Client from "../client/Client";
import NotFound from "../components/NotFound";
import MonCompte from "../client/MonCompte";
import Dashboard from "../client/Dashboard";
import ListeDevis from "../client/ListeDevis";
import DetailsDevis from "../client/DetailsDevis";

const ClientRoute = () => {
    return ( 
    <Routes>
        <Route element={< Client/>}>
          <Route index element={< Dashboard/>} />
          <Route path="dashboard" element={< Dashboard/>} />
          <Route path="moncompte" element={< MonCompte/>} />
          <Route path="listedevis" element={< ListeDevis/>} />
          <Route path="detailsDevis/:id" element={< DetailsDevis/>} />
          <Route path="*" element={< NotFound />} />
        </Route>
    </Routes>
     );
}
 
export default ClientRoute;
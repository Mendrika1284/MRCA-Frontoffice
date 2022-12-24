import {Routes, Route} from "react-router-dom";
import Artisan from "../artisan/Artisan";
import Dashboard from "../artisan/Dashboard";
import DetailsDevis from "../artisan/DetailsDevis";
import ListeDevis from "../artisan/ListeDevis";
import MonCompte from "../artisan/MonCompte";
import NotFound from "../components/NotFound";

const ArtisanRoute = () => {
    return ( 
    <Routes>
        <Route element={< Artisan/>}>
          <Route index element={< Dashboard/>} />
          <Route path="dashboard" element={< Dashboard/>} />
          <Route path="listedevis" element={< ListeDevis/>} />
          <Route path="moncompte" element={< MonCompte/>} />
          <Route path="detailsDevis/:id" element={<DetailsDevis/>}/>
          <Route path="*" element={< NotFound />} />
        </Route>
    </Routes>
     );
}
 
export default ArtisanRoute;
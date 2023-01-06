import {Routes, Route} from "react-router-dom";
import Agenda from "../artisan/Agenda";
import Artisan from "../artisan/Artisan";
import Dashboard from "../artisan/Dashboard";
import DetailsDevis from "../artisan/DetailsDevis";
import DownloadPDF from "../artisan/DownloadPDF";
import ListeDevis from "../artisan/ListeDevis";
import MonCompte from "../artisan/MonCompte";
import PDF from "../artisan/PDF";
import PreparerDevis from "../artisan/PreparerDevis";
import NotFound from "../components/NotFound";

const ArtisanRoute = () => {
    return ( 
    <Routes>
        <Route element={< Artisan/>}>
          <Route index element={< Dashboard/>} />
          <Route path="dashboard" element={< Dashboard/>} />
          <Route path="listedevis" element={< ListeDevis/>} />
          <Route path="moncompte" element={< MonCompte/>} />
          <Route path="agenda" element={< Agenda/>} />
          <Route path="detailsDevis/:id" element={<DetailsDevis/>}/>
          <Route path="preparerDevis/:id" element={<PreparerDevis/>}/>
          <Route path="telechargerDevis/:id" element={<DownloadPDF/>}/>
          <Route path="pdf/:id" element={<PDF/>}/>
          <Route path="*" element={< NotFound />} />
        </Route>
    </Routes>
     );
}
 
export default ArtisanRoute;
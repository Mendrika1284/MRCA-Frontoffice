import {Routes, Route} from "react-router-dom";
import Artisan from "../artisan/Artisan";
import Dashboard from "../artisan/Dashboard";
import NotFound from "../components/NotFound";

const ArtisanRoute = () => {
    return ( 
    <Routes>
        <Route element={< Artisan/>}>
          <Route index element={< Dashboard/>} />
          <Route path="listeDevis" element={< Dashboard/>} />
          <Route path="*" element={< NotFound />} />
        </Route>
    </Routes>
     );
}
 
export default ArtisanRoute;
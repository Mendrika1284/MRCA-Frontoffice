import {Routes, Route} from "react-router-dom";
import Devis from "../devis/Devis";

const DevisRoute = () => {
    return (
      <div>
          <Routes>
            <Route index element={< Devis/>} />
          </Routes>
      </div>
     );
}
 
export default DevisRoute;
import {Routes, Route} from "react-router-dom";
import Devis from "../devis/Devis";
import Header from "../devis/_components/Header";

const DevisRoute = () => {
    return (
      <div>
        <Header/>
          <Routes>
            <Route index element={< Devis/>} />
          </Routes>
      </div>
     );
}
 
export default DevisRoute;
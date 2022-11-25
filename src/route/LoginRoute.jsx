import {Routes, Route} from "react-router-dom";
import LoginPage from "../components/LoginPage";
import NotFound from "../components/NotFound";

const ClientRoute = () => {
    return ( 
        <Routes>
        <Route index element={<LoginPage />} />
        <Route index path="/login" element={<LoginPage />} />
        <Route path="*" element={< NotFound />} />
      </Routes>
     );
}
 
export default ClientRoute;
import { Navigate } from "react-router-dom";
import { loginService } from "../_services/login.service";

const AuthGuard = ({children}) => {
    
    if(!loginService.isLogged()){
        return <Navigate to="/login"/>
    }
    return children;
}
 
export default AuthGuard;
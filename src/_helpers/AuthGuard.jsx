import { Navigate } from "react-router-dom";

const AuthGuard = ({children}) => {
    let isLogged = false;
    if(!isLogged){
        return <Navigate to="/login"/>
    }
    return children;
}
 
export default AuthGuard;
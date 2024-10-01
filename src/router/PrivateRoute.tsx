import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, isAuth }: {children: ReactNode, isAuth: boolean}) => {
    return isAuth ? children : <Navigate to='/login'/>
};

export default PrivateRoute;
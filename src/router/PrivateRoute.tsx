import { checkAuthUser } from "@/store/slices/userSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";

const PrivateRoute = ({ children }: {children: ReactNode}) => {
    const dispatch = useAppDispatch()    
    const { isAuth, status } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        if (!isAuth) {
            dispatch(checkAuthUser())
        }

    }, [dispatch, isAuth]);

    if (status === 'loading') {
        return <div>Loading...</div>; 
    }

    return isAuth ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
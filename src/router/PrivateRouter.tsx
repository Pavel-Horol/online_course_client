import { checkAuthUser } from '@/store/slices/userSlice';
import { RootState, useAppDispatch } from '@/store/store';
import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PrivateRouter = ({ children }: { children: ReactNode }) => {
    const { isAuth, status } = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthWithDelay = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            if (status !== 'loading' && !isAuth) {
                dispatch(checkAuthUser());
            }
            setIsLoading(false);
        };
        checkAuthWithDelay();
    }, [dispatch, isAuth, status]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isAuth) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-3/4 bg-background-secondary">
            <h1 className="text-4xl font-bold text-red-500 mb-4">
                Unauthorized User
            </h1>
            <Link
                to={'/auth'}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
                Go Login
            </Link>
        </div>
    );
};

export default PrivateRouter;

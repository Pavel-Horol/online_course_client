import { logoutUser } from '@/store/slices/userSlice';
import { useAppDispatch } from '@/store/store';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/auth');
    };
    return (
        <button
            className="px-4 py-2 rounded-md bg-opposed"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
};

export default Logout;

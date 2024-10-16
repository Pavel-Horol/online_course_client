import { registerUser } from '@/store/slices/userSlice';
import { useAppDispatch } from '@/store/store';
import { FormEvent, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleRegister = (e: FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        dispatch(registerUser({ email, password })).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                navigate('/');
            }
        });
    };

    return (
        <form>
            <div className="mb-4">
                <label
                    className="block text-text-secondary font-medium mb-2"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    className="w-full px-4 py-2 text-background-secondary bg-text focus:outline-none focus:ring-2 focus:ring-accent hover:ring-accent-hover rounded-lg"
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-6 relative">
                <label
                    className=" block text-text-secondary font-medium mb-2"
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    className="w-full px-4 py-2 text-background-secondary bg-text focus:outline-none focus:ring-2 focus:ring-accent hover:ring-accent-hover rounded-lg"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div
                    className="absolute top-1/2 translate-y-1/2 right-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? (
                        <FaEyeSlash className="text-text-secondary" />
                    ) : (
                        <FaEye className="text-text-secondary" />
                    )}
                </div>
            </div>
            <div className="mb-6 relative">
                <label
                    className=" block text-text-secondary font-medium mb-2"
                    htmlFor="password"
                >
                    Confirm Password
                </label>
                <input
                    className="w-full px-4 py-2 text-background-secondary bg-text focus:outline-none focus:ring-2 focus:ring-accent hover:ring-accent-hover rounded-lg"
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            {errorMessage && (
                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <button
                type="submit"
                className="w-full py-2 px-4 bg-accent hover:bg-accent-hover text-background font-bold rounded-lg transition-colors duration-300"
                onClick={handleRegister}
            >
                Register
            </button>
        </form>
    );
};

export default RegisterForm;

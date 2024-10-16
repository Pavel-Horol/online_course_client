import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import { useState } from 'react';

const Auth = () => {
    const [formType, setFormType] = useState<'Login' | 'Register'>('Login');

    return (
        <div className="flex justify-center items-center h-full bg-background">
            <div className="bg-background-secondary p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-text mb-8 text-center">
                    {formType}
                </h2>
                {formType === 'Login' ? <LoginForm /> : <RegisterForm />}
                <button
                    className="mt-6 w-full py-2 px-4 text-accent hover:text-accent-hover font-bold transition-colors duration-300 border-2 border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                    onClick={() =>
                        setFormType((prev) =>
                            prev === 'Login' ? 'Register' : 'Login',
                        )
                    }
                >
                    {formType === 'Login' ? 'Go to Register' : 'Go to Login'}
                </button>
            </div>
        </div>
    );
};

export default Auth;

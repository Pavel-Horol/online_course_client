import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email , setEmail] = useState<string>("")  
  const [password , setPassword] = useState<string>("")  
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex justify-center items-center h-full bg-background">
    <div className="bg-background-secondary p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold text-text mb-8 text-center">Login</h2>
      <form>
        <div className="mb-4">
          <label className="block text-text-secondary font-medium mb-2" htmlFor="email">
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
          <label className=" block text-text-secondary font-medium mb-2" htmlFor="password">
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
        <button
          type="submit"
          className="w-full py-2 px-4 bg-accent hover:bg-accent-hover text-background font-bold rounded-lg transition-colors duration-300"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  )
}

export default Login
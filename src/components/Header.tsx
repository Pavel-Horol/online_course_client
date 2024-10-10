import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import { RootState } from "@/store/store";
import routes from "@/router/routes";

const Header = () => {
  const { isAuth } = useSelector((state: RootState) => state.user);

  return (
    <header className="bg-background-secondary p-4 rounded-md m-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Header</h1>

        <nav className="flex space-x-4">
          {Object.entries(routes).map(([key, route]) => (
            <NavLink
              key={key}
              to={route.path}
              className={({ isActive }) =>
                `p-4 transition-colors duration-300 ${isActive ? "text-accent font-bold" : "text-white"}`
              }
            >
              {route.name}
            </NavLink>
          ))}
        </nav>

        {isAuth && <Logout />}
      </div>

    </header>
  );
};

export default Header;

import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Error from "@/pages/Error";
import Login from "@/pages/Auth";
import routes from "./routes";
import PrivateRouter from "./PrivateRouter";
import Profile from "@/pages/Profile";
const router = createBrowserRouter([
    {
        element: <Layout/>,
        errorElement: <Error/>,
        children: [
            {
                path: routes.home.path,
                element: <Home/>
            },
            {
                path: routes.about.path,
                element: <PrivateRouter> <About/> </PrivateRouter>   
            },
            {
                path: routes.auth.path,
                element: <Login/>
            },
            {
                path: routes.profile.path,
                element: <Profile/>
            }
        ]
    }
])

export { router }
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LandingPage from "../pages/LandingPage"
import LoginBuy from "../pages/LoginBuyer";
import LoginSell from "../pages/LoginSeller";
import ForgotPassword from "../pages/ForgotPassword";
import FormBuyer from "../pages/FormBuyer";
import SearchData from "../pages/SearchData";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login-buyer",
        element: <LoginBuy />,
    },
    {
        path: "/login-seller",
        element: <LoginSell />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/form-buyer",
        element: <FormBuyer />
    },
    {
        path: "/search-data",
        element: <SearchData />
    },
]);

function Router() {
    return <RouterProvider router={router} />;
}

export default Router;

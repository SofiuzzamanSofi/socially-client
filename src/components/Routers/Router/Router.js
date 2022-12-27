import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout/MainLayout";
import About from "../../Pages/About/About";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home";
import Media from "../../Pages/Media/Media";
import Message from "../../Pages/Message/Message";
import Profile from "../../Pages/Profile/Profile";

const router = createBrowserRouter([
    //homepage route-------
    {
        path: "/", element: <MainLayout />, errorElement: <ErrorPage />, children: [
            { path: "/", element: <Home /> },
            { path: "/media", element: <Media /> },
            { path: "/message", element: <Message /> },
            { path: "/about", element: <About /> },
            { path: "/profile", element: <Profile /> },
        ],
    },
]);

export default router;
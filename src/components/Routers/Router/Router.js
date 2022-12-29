import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout/MainLayout";
import About from "../../Pages/About/About";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home";
import Media from "../../Pages/Media/Media";
import MediaDetails from "../../Pages/Media/MediaDetails";
import Message from "../../Pages/Message/Message";
import Profile from "../../Pages/Profile/Profile";
import SignIn from "../../Pages/SignInUp/SignIn";
import SignUp from "../../Pages/SignInUp/SignUp";

const router = createBrowserRouter([
    //homepage route-------
    {
        path: "/", element: <MainLayout />, errorElement: <ErrorPage />, children: [
            { path: "/", element: <Home /> },
            { path: "/media", element: <Media /> },
            { path: "/post/:id", element: <MediaDetails />, loader: ({ params }) => fetch(`http://localhost:5000/post/${params?.id}`) },
            { path: "/message", element: <Message /> },
            { path: "/about", element: <About /> },
            { path: "/profile", element: <Profile /> },
        ],
    },
    // sign In - Sign Up route ---
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
]);

export default router;
import { useEffect} from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Notfound from "./components/Notfound/Notfound";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import UserContextProvider, { userContext } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PostContextProvider from "./context/PostContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostDetails from "./components/postDetails/postDetails";
import { Toaster } from "react-hot-toast";


const query = new QueryClient();

const routing = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "postdetails/:id",
        element: (
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  useEffect(() => {
    if (window.initFlowbite) {
      window.initFlowbite();
    }
  }, []);
  return (
    <>
      <UserContextProvider>
        <PostContextProvider>
          <QueryClientProvider client={query}>
            <RouterProvider router={routing}> </RouterProvider>
             <Toaster/>
          </QueryClientProvider>
        </PostContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;

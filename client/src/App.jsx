import React, { useEffect } from "react";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./component/Header";
import NavBar from "./component/NavBar";
import RightSide from "./component/RightSide";
const Auth = lazy(() => import("./pages/Auth"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Chats = lazy(() => import("./pages/Chats"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Discover = lazy(() => import("./pages/Discover"));
const BookMarks = lazy(() => import("./pages/BookMarks"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const SinglePost = lazy(() => import("./pages/SinglePost"));
import { getUserConverstion, getUserSuggetions } from "./actions";
import LoadingPage from "./component/LoadingPage";
import { getNotifies } from "./actions/NotifyAction";
import { ToastContainer } from "react-toastify";
import UserConnect from "./component/UserConnect";

const App = () => {
  const user = JSON.parse(window.localStorage.getItem("profile"));
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(getNotifies(user.token));
      dispatch(getUserConverstion(user.token));
      dispatch(getUserSuggetions(user.token));
    }
  }, []);
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/auth" />;
    }
    return children;
  };

  const ProtectedAuth = ({ children }) => {
    if (user) {
      return <Navigate to="/" />;
    }
    return children;
  };
  const Layout = () => {
    return (
      <>
        <Header />
        <div className="app-body">
          <div className="container">
            <div className="row m-0">
              <NavBar />
              <div className="col-18 col-md-12 col-lg-13 col-xl-10 pt-3 px-0 px-sm-3 px-xl-5 center-page">
                <Outlet />
              </div>
              <RightSide />
            </div>
          </div>
        </div>
      </>
    );
  };

  const AuthLayout = () => {
    return <Outlet />;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/bookmarks",
          element: <BookMarks />,
        },
        {
          path: "/profile/:userId",
          element: <Profile user={user} />,
        },
        {
          path: "/discover",
          element: <Discover />,
        },
        {
          path: "/notifications",
          element: <Notifications />,
        },
        {
          path: "/chats",
          element: <Chats />,
        },
        {
          path: "/chats/:userId",
          element: <Chats />,
        },

        {
          path: "/post/:id",
          element: <SinglePost />,
        },
      ],
    },
    {
      path: "/auth",
      element: (
        <ProtectedAuth>
          <AuthLayout />
        </ProtectedAuth>
      ),
      children: [
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/auth/reset/:token",
          element: <ResetPassword />,
        },
      ],
    },
  ]);
  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <LoadingPage />
      <UserConnect />
      <Suspense fallback={<LoadingPage />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
};

export default App;

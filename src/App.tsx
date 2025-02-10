import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ForgetPassword from "./Modules/Auth/Components/ForgetPassword/ForgetPassword";
import Login from "./Modules/Auth/Components/Login/Login";
import Register from "./Modules/Auth/Components/Register/Register";
import ResetPassword from "./Modules/Auth/Components/ResetPassword/ResetPassword";
import AuthLayout from "./Modules/Shared/Components/AuthLayout/AuthLayout";
import NotFound from "./Modules/Shared/Components/NotFound/NotFound";
import MasterLayout from "./Modules/Shared/Components/MasterLayout/MasterLayout";
import Home from "./Modules/Home/components/Home";
import { Bounce, ToastContainer } from "react-toastify";
import ProtectedRoute from "./Modules/Shared/Components/ProtectedRoute/ProtectedRoute";
import AllCategories from "./Modules/Home/components/AllCategories/AllCategories";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AllProduct from "./Modules/Home/components/AllProduct/AllProduct";
import CartDetails from "./Modules/Cart/Components/CartDetails/CartDetails";
import BookDetails from "./Modules/Home/components/BookDetails/BookDetails";
// import Payment from "./Modules/Home/components/Payment/Payment";

const stripe = loadStripe(
  "pk_test_51Qg39mFJP9hdzn7viPv9N94libcRxSF4LwdnZUkG4VF12Yt9zpKc5dOrbd3gVa19hxrk2cXAGIxVQNTs8j82ds9100S3CtVl7J"
);

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "resetPassword", element: <ResetPassword /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "allCategories", element: <AllCategories /> },
        { path: "allProduct", element: <AllProduct /> },
        { path: "bookDetails/:id", element: <BookDetails /> },
        { path: "cart", element: <CartDetails /> },
        // { path: "payment", element: <Payment /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Elements stripe={stripe}>
        <RouterProvider router={routes}></RouterProvider>
      </Elements>
    </>
  );
}

export default App;

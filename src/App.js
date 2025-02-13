import React, { useState, useEffect, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./Global/Loader";
import Layout from "./Global/Layout";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import PrivateRoute from "./Componet/auth/PrivateRoute";

const Home = lazy(() => import("./Pages/Home"));
const Contact = lazy(() => import("./Pages/Conatact"));
const Collection = lazy(() => import("./Pages/Collection"));
const ProductDetails = lazy(() => import("./Collection/ProductDetails"));
const FAQs = lazy(() => import("./Pages/Faq"));
const Certification = lazy(() => import("./Pages/Certification"));
const CustomizeJewellery = lazy(() => import("./Pages/CustomizeJewellery"));
const LabVsNatural = lazy(() => import("./Pages/LabVsNatural"));
const Thediamonds = lazy(() => import("./Pages/Thediamonds"));
const About = lazy(() => import("./Pages/About"));
const CategoryPage = lazy(() => import("./Collection/CategoryPage"));
const Register = lazy(() => import("./Componet/auth/Register"));
const Login = lazy(() => import("./Componet/auth/Login"));
const ForgotPassword = lazy(() => import("./Componet/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./Componet/auth/ResetPassword"));
//User Profile
const UserProfile = lazy(()=>import("./Componet/auth/UserProfile/UserProfile"));
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQs />} />
          <Route path="/about" element={<About />} />
          <Route path="/customize-jewelry" element={<CustomizeJewellery />} />
          <Route path="/certification" element={<Certification />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/lab-vs-natural" element={<LabVsNatural />} />
          <Route path="/the-4-cs-of-diamonds" element={<Thediamonds />} />

          {/* Private Routes (Only accessible after login) */}
          <Route element={<PrivateRoute />}>
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;

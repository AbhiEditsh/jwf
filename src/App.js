import React, { useState, useEffect, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./Global/Loader";
import Layout from "./Global/Layout";

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

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // Show loader for the first 3 seconds
    return <Loader />;
  }

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQs />} />
          <Route path="/About" element={<About />} />
          <Route path="/customize-jewelry" element={<CustomizeJewellery />} />
          <Route path="/certification" element={<Certification />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="lab-vs-natural" element={<LabVsNatural />} />
          <Route path="the-4-cs-of-diamonds" element={<Thediamonds />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;

// src/App.js
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Global/Layout";
import Conatact from "./Pages/Conatact";
import Collection from "./Pages/Collection";
import ProductDetails from "./Collection/ProductDetails";
import FAQs from "./Pages/Faq";
import Certification from "./Pages/Certification";
import CustomizeJewellery from "./Pages/CustomizeJewellery";
import LabVsNatural from "./Pages/LabVsNatural";
import Thediamonds from "./Pages/Thediamonds";
import About from "./Pages/About";
import CategoryPage from "./Collection/CategoryPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Conatact />} />
        <Route path="/faq" element={<FAQs />} />
        <Route path="/About" element={<About/>} />
        <Route path="/customize-jewelry" element={<CustomizeJewellery />} />
        <Route path="/certification" element={<Certification />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="lab-vs-natural" element={<LabVsNatural />} />
        <Route path="the-4-cs-of-diamonds" element={<Thediamonds/>} />
      </Routes>
    </Layout>
  );
}

export default App;

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Global/Layout";
import Conatact from "./Pages/Conatact";
import Collection from "./Pages/Collection";
import ProductDetails from "./Collection/ProductDetails";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Conatact />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

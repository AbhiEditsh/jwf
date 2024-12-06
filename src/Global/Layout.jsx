// Layout.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "calc(100vh - 200px)" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

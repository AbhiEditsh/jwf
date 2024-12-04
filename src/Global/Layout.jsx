// Layout.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import TopHeader from "./TopHeader";

const Layout = ({ children }) => {
  return (
    <div>
      <TopHeader />
      <Header />
      <main style={{ minHeight: "calc(100vh - 200px)" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

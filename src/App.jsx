import React, { Fragment, lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar.jsx";
import LayoutLoader from "./components/layout/LayoutLoader.jsx";

// const Navbar = lazy(() => import("./components/layout/Navbar.jsx"));
const Products = lazy(() => import("./components/pages/Products.jsx"));
const AddProduct = lazy(() => import("./components/pages/AddProduct.jsx"));

const App = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<LayoutLoader/>}>
        <Fragment>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
          <Toaster position="bottom-center" />
        </Fragment>
      </Suspense>
    </Router>
  );
};

export default App;

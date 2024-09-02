import React, { Fragment, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Products from "./components/pages/Products.jsx";

const AddProduct = lazy(() => import("./components/pages/AddProduct.jsx"));

const App = () => {

  return (
    <Router>
    <Fragment>
    <Routes>
    <Route path='/' element={<Products/> } />
    <Route path='/add-product' element={<AddProduct/> } />
    </Routes>
      <Toaster position="bottom-center" />
    </Fragment>
    </Router>
  );
};

export default App;

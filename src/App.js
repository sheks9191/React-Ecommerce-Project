import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import NavBar from "./component/NavBar/NavBar";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Navigate to="/all" />} />
            <Route path=":products" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="cart" element={<CartPage />} />
          </Routes>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;

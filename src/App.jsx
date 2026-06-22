import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Container } from "react-bootstrap";

import { CartProvider } from "./CartContext";
import {
  AuthContext,
  AuthContextProvider,
} from "./store/AuthContext";

import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import About from "./pages/About";
import Home from "./pages/Home";
import Movies from "./components/Movies";
import ContactUs from "./pages/ContactUs";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";

function StoreApp() {
  const [showCart, setShowCart] = useState(false);

  const authCtx = useContext(AuthContext);

  return (
    <>
      <Header onShowCart={() => setShowCart(true)} />

      <div className="bg-secondary text-white text-center py-5">
        <h1 className="display-1">The Generics</h1>
      </div>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/login">
          {!authCtx.isLoggedIn ? (
            <Login />
          ) : (
            <Redirect to="/store" />
          )}
        </Route>

        <Route path="/store">
          {authCtx.isLoggedIn ? (
            <ProductList
              onShowCart={() => setShowCart(true)}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/contact">
          <ContactUs />
        </Route>

        <Route path="/movies">
          <Movies />
        </Route>

        <Route path="/product/:productId">
          <ProductDetail />
        </Route>
      </Switch>

      {authCtx.isLoggedIn && (
        <Cart
          show={showCart}
          onHide={() => setShowCart(false)}
        />
      )}

      <footer className="bg-info text-white py-4 mt-5">
        <Container>
          <h1>The Generics</h1>
        </Container>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthContextProvider>
        <CartProvider>
          <StoreApp />
        </CartProvider>
      </AuthContextProvider>
    </Router>
  );
}
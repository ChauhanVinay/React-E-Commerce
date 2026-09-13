import React, { useState, useContext, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { CartProvider } from "./CartContext";
import { AuthContext, AuthContextProvider } from "./store/AuthContext";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Movies from "./components/Movies";
import ContactUs from "./pages/ContactUs";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";

// 1. Remove the static import 'About' at the top
// 2. Keep this lazy import
const About = lazy(() => import('./pages/About'));

function StoreApp() {
  const [showCart, setShowCart] = useState(false);
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Header onShowCart={() => setShowCart(true)} />
      <div className="bg-secondary text-white text-center py-5">
        <h1 className="display-1">The Generics</h1>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/"> <Home /> </Route>
          <Route path="/login"> {!authCtx.isLoggedIn ? <Login /> : <Redirect to="/store" />} </Route>
          <Route path="/store"> {authCtx.isLoggedIn ? <ProductList onShowCart={() => setShowCart(true)}/> : <Redirect to="/login" />} </Route>
          
          {/* Lazy loaded route */}
          <Route path="/about"> <About /> </Route>
          
          <Route path="/contact"> <ContactUs /> </Route>
          <Route path="/movies"> <Movies /> </Route>
          <Route path="/product/:productId"> {authCtx.isLoggedIn ? <ProductDetail /> : <Redirect to="/login" />} </Route>
        </Switch>
      </Suspense>

      {authCtx.isLoggedIn && <Cart show={showCart} onHide={() => setShowCart(false)} />}
      <footer className="bg-info text-white py-4 mt-5"><Container><h1>The Generics</h1></Container></footer>
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
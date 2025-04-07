import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import SingUp from "./Pages/Auth/Auth";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/payment/payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRoute";
const stripePromise = loadStripe(
  "pk_test_51R0k70LrTDfAv08ijPwzMTnGRn4bbC6cHMtcbGb6tDZh3YsuK7Scp59EIZbdSTkTTbYHMM8LjKrH7wxdcmkSEiKy00aNXFFYVU"
);

function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Category/:CategoryName" element={<Results />} />
          <Route path="/products/:ProductId" element={<ProductDetails />} />
          <Route
            path="/payments"
            element={
              <ProtectedRoute
                msg={"Please Login to make payment"}
                redirect={"/Payments"}
              >
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />

          <Route
            path="/Orders"
            element={
              <ProtectedRoute
                msg={"Please Login to make Orders"}
                redirect={"/orders"}
              >
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default Routing;

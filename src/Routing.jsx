import React from "react";
import { Routes, Route } from "react-router-dom";

import LayOut from "./Components/LayOut/LayOut"; // Adjust path as needed

import Landing from "./Pages/Landing/Landing";
import Order from "./Pages/Orders/Order";
import Cart from "./Pages/Cart/Cart";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/PrdoductDetail";
import { Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  'pk_test_51RV9rTH76MuUflW2YgllxQd2nolc7IJJsnIu3E78Y1KttgOAMNXjz8l5Zigw6bMsZwV6ilCXehgV1YbM1K3MFQbf00WKUfXrKt'
);

function Routing() {
  return (
    <Routes>
      {/* Routes with header via LayOut */}
      <Route element={<LayOut />}>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/order" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Category/:CategoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route
          path="/payments"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
      </Route>
    </Routes>
  );
}

export default Routing;

import React from "react";
import { Routes, Route } from "react-router-dom";

import LayOut from "./Components/LayOut/LayOut"; // Adjust path as needed

import Landing from "./Pages/Landing/Landing";
import Order from "./Pages/Orders/Order";
import Cart from "./Pages/Cart/Cart";
import SignIn from "./Pages/Auth/Signup";
import Payment from "./Pages/Payment/Payment";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/PrdoductDetail";

function Routing() {
  return (
    <Routes>
      {/* Routes with header via LayOut */}
      <Route element={<LayOut />}>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<SignIn />} />
        <Route path="/order" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Category/:CategoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/payments" element={<Payment />} />
      </Route>
    </Routes>
  );
}

export default Routing;

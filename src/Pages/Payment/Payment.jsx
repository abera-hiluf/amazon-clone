// import { ClassNames } from "@emotion/react";
import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { db } from "../../Utility/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Type } from "../../Utility/action.type";
import { useNavigate } from "react-router-dom";

function Payment() {
  const { state, dispatch } = useContext(DataContext);
  const { basket, user } = state;
  console.log(user);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError(null);
  };
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const res = await axiosInstance({
        method: "POST",
        url: `/payments/create?total=${total*100}`,
      });
      console.log(res.data);
      const client_secret = res.data?.client_secret;
      //client side confimation
      // const confirmation = await stripe.confirmCardPayment(client_secret, {
      //   payment_method: {
      //     card: elements.getElement(CardElement),
      //   },
      // });
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setCardError(error.message);
        console.error("Stripe confirmation error:", error);
      } else {
        console.log("Client Secret used:", client_secret);
        console.log("Payment Intent Status:", paymentIntent.status);
        console.log("Payment successful:", paymentIntent);
      }
      

      const orderRef = doc(db, "users", user.uid, "orders", paymentIntent.id);
      await setDoc(orderRef, {
        basket:basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      dispatch({
        type: Type.REMOVE_FROM_BASKET
      });
      setProcessing(false);
      navigate("/order");
    } catch (error) {
      setProcessing(false);
      console.error("Payment error:", error);
    }
  };

  return (
    <>
      {/* header */}
      <div className={classes.Payment__header}>
        Checkout ({totalItem}) items
      </div>
      {/* payment methos */}

      <section className={classes.Payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        {/* products */}

        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {/* {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))} */}

            {basket?.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                flex={true}
                renderDesc={true}
                renderAdd={true}
              />
            ))}
          </div>
        </div>
        <hr />
        {/* card form  */}

        <div className={classes.flex}>
          <h3>payment method</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {
                  // error
                  cardError && (
                    <small style={{ color: "red" }}>{cardError}</small>
                  )
                }
                {/* card__container */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment__prices}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p> <CurrencyFormat amount={total} />
                    </span>
                  </div>

                  <button type="submit">
                    {processing ? "Processing..." : "Pay Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Payment;

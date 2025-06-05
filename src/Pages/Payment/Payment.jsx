// import { ClassNames } from "@emotion/react";
import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";

function Payment() {
  const { state, dispatch } = useContext(DataContext);
  const { basket, user } = state;
  console.log(user);

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
  const handlePayment = async(e) => {
    e.preventDefault();
    // backend part
    try {
      const { response } = await axiosInstance({
        method: "POST",
        url: `/payments/create?total=${total*100}`,
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      // client side
      const confirmation = await stripe.confirmCardPayment(clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

    } catch (error) {
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
                <div className={classes.paymentt__prices}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p> <CurrencyFormat amount={total} />
                    </span>
                  </div>

                  <button  type="submit">Pay Now</button>
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

import React, { useContext } from "react";
import classes from "./Cart.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowUp } from "react-icons/md";
function Cart() {
  const { state, dispatch } = useContext(DataContext);
  const { basket, user } = state;
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <section className={classes.container}>
      <div className={classes.cart__container}>
        <h2>Hello</h2>
        <h3>
          Your shopping basket <hr />
        </h3>
        {basket?.length === 0 ? (
          <p>Oops ! No item in your cart</p>
        ) : (
          basket?.map((item, i) => {
            return (
              <section className={classes.cart__product}>
                <ProductCard
                  key={i}
                  product={item}
                  renderDesc={true}
                  flex={true}
                  renderAdd={false}
                />
                <div className={classes.btn__container}>
                  <buttonn
                    className={classes.btn}
                    onClick={() => increment(item)}
                  >
                    <MdKeyboardArrowUp size={25}/>
                  </buttonn>
                  <span>{item.amount}</span>
                  <button
                    className={classes.btn}
                    onClick={() => decrement(item.id)}
                  >
                    <IoIosArrowDown size={25} />
                  </button>
                </div>
              </section>
            );
          })
        )}
      </div>
      {basket?.length !== 0 && (
        <div className={classes.subtotal}>
          <div>
            <p>Subtotal({basket?.length}items)</p>
            <CurrencyFormat amount={total} />
          </div>
          <span>
            <input type="checkbox" />
            <small>This order contain a gift</small>
          </span>
          <Link to="/payments">continue to checkout</Link>
        </div>
      )}
    </section>
  );
}

export default Cart;

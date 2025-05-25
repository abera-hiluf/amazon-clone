import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import LowerHeader from "./LowerHeader";

import { MdLocationPin } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { DataContext } from "../DataProvider/DataProvider";

const Header = () => {
  const {
    state: { basket },
    dispatch,
  } = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
  return item.amount + amount
},0)


  return (
    <>
    
      <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          {/* logo */}
          <div className={classes.logo__container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <MdLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* search section */}
          <div className={classes.search}>
            <select>
              <option value="">All</option>
            </select>
            <input type="text" placeholder="search product" />
            <BsSearch size={25} />
          </div>

            



          {/* right side part */}
          <div className={classes.order__container}>
            <a href="#" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt=""
              />
              <select>
                <option value="">EN</option>
              </select>
            </a>

              


              
            <Link to="">
              <div>
                <p>Hello, Sign In</p>
                <span>Account & Lists</span>
              </div>
            </Link>

            <Link to="/order">
              <div>
                <p>Returns</p>
                <span>& Orders</span>
              </div>
            </Link>

            <Link to="/cart" className={classes.cart}>
              <span>{totalItem||0}</span>
              <BiCart size={35} />
            </Link>
          </div>
        </div>
      </section>

      <LowerHeader />
      </section>
      
    </>
  );
};

export default Header;

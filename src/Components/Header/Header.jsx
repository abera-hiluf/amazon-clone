




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
  } = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

  return (
    <>
      <header className={classes.fixed}>
        <div className={classes.header__container}>
          {/* Logo + Location */}
          <Link to="/" className={classes.logo}>
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon"
            />
          </Link>
          <div className={classes.location}>
            <MdLocationPin />
            <div>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className={classes.search}>
            <select>
              <option>All</option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Fashion</option>
            </select>
            <input type="text" placeholder="Search Amazon" />
            <button>
              <BsSearch size={20} />
            </button>
          </div>

          {/* Account, Orders, Cart */}
          <div className={classes.nav}>
            <Link to="/auth" className={classes.navItem}>
              <span className={classes.small}>Hello, Sign in</span>
              <span className={classes.bold}>Account & Lists</span>
            </Link>
            <Link to="/order" className={classes.navItem}>
              <span className={classes.small}>Returns</span>
              <span className={classes.bold}>& Orders</span>
            </Link>
            <Link to="/cart" className={classes.cart}>
              <span style={{
                color:"orange"
              }}  className={classes.count}>{totalItem || 0}</span>
              <BiCart size={28} />
            </Link>
          </div>
        </div>
        <LowerHeader />
      </header>
    </>
  );
};

export default Header;

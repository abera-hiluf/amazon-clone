
import classes from "./Signup.module.css";
import React, { useState ,useContext} from "react";

import { Link } from "react-router-dom";
import { auth } from "../../Utility/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { DataContext } from "../../Components/DataProvider/DataProvider"
import {Type} from "../../Utility/action.type"
function Auth() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const [{user},dispatch]=useContext(DataContext)
  const { state, dispatch } = useContext(DataContext);
  const { user } = state;




  console.log(user)
  const authHandler = async(e) => {
    e.preventDefault();
    // console.log(e.target.name)
    if (e.target.name === "signin") {
      signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
        console.log(userInfo)
        dispatch({
          type: Type.SET_USER,
          user:userInfo.user
        })
      })
        
        .catch((error) => {
          // console.log(error)
          setError(error.message)
      })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
        }).catch((err) => {
          setError(error.message);
      })
    }
}


  return (
    <section className={classes.login}>
      <Link>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1000px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>
      <div className={classes.login__contanier}>
        <h1> Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login__signInButton}
          >
            Sign In
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing in, you agree to the terms of the Amazon Fake Clone,
          including our Conditions of Use and Sale. Please review our Privacy
          Notice, Cookies Notice, and Interest-Based Ads Notice.
        </p>
        {/* create acoutn btn */}
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={classes.logIn__registerButton}
        >
          Create Your Amazon Acount
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;

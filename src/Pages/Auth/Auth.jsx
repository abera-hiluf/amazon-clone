
import classes from "./Signup.module.css";
import React, { useState ,useContext} from "react";

import { Link } from "react-router-dom";
import { auth } from "../../Utility/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import{DataContext} from "../../Components/DataProvider/DataProvider"
function Auth() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const [{user},dispatch]=useContext(DataContext)
  const { state, dispatch } = useContext(DataContext);
  const { user } = state;




  // console.log(email)
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
        console.log(error)
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
        console.log(err)
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
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" />
          </div>
          <button type="submit" onClick={authHandler} name="signin"
            className={classes.login__signInButton}>Sign In</button>
        </form>
        {/* agreement */}
        <p>
          By signin-in you agree to join the AMAZON  FAKE CLONE  Condition  of  use & sale -please see our privacy notice ,our cookies Notice and our Interes-Based Ads Notice;

        </p>
        {/* create acoutn btn */}
        <button type="submit" onClick={authHandler} name="signup"
          className={classes.logIn__registerButton}>
          Create Your Amazon Acount
        </button>
      </div>
    </section>
  );
}

export default Auth;

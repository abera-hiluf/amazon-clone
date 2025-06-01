import React, { useEffect, useContext } from "react";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./Routing";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";
function App() {
  const { state, dispatch } = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser)
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <Routing />
    </Router>
  );
}

export default App;

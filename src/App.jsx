import React, { useEffect, useContext } from "react";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./Routing";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";

function App() {
  const { dispatch } = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser, // ✅ Correct: use the actual user object
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    return () => unsubscribe(); // ✅ Clean up listener on unmount
  }, []);

  return (
    <Router>
      <Routing />
    </Router>
  );
}

export default App;

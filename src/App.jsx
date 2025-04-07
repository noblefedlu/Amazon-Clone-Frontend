import React, { useContext, useEffect } from "react";
import DataProvider, {
  DataContext,
} from "./components/DataProvider/DataProvider";
import "./App.css";
import Landing from "./Pages/Landing/Landing";
import Routing from "./Routing";
import { auth } from "./Utility/firebase";
import { Type } from "./Utility/action.type";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        //console.log(authUser)
        dispatch({
          type: Type.SET_USER,
          user: authuser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      <div>
        <Routing />
      </div>
    </>
  );
}

export default App;
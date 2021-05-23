import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const myContext = createContext({});
const Context = (props) => {
  const [userObject, setUserObject] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:4000/getuser", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        if (res.data) {
          //   console.log(res.data);
          setUserObject(res.data);
        } else {
          setUserObject("no data found");
        }
      });
  }, []);

  return (
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
  );
};

export default Context;

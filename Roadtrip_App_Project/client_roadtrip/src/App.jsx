import { useEffect, useState, createContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Navigation from "./Components/Navbar";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { currUser, logOut } from "./utilities";
import { getToken } from "./Components/CsrfToken";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  getToken()

  useEffect(() => {
    const getCurrUser = async () => {
      setUser(await currUser());
    };
    getCurrUser();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
      <Navigation />
        <Outlet />
      </UserContext.Provider>
    </>
  );
}

export default App;

import { signUp } from "../utilities";
import { useState, useContext, useEffect } from "react";
import { signIn, logOut, currUser } from "../utilities";
import { UserContext } from "../App";
import { Login } from "./Login";
import SignUp from "./SignUp";
import { RoadTrip } from "./RoadTrip";

export default function HomePage() {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
      setLoggedIn({ ...user }.user)
  }, [user]);

  return <>{{...user}.name ? <RoadTrip /> : <SignUp />}</>;
}

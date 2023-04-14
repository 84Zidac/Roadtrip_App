import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { signIn } from "../utilities";
import { UserContext } from "../App";

export default function roadTrip(){
    const { user } = useContext(UserContext);
    const { setUser } = useContext(UserContext);
    console.log({...user}.user)
    return(
        <h1>This is the roadtrip page</h1>
    )
}
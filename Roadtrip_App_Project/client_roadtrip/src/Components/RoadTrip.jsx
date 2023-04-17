import { useLoadScript, useJsApiLoader} from "@react-google-maps/api"
import { UserContext } from "../App";
import { useState, useContext, useEffect } from "react";
import Map from "./Map";



export function RoadTrip() {
    const { user } = useContext(UserContext);
    const { setUser } = useContext(UserContext);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "YourKey",
        libraries: ['places']
    }

    );
    if (!isLoaded) {
        return <div>Loading...</div>
    }
    return (<>
    <h1>Welcome {user.name}</h1>
    <Map />
    </>)
}
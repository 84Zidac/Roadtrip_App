import { useLoadScript, useJsApiLoader} from "@react-google-maps/api"
import { UserContext } from "../App";
import { useState, useContext, useEffect } from "react";
import Map from "./Map";



export function RoadTrip() {
    const { user } = useContext(UserContext);
    const { setUser } = useContext(UserContext);
    const libraries =['places'];

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: '###',
        libraries,
    }

    );
    if (!isLoaded) {
        return <div>Loading...</div>
    }
    return (<>
    <Map />
    </>)
}
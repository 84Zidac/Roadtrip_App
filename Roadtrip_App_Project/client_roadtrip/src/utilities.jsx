import axios from "axios";
import { useNavigate } from "react-router-dom";

export const signUp = async (name, email, password, setSignupSuccess) => {
  let response = await axios.post("/users/", {
    name: name,
    email: email,
    password: password,
  });
  setSignupSuccess(response.data.success)
  console.log(response.data.success)
  return response.data.success;
};

export const signIn = async (email, password, setUser) => {
  let response = await axios.put("/users/", {
    email: email,
    password: password,
  });

  setUser({ ...response.data, user: true });
  // console.log(response.data.login);
  if (response.data.login) {
  }
};

export const currUser = async () => {
  let response = await axios.get("/users/");
  return response.data;
};

export const logOut = async (setUser) => {
  let response = await axios.post("/users/");
  if (response.data.logout) {
    setUser(null);
  }
};

export const getCoordinates = (location) => {
  const geocoder = new google.maps.Geocoder();

  function getLatLng(result) {
    return new Promise((resolve, reject) => {
      try {
        const { geometry } = result;
        const { location } = geometry;
        const { lat, lng } = location;
        resolve({ lat, lng });
      } catch (error) {
        reject(error);
      }
    });
  }

  return new Promise((resolve, reject) => {
    geocoder.geocode({ address: location }, function (results, status) {
      if (status === "OK") {
        getLatLng(results[0])
          .then(({ lat, lng }) => {
            console.log(
              "Successfully got latitude and longitude",
              lat(),
              lng()
            );
            resolve({ lat, lng });
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      } else {
        const error = `Geocode was not successful for the following reason: ${status}`;
        console.error(error);
        reject(error);
      }
    });
  });
};

export const newRoute = async (
  route_name,
  originLat,
  originLng,
  destLat,
  destLng
) => {
  let response = await axios.post("/route/", {
    route_name: route_name,
    originLat: originLat,
    originLng: originLng,
    destLat: destLat,
    destLng: destLng,
  });
  // console.log(response.data)
  return response;
};

export const getRoutes = async () => {
  let response = await axios.get("/route/");
  // console.log(response.data)
  return response.data;
};

export const newWaypoint = async (mapId, waypointName, Lat, Lng) => {
  let response = await axios.post("/waypoint/", {
    id: mapId,
    waypoint_name: waypointName.label,
    Lat: Lat,
    Lng: Lng,
  });
  // console.log(response.data)
  return response;
};

export const getWaypoints = async (mapId, setWaypointList, list=null) => {
  // console.log(mapId, setWaypointList, list);
  let response = null
  if (list) {
    response = list;
  } else {
    response = await axios.put("/waypoint/", {
      id: mapId,
    });
  }

  let names = [];
  let forGoogle = [];
  // console.log(response.data)
  response.data.waypoints.forEach(function (waypoint) {
    names.push({
      location: waypoint.waypoint_name,
      stopover: true,
      id: waypoint.id,
      routes_id: waypoint.route_waypoints_id

    });
  });
  setWaypointList(names);
  response.data.waypoints.forEach(function (waypoint) {
    forGoogle.push({
      location: waypoint.waypoint_name,
      stopover: true,


    });
  });
  return forGoogle;
};

export const deleteTrip = async (trip, setRoutes) => {
  let response = await axios.post('/delete_trip/',trip)
  // console.log(response.data)
  setRoutes(await response.data.routes)
  window.location.reload(true);
}

export const deleteWaypoint = async (waypoint, mapId, setWaypointList) => {

  let response = await axios.post('/delete_waypoint/', waypoint)


  return getWaypoints(mapId, setWaypointList, response)
}

export const Jokes = async (setJoke) => {
  let response = await axios.get('/jokes/')
  // console.log(response.data)
  let joke = JSON.parse(response.data.data)
  console.log(joke[0].fact)
  setJoke(joke[0].fact)
}
  


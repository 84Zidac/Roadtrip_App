import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";
import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import {
  getCoordinates,
  newRoute,
  getRoutes,
  newWaypoint,
  getWaypoints,
  deleteTrip,
  deleteWaypoint,
} from "../utilities";
import Accordion from "react-bootstrap/Accordion";

// *****================================================
export default function Map() {
  const [center, setCenter] = useState({ lat: 38.4527935, lng: -99.9065136 });
  const [routes, setRoutes] = useState([]);
  const [origin, setOrigin] = useState(null);
  const [originLat, setOriginLat] = useState(null);
  const [originLng, setOriginLng] = useState(null);
  const [destination, setDestination] = useState(null);
  const [destLat, setDestLat] = useState(null);
  const [destLng, setDestLng] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [mapId, setMapId] = useState(null);
  const [waypoint, setWaypoint] = useState(null);
  const [waypointList, setWaypointList] = useState([]);
  const [routeName, setRouteName] = useState(null);
  // ================================================

  useEffect(() => {
    const nowGetRoutes = async () => {
      let response = await getRoutes();
      setRoutes(response.routes);
    };
    nowGetRoutes();
  }, []);
  useEffect(() => {
    console.log(`mapID: ${mapId}`);
  }, [mapId]);
  // ================================================

  async function createWaypoint() {
    const waypointName = waypoint;
    const waypointCoords = await getCoordinates(waypoint.label);
    const Lat = waypointCoords.lat();
    const Lng = waypointCoords.lng();
    let waypoints = await newWaypoint(mapId, waypointName, Lat, Lng);
    if (waypoints) {
      adjustMap({
        destLat: destLat,
        destLng: destLng,
        orgLat: originLat,
        orgLng: originLng,
        id: mapId,
      });
      return waypoints;
    }
  }

  async function adjustMap(dict) {
    setMapId(+dict.id);
    console.log(dict.id);
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: { lat: +dict.orgLat, lng: +dict.orgLng },
      destination: { lat: +dict.destLat, lng: +dict.destLng },
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: await getWaypoints(+dict.id, setWaypointList),
      optimizeWaypoints: true,
    });
    setDirectionsResponse(results);
  }
  // ================================================

  async function createMap() {
    const route_name = `${origin.label}--${destination.label}`;
    const originCoords = await getCoordinates(origin.label);
    const destinationCoords = await getCoordinates(destination.label);
    const OLat = originCoords.lat();
    const OLng = originCoords.lng();
    const DLat = destinationCoords.lat();
    const DLng = destinationCoords.lng();
    setOriginLat(OLat);
    setDestLat(DLat);
    setOriginLng(OLng);
    setDestLng(DLng);

    if (!origin.label || !destination.label) {
      return;
    } else {
      setWaypointList([]);
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: { lat: OLat, lng: OLng },
        destination: { lat: DLat, lng: DLng },
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: [],
        optimizeWaypoints: true,
      });
      setDirectionsResponse(results);
      let newroutes = await newRoute(route_name, OLat, OLng, DLat, DLng);
      if (newroutes.data.success) {
        setRoutes(await newroutes.data.routes);
        console.log(newroutes.data.routes);
        setMapId(newroutes.data.routes[0].id);
      }
    }
  }
  // ================================================

  return (
    <div id="the_whole_thing">
      <div id="toolbar">
        {" "}
        <DropdownButton
          id="dropdown-basic-button"
          variant="dark"
          title="Create New Route"
        >
          <Form
            id="form"
            onSubmit={(e) => [
              e.preventDefault(),
              createMap(),
              setRouteName(`${origin.label} --- ${destination.label}`),
            ]}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Create New Route</Form.Label>
            </Form.Group>

            <GooglePlacesAutocomplete
              selectProps={{
                origin,
                onChange: setOrigin,
                placeholder: "Origin",
              }}
            />
            <Form.Group controlId="formBasicEmail"></Form.Group>
            <GooglePlacesAutocomplete
              selectProps={{
                destination,
                onChange: setDestination,
                placeholder: "Destination",
              }}
              placeholder={destination}
            />
            <Button type="submit">Submit</Button>
          </Form>
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title="My Routes"
          variant="dark"
        >
          {routes.map((trip, index) => (
            <div id="routes_dropdown">
              <Dropdown.Item
                key={index}
                name={trip.route_name}
                onClick={(e) => [
                  e.preventDefault(),
                  setRouteName(trip.route_name),
                  getWaypoints(trip.id, setWaypointList),
                  setOriginLat(trip.route_origin_lat),
                  setOriginLng(trip.route_origin_lng),
                  setDestLat(trip.route_destination_lat),
                  setDestLng(trip.route_destination_lng),
                  adjustMap({
                    destLat: trip.route_destination_lat,
                    destLng: trip.route_destination_lng,
                    orgLat: trip.route_origin_lat,
                    orgLng: trip.route_origin_lng,
                    id: trip.id,
                  }),
                ]}
              >
                {trip.route_name}
              </Dropdown.Item>
              <DeleteForeverOutlinedIcon
                onClick={(e) => [
                  e.preventDefault(),
                  deleteTrip(trip, setRoutes),
                ]}
              />
            </div>
          ))}
        </DropdownButton>
        {mapId && (
          <>
            <DropdownButton
              id="dropdown-basic-button"
              title="Create Waypoint"
              variant="dark"
            >
              <Form
                onSubmit={async (e) => [
                  e.preventDefault(),
                  await createWaypoint(),
                  adjustMap({
                    destLat: destLat,
                    destLng: destLng,
                    orgLat: originLat,
                    orgLng: originLng,
                    id: mapId,
                  }),
                ]}
              >
                <Form.Group controlId="addWaypoint">
                  <Form.Label>Add Waypoint</Form.Label>
                </Form.Group>
                <GooglePlacesAutocomplete
                  selectProps={{
                    waypoint,
                    onChange: setWaypoint,
                  }}
                  placeholder={waypoint}
                />
                <Button type="submit">Submit</Button>
              </Form>
            </DropdownButton>
            <DropdownButton
              id="dropdown-basic-button"
              title="Waypoints"
              variant="dark"
            >
              <h5>Waypoints</h5>
              <ol>
                {waypointList.map((waypoint, index) => (
                  <li key={index}>
                    {waypoint.location}
                    <DeleteForeverOutlinedIcon
                      onClick={async (e) => {
                        e.preventDefault();
                        await deleteWaypoint(waypoint, mapId, setWaypointList);
                        adjustMap({
                          destLat: destLat,
                          destLng: destLng,
                          orgLat: originLat,
                          orgLng: originLng,
                          id: mapId,
                        });
                      }}
                    />
                  </li>
                ))}
              </ol>
            </DropdownButton>
          </>
        )}
      </div >
      <div id="page_head">
      {routeName ? (
        <h2><b>{routeName}</b></h2>
      ) : (
        <h1>Create a route or select from My Routes</h1>
      )}
      </div>
      {/* <Container> */}
        {/* <Col > */}
        <div id="google_map_box">
          <GoogleMap
            zoom={4}
            center={center}
            mapContainerClassName="map-container"
          >
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
            <div>
              <directionsRenderer directions={directionsResponse} />
            </div>
          </GoogleMap>
        {/* </Col> */}
        {directionsResponse && (<div id="all_directions">
          <Accordion>
          <h2>Step by Step Directions</h2>
            {directionsResponse.routes[0].legs.map((leg, index) => (
              <Accordion.Item eventKey={index} index={index}>
                <Accordion.Header>
                  <div>
                    <b>Start:</b> {leg.start_address} --- <b>End:</b> {leg.end_address} ---{" "}
                    {leg.distance.text} --- {leg.duration.text}
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {leg.steps.map((step, index) => (
                    <div
                      id="directions"
                      dangerouslySetInnerHTML={{
                        __html: `<p>${step.instructions} --- ${step.distance.text} --- ${step.duration.text}</p>`,
                      }}
                      index={index}
                    ></div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
          </div>
        )}
      {/* </Container> */}
      </div>

    </div>
  );
}

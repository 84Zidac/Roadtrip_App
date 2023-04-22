import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
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
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ListGroup from 'react-bootstrap/ListGroup';

import {
  getCoordinates,
  newRoute,
  getRoutes,
  newWaypoint,
  getWaypoints,
  deleteTrip,
} from "../utilities";
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
  // ================================================

  useEffect(() => {
    const nowGetRoutes = async () => {
      let response = await getRoutes();
      setRoutes(response.routes);
    };
    nowGetRoutes();
  }, []);
  // ================================================

  async function createWaypoint() {
    const waypointName = waypoint;
    const waypointCoords = await getCoordinates(waypoint.label);
    const Lat = waypointCoords.lat();
    const Lng = waypointCoords.lng();
    let waypoints = await newWaypoint(mapId, waypointName, Lat, Lng);
    return waypoints;
  }

  async function adjustMap(dict) {
    setMapId(+dict.id);
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
    const originLat = originCoords.lat();
    const originLng = originCoords.lng();
    const destLat = destinationCoords.lat();
    const destLng = destinationCoords.lng();
    if (!origin.label || !destination.label) {
      return;
    } else {
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: { lat: originLat, lng: originLng },
        destination: { lat: destLat, lng: destLng },
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: [],
        optimizeWaypoints: true,
      });
      setDirectionsResponse(results);
      let newroutes = await newRoute(
        route_name,
        originLat,
        originLng,
        destLat,
        destLng
      );
      if (newroutes.data.success) {
        setRoutes(await newroutes.data.routes);
        setMapId(
          await newroutes.data.routes[newroutes.data.routes.length - 1].id
        );
      }
    }
  }
  // ================================================

  return (
    <>
      <Container>
        <Row>
          <Col md="auto">
            <Form onSubmit={(e) => [e.preventDefault(), createMap()]}>
              <Form.Group controlId="formBasicEmail" md="auto">
                <Form.Label>Origin</Form.Label>
              </Form.Group>
              <GooglePlacesAutocomplete
                selectProps={{
                  origin,
                  onChange: setOrigin,
                }}
              />
              <Form.Group controlId="formBasicEmail" md="auto">
                <Form.Label>Destination</Form.Label>
              </Form.Group>
              <GooglePlacesAutocomplete
                selectProps={{
                  destination,
                  onChange: setDestination,
                }}
              />
              <Button type="submit">Submit</Button>
            </Form>
            <br></br>
            <div>
              <DropdownButton id="dropdown-basic-button" title="My Routes">
                {routes.map((trip, index) => (
                  <Dropdown.Item
                    key={index}
                    name={trip.route_name}
                    onClick={(e) => [
                      e.preventDefault(),
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
                ))}
              </DropdownButton>

              {/* <DeleteForeverOutlinedIcon onClick={(e) => [e.preventDefault(), deleteTrip(trip, setRoutes)]}/> */}
              <br></br>
              {mapId && (
                <>
                  <Form
                    onSubmit={(e) => [
                      e.preventDefault(),
                      createWaypoint(),
                      adjustMap({
                        destLat: destLat,
                        destLng: destLng,
                        orgLat: originLat,
                        orgLng: originLng,
                        id: mapId,
                      }),
                    ]}
                  >
                    <Form.Group controlId="formBasicEmail" md="auto">
                      <Form.Label>Add Waypoint</Form.Label>
                    </Form.Group>
                    <GooglePlacesAutocomplete
                      selectProps={{
                        waypoint,
                        onChange: setWaypoint,
                      }}
                    />
                    <Button type="submit">Submit</Button>
                  </Form>
                  <h5>Waypoints</h5>
                  <ol>
                    {waypointList.map((waypoint, index) => (
                      <li key={index}>{waypoint.location}</li>
                    ))}
                  </ol>
                </>
              )}
            </div>
          </Col>
          <Col xs={8}>
            <GoogleMap
              zoom={4}
              center={center}
              mapContainerClassName="map-container"
            >
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </Col>
        </Row>
      </Container>
    </>
  );
}

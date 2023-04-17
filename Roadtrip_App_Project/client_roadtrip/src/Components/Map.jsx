import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useRef } from "react";
import { useMemo } from "react";
import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Map() {
  const center = useMemo(() => ({ lat: 64.683, lng: -147.083 }));
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  //   const OriginComponent = () => {
  //     return (
  //       <div>
  //         <GooglePlacesAutocomplete
  //           selectProps={{
  //             origin,
  //             onChange: setOrigin,
  //           }}
  //         />
  //       </div>
  //     );
  //   };

  //   const DestinationComponent = () => {
  //     return (
  //       <div>
  //         <GooglePlacesAutocomplete
  //           selectProps={{
  //             destination,
  //             onChange: setDestination,
  //           }}
  //         />
  //       </div>
  //     );
  //   };
  //   console.log(origin, destination)

  return (
    <>
      <Container>
        <Row>
          <Col md="auto">
            <Form
              onSubmit={(e) => [
                e.preventDefault(),
                createMap(origin, destination),
                setOrigin(null),
                setDestination(null),
              ]}
            >
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

            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>Lorem ipsum dolor</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>Lorem ipsum dolor</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col xs={8}>
            <GoogleMap
              zoom={10}
              center={{ lat: 64.683, lng: -147.083 }}
              mapContainerClassName="map-container"
              //   onLoad={(map) => setMap(map)}
            >
              <Marker position={center} />
            </GoogleMap>
          </Col>
        </Row>
      </Container>
    </>
  );
}

function createMap(origin, destination){
    console.log(origin, destination);

}
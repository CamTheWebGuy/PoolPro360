import React, { useState, useEffect, Fragment } from 'react';
/* global google */
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  DirectionsRenderer
} from '@react-google-maps/api';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getRouteLegs } from '../../actions/map';

const MapDirectionsRenderer = ({ places, travelMode, getRouteLegs }) => {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const { places, travelMode } = props;

    const waypoints = places.map(p => ({
      location: {
        lat: parseFloat(p.serviceLat),
        lng: parseFloat(p.serviceLng)
      },
      stopover: true
    }));

    // console.log(waypoints[waypoints.length - 1]);
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: travelMode
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
          getRouteLegs(result.routes[0].legs);
        } else {
          console.log(result);
          setError(result);
        }
      }
    );
  }, [getRouteLegs]);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Fragment>
      {directions && <DirectionsRenderer directions={directions} />}
    </Fragment>
  );
};

MapDirectionsRenderer.propTypes = {
  getRouteLegs: PropTypes.func.isRequired
};

export default connect(null, { getRouteLegs })(MapDirectionsRenderer);

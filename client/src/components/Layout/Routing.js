import React, { Fragment, useState, useEffect, useRef } from 'react';

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  DirectionsService,
  Polyline
} from '@react-google-maps/api';

import MapDirectionsRenderer from './MapDirectionsRenderer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getEmployeeCustomers } from '../../actions/employee';

import Sidebar from '../dashboard/Sidebar';
import Dashnav from '../dashboard/Dashnav';
import Alert from '../Layout/Alert';
import Footer from '../Layout/Footer';
import RouteBuilder from '../Layout/RouteBuilder';

import { Container } from 'reactstrap';

// import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import RoutingMachine from '../../utils/RoutingMachine';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet.routing.icons.png';

import LeafletMap from '../Layout/LeafletMap';

let key = 'AIzaSyBPTZtirCX7Ar2bIandK2EZzj10V2bBUag';

const markerIcon = new L.Icon({
  iconUrl:
    'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
  iconSize: [35, 45],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
  html: '5'
});

const containerStyle = {
  width: '100%',
  height: '400px'
};

const locations = [
  {
    id: 4,
    info: 'Greg Bryson',
    lat: 34.238134,
    lng: -84.072205
  },

  {
    id: 3,
    info: 'Lee Wood',
    lat: 34.224666,
    lng: -84.077647
  },
  {
    id: 5,
    info: 'Sam Siemon',
    lat: 34.235536,
    lng: -84.072864
  },
  {
    id: 2,
    info: 'Scott Harris',
    lat: 34.189243,
    lng: -84.069363
  }
];

const Routing = ({
  mapRedux: { legs, loading },
  customers: { customers },
  getEmployeeCustomers
}) => {
  const [map, setMap] = React.useState(null);

  useEffect(() => {
    // getEmployeeCustomers('6011ff1582278974ac42fe88');
  }, [getEmployeeCustomers]);

  const [mapState, setMapState] = useState({
    showingInfoWindow: false,
    selectedMarker: null
  });

  const onMarkerClick = id => {
    setMapState({
      showingInfoWindow: true,
      selectedMarker: id
    });
  };

  const onInfoWindowClose = () => {
    setMapState({
      showingInfoWindow: false,
      selectedMarker: null
    });
  };

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  let totalDistance = 0;
  let totalDuration = 0;
  let METERS_TO_MILES = 0.000621371192;

  const calculateTotalDistance = () => {
    for (var i = 0; i < legs.length; ++i) {
      totalDistance += legs[i].distance.value;
      totalDuration += legs[i].duration.value;
    }

    totalDistance = Math.round(totalDistance * METERS_TO_MILES * 10) / 10;
    totalDuration = Math.round(totalDuration / 60);

    // setTotals({
    //   totalDistance,
    //   totalDuration
    // });
  };

  calculateTotalDistance();

  // console.log(totalDuration, totalDistance);

  const [centerPoint, setCenterPoint] = useState({
    lat: 34.2313319,
    lng: -84.1105079
  });
  const ZOOM_LEVEL = 13;
  const mapRef = useRef();

  return (
    <Fragment>
      <Sidebar active='routing' />
      <div className='main-content' id='panel'>
        <Dashnav />
        <Alert />
        <div className='header bg-primary pb-6'>
          <div className='container-fluid'>
            <div className='header-body'>
              <div className='row align-items-center py-4'>
                <div className='col-lg-6 col-7'>
                  <h6 className='h2 text-white d-inline-block mb-0'>
                    PoolPro360
                  </h6>
                  <nav
                    aria-label='breadcrumb'
                    className='d-none d-md-inline-block ml-md-4'
                  >
                    <ol className='breadcrumb breadcrumb-links breadcrumb-dark'>
                      <li className='breadcrumb-item'>
                        <a href='/'>
                          <i className='fas fa-home' />
                        </a>
                      </li>
                      <li className='breadcrumb-item'>
                        <a href='/dashboard'>Dashboard</a>
                      </li>
                      <li className='breadcrumb-item active'>
                        <a href='/users'>Routing</a>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Container>
          <h1>Google Maps Route</h1>

          {totalDistance && <h2>Total Distance: {totalDistance} miles</h2>}
          {totalDuration && <h3>Total Duration: {totalDuration} minutes</h3>}

          <h1>Route Builder</h1>
          <RouteBuilder />
        </Container>
      </div>
    </Fragment>
  );
};

Routing.propTypes = {
  getEmployeeCustomers: PropTypes.func.isRequired,
  mapRedux: PropTypes.object.isRequired,
  customers: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  mapRedux: state.map,
  customers: state.customer
});

export default connect(mapStateToProps, { getEmployeeCustomers })(Routing);

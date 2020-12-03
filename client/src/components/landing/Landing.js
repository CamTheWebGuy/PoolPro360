import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Container, Button, Nav } from 'react-bootstrap';

import Navbar from '../Layout/Navbar';
import LandingContent from './LandingContent';
import Footer from '../Layout/Footer';

const Landing = () => {
  return (
    <Fragment>
      <Navbar />
      <LandingContent />
      <Footer />
    </Fragment>
  );
};

export default Landing;

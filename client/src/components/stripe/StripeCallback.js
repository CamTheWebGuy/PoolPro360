import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SpinnerCircular } from 'spinners-react';
import { Container, Col, Row } from 'reactstrap';

import { getAccountStatus } from '../../actions/stripe';

const StripeCallback = ({
  history,
  getAccountStatus,
  auth: { user, isAuthenticated, loading, token }
}) => {
  useEffect(() => {
    if (user && isAuthenticated) {
      getAccountStatus();
    }
  }, [user, isAuthenticated, getAccountStatus]);
  return (
    <Fragment>
      <Container>
        <Row>
          <Col sm='12'>
            <div className='text-center mgn-top-50'>
              <SpinnerCircular
                size={50}
                thickness={180}
                speed={100}
                color='rgba(57, 125, 172, 1)'
                secondaryColor='rgba(0, 0, 0, 0.44)'
              />
              <h1>Processing...</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

StripeCallback.propTypes = {
  getAccountStatus: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getAccountStatus })(StripeCallback);

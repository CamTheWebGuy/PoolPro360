import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Alert as BSAlert } from 'react-bootstrap';

import $ from 'jquery';
import { notify } from 'bootstrap4-notify';

// $.notify('Hello World');

const alertHandler = alert => {
  $.notify(
    {
      message: alert.msg
    },
    {
      type: alert.alertType,
      delay: 5000,
      placement: {
        from: 'top',
        align: 'center'
      }
    }
  );
};

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => <div key={alert.id}>{alertHandler(alert)}</div>);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);

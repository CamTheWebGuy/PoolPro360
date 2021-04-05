import React, { Fragment, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import moment from 'moment';

import { getEmployeeRoute, getEmployeeRouteRB } from '../../actions/employee';

import {
  addServiceLog,
  getChecklist,
  getCustomerServiceNotes,
  sendServiceReport,
  unableService,
  getWorkOrders,
  completeWorkOrder
} from '../../actions/customer';

const RouteViewerCards = ({
  auth: { user, isAuthenticated, loading, token },
  getEmployeeRoute,
  getEmployeeRouteRB,
  getWorkOrders,
  customers: { checklist, serviceNotes, routeList, workOrders }
}) => {
  useEffect(() => {
    if (user) {
      getEmployeeRoute(user._id, moment(new Date()).format('dddd'));
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role !== 'Technician') {
      getWorkOrders();
    }
  }, [user, getWorkOrders]);

  const [routeDay, setRouteDay] = useState('Today');

  useEffect(async () => {
    if (user) {
      if (
        routeDay === 'Today' ||
        routeDay === moment(Date.now()).format('dddd')
      ) {
        return await getEmployeeRoute(
          user._id,
          moment(new Date()).format('dddd')
        );
      }

      await getEmployeeRouteRB(user._id, routeDay);
    }
  }, [routeDay]);

  return (
    <Fragment>
      <div className='col-xl-3 col-md-6'>
        <div className='card card-stats'>
          {/* Card body */}
          <div className='card-body'>
            <div className='row'>
              <div className='col'>
                <h5 className='card-title text-uppercase text-muted mb-0'>
                  Today Is:
                </h5>
                <span className='h2 font-weight-bold mb-0'>
                  {moment(new Date()).format('dddd')}
                </span>
              </div>
              <div className='col-auto'>
                <div className='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
                  <i className='ni ni-calendar-grid-58' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xl-3 col-md-6'>
        <div className='card card-stats'>
          {/* Card body */}
          <div className='card-body'>
            <div className='row'>
              <div className='col'>
                <h5 className='card-title text-uppercase text-muted mb-0'>
                  {routeDay}'s Jobs
                </h5>
                <span className='h2 font-weight-bold mb-0'>
                  {routeList && routeList.length}
                </span>
              </div>
              <div className='col-auto'>
                <div className='icon icon-shape bg-gradient-orange text-white rounded-circle shadow'>
                  <i className='ni ni-collection' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xl-3 col-md-6'>
        <div className='card card-stats'>
          {/* Card body */}
          <div className='card-body'>
            <div className='row'>
              <div className='col'>
                <h5 className='card-title text-uppercase text-muted mb-0'>
                  Jobs Remaining
                </h5>
                <span className='h2 font-weight-bold mb-0'>
                  {
                    routeList.filter(
                      c =>
                        (c.type !== 'Work Order' &&
                          moment(c.customer.lastServiced).isBefore(
                            Date.now(),
                            'day'
                          ) &&
                          c.customer.scheduledDay ===
                            moment(Date.now()).format('dddd')) ||
                        (c.type !== 'Work Order' &&
                          c.customer.lastServiced === undefined &&
                          c.customer.scheduledDay ===
                            moment(Date.now()).format('dddd')) ||
                        (c.type === 'Work Order' &&
                          routeList.filter(
                            e =>
                              e._id.toString() === c._id.toString() &&
                              e.status === 'Approved' &&
                              moment(e.scheduledDate).isSame(Date.now(), 'day')
                          ).length >= 1)
                    ).length
                  }
                </span>
              </div>
              <div className='col-auto'>
                <div className='icon icon-shape bg-gradient-green text-white rounded-circle shadow'>
                  <i className='ni ni-delivery-fast' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xl-3 col-md-6'>
        <div className='card card-stats'>
          {/* Card body */}
          <div className='card-body'>
            <div className='row'>
              <div className='col'>
                <h5 className='card-title text-uppercase text-muted mb-0'>
                  Jobs Completed
                </h5>
                <span className='h2 font-weight-bold mb-0'>
                  {
                    routeList.filter(
                      c =>
                        (c.type !== 'Work Order' &&
                          moment(c.customer.lastServiced).isSame(
                            Date.now(),
                            'day'
                          ) &&
                          c.customer.scheduledDay ===
                            moment(new Date()).format('dddd') &&
                          c.customer.lastServiced !== undefined) ||
                        (c.type === 'Work Order' &&
                          moment(c.scheduledDate).isSame(Date.now(), 'day') &&
                          c.status === 'Completed')
                    ).length
                  }
                </span>
              </div>
              <div className='col-auto'>
                <div className='icon icon-shape bg-gradient-info text-white rounded-circle shadow'>
                  <i className='ni ni-check-bold' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

RouteViewerCards.propTypes = {
  auth: PropTypes.object.isRequired,
  addServiceLog: PropTypes.func.isRequired,
  getChecklist: PropTypes.func.isRequired,
  getCustomerServiceNotes: PropTypes.func.isRequired,
  getEmployeeRoute: PropTypes.func.isRequired,
  sendServiceReport: PropTypes.func.isRequired,
  unableService: PropTypes.func.isRequired,
  getWorkOrders: PropTypes.func.isRequired,
  completeWorkOrder: PropTypes.func.isRequired,
  getEmployeeRouteRB: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  customers: state.customer
});

export default connect(mapStateToProps, {
  addServiceLog,
  getChecklist,
  getCustomerServiceNotes,
  getEmployeeRoute,
  sendServiceReport,
  unableService,
  getWorkOrders,
  completeWorkOrder,
  getEmployeeRouteRB
})(RouteViewerCards);

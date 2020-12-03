import React, { Fragment } from 'react';

import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';

const Pricing = () => {
  return (
    <Fragment>
      <Navbar />

      <div className='main-content' style={{ background: '#172b4d' }}>
        <div className='header bg-gradient-primary py-7 py-lg-8 pt-lg-9'>
          <div className='container'>
            <div className='header-body text-center mb-7'>
              <div className='row justify-content-center'>
                <div className='col-xl-5 col-lg-6 col-md-8 px-5'>
                  <h1 className='text-white'>
                    No setup fees. No contracts. No risk.
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className='separator separator-bottom separator-skew zindex-100'>
            <svg
              x='0'
              y='0'
              viewBox='0 0 2560 100'
              preserveAspectRatio='none'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
            >
              <polygon
                className='fill-default'
                points='2560 0 2560 100 0 100'
              ></polygon>
            </svg>
          </div>
        </div>

        <div className='container mt--8 pb-5'>
          <div className='row justify-content-center'>
            <div className='col-lg-10'>
              <div className='pricing card-group flex-column flex-md-row mb-3'>
                <div className='card card-pricing border-0 text-center mb-4'>
                  <div className='card-header bg-transparent'>
                    <h4 className='text-uppercase ls-1 text-primary py-3 mb-0'>
                      Startup
                    </h4>
                  </div>
                  <div className='card-body px-lg-7'>
                    <div className='display-2'>$18</div>
                    <span className='text-muted'>per month</span>
                    <ul className='list-unstyled my-4'>
                      <li>
                        <div className='d-flex align-items-center'>
                          <div>
                            <div className='icon icon-xs icon-shape bg-gradient-primary shadow rounded-circle text-white'>
                              <i className='fas fa-terminal'></i>
                            </div>
                          </div>
                          <div>
                            <span className='pl-2'>1 User/Technician</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='d-flex align-items-center'>
                          <div>
                            <div className='icon icon-xs icon-shape bg-gradient-primary shadow rounded-circle text-white'>
                              <i className='fas fa-pen-fancy'></i>
                            </div>
                          </div>
                          <div>
                            <span className='pl-2'>10 Customers</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='d-flex align-items-center'>
                          <div>
                            <div className='icon icon-xs icon-shape bg-gradient-primary shadow rounded-circle text-white'>
                              <i className='fas fa-hdd'></i>
                            </div>
                          </div>
                          <div>
                            <span className='pl-2'>
                              Unlimited Video Training
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <button type='button' className='btn btn-primary mb-3'>
                      Get Started
                    </button>
                  </div>
                  <div className='card-footer'>
                    <a href='#!' className='text-light'>
                      Request a demo
                    </a>
                  </div>
                </div>
                <div className='card card-pricing bg-gradient-success zoom-in shadow-lg rounded border-0 text-center mb-4'>
                  <div className='card-header bg-transparent'>
                    <h4 className='text-uppercase ls-1 text-white py-3 mb-0'>
                      Professional
                    </h4>
                  </div>
                  <div className='card-body px-lg-7'>
                    <div className='display-1 text-white'>$48</div>
                    <span className='text-white'>per month</span>
                    <ul className='list-unstyled my-4'>
                      <li>
                        <div className='d-flex align-items-center'>
                          <div>
                            <div className='icon icon-xs icon-shape bg-white shadow rounded-circle text-muted'>
                              <i className='fas fa-terminal'></i>
                            </div>
                          </div>
                          <div>
                            <span className='pl-2 text-white'>
                              Unlimited Users/Technicians
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='d-flex align-items-center'>
                          <div>
                            <div className='icon icon-xs icon-shape bg-white shadow rounded-circle text-muted'>
                              <i className='fas fa-pen-fancy'></i>
                            </div>
                          </div>
                          <div>
                            <span className='pl-2 text-white'>
                              Unlimited Customers
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='d-flex align-items-center'>
                          <div>
                            <div className='icon icon-xs icon-shape bg-white shadow rounded-circle text-muted'>
                              <i className='fas fa-hdd'></i>
                            </div>
                          </div>
                          <div>
                            <span className='pl-2 text-white'>
                              Unlimited Video Training
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <button type='button' className='btn btn-secondary mb-3'>
                      Get Started
                    </button>
                  </div>
                  <div className='card-footer bg-transparent'>
                    <a href='#!' className='text-white'>
                      Contact sales
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-lg-center px-3 mt-5'>
            <div>
              <div className='icon icon-shape bg-gradient-white shadow rounded-circle text-primary'>
                <i className='ni ni-building text-primary'></i>
              </div>
            </div>
            <div className='col-lg-6'>
              <p className='text-white'>
                <strong>The Arctic Ocean</strong> freezes every winter and much
                of the sea-ice then thaws every summer, and that process will
                continue whatever.
              </p>
            </div>
          </div>
          <div className='row row-grid justify-content-center'>
            <div className='col-lg-10'>
              <div className='table-responsive'>
                <table className='table table-dark mt-5'>
                  <thead>
                    <tr>
                      <th className='px-0 bg-transparent' scope='col'>
                        <span className='text-light font-weight-700'>
                          Features
                        </span>
                      </th>
                      <th className='text-center bg-transparent' scope='col'>
                        Bravo Pack
                      </th>
                      <th className='text-center bg-transparent' scope='col'>
                        Alpha Pack
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='px-0'>IMAP/POP Support</td>
                      <td className='text-center'>
                        <i className='fas fa-check text-success'></i>
                      </td>
                      <td className='text-center'>
                        <i className='fas fa-check text-success'></i>
                      </td>
                    </tr>
                    <tr>
                      <td className='px-0'>Email Forwarding</td>
                      <td className='text-center'>
                        <i className='fas fa-check text-success'></i>
                      </td>
                      <td className='text-center'>
                        <i className='fas fa-check text-success'></i>
                      </td>
                    </tr>
                    <tr>
                      <td className='px-0'>Active Sync</td>
                      <td className='text-center'>
                        <i className='fas fa-check text-success'></i>
                      </td>
                      <td className='text-center'>
                        <i className='fas fa-check text-success'></i>
                      </td>
                    </tr>
                    <tr>
                      <td className='px-0'>Multiple domain hosting</td>
                      <td className='text-center'>
                        <i className='fas fa-check text-success'></i>
                      </td>
                      <td className='text-center'>
                        <span className='text-sm text-light'>
                          Limited to 1 domain only
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className='px-0'>Additional storage upgrade</td>
                      <td className='text-center'>
                        <i className='fas fa-check text-success'></i>
                      </td>
                      <td className='text-center'>
                        <i className='fas fa-check text-success'></i>
                      </td>
                    </tr>
                    <tr>
                      <td className='px-0'>30MB Attachment Limit</td>
                      <td className='text-center'>
                        <i className='fas fa-check text-success'></i>
                      </td>
                      <td className='text-center'>-</td>
                    </tr>
                    <tr>
                      <td className='px-0'>
                        Password protected / Expiry links
                      </td>
                      <td className='text-center'>
                        <i className='fas fa-check text-success'></i>
                      </td>
                      <td className='text-center'>-</td>
                    </tr>
                    <tr>
                      <td className='px-0'>Unlimited Custom Apps</td>
                      <td className='text-center'>
                        <i className='fas fa-check text-success'></i>
                      </td>
                      <td className='text-center'>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer cssClass='footer-dark' />
    </Fragment>
  );
};

export default Pricing;

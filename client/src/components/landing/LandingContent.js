import React, { Fragment } from 'react';

import { Row, Col, Container, Button, Nav } from 'react-bootstrap';

const LandingContent = () => {
  return (
    <Fragment>
      <div className='main-content'>
        <div className='header bg-primary pt-5 pb-7'>
          <div className='container'>
            <div className='header-body'>
              <div className='row align-items-center'>
                <div className='col-lg-6'>
                  <div className='pr-5'>
                    <h1 className='display-2 text-white font-weight-bold mb-0'>
                      <Row>
                        <Col>
                          PoolPro360 <span className='fsize-12'>Beta</span>
                        </Col>
                      </Row>
                    </h1>
                    <h2 className='display-4 text-white font-weight-light'>
                      Your Pool Business, Simpler Than Ever Before.
                    </h2>
                    <p className='text-white mt-4'>
                      Designed specifically for Pool Businesses, PoolPro360 will
                      empower you with everything you need to run your business
                      in one, simple, easy to use app.
                    </p>
                    <div className='mt-5'>
                      <a
                        href='./pages/dashboards/dashboard.html'
                        className='btn btn-neutral my-2'
                      >
                        See Pricing
                      </a>
                      <a
                        href='https://www.creative-tim.com/product/argon-dashboard-pro'
                        className='btn btn-default my-2'
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='row pt-5'>
                    <div className='col-md-6'>
                      <div className='card'>
                        <div className='card-body'>
                          <div className='icon icon-shape bg-gradient-red text-white rounded-circle shadow mb-4'>
                            <i className='ni ni-money-coins'></i>
                          </div>
                          <h5 className='h3'>Online Booking/Payment</h5>
                          <p>
                            Reduce wasted time on phone calls and have your
                            future or current customers handle booking services
                            or making payments online.
                          </p>
                        </div>
                      </div>
                      <div className='card'>
                        <div className='card-body'>
                          <div className='icon icon-shape bg-gradient-info text-white rounded-circle shadow mb-4'>
                            <i className='ni ni-single-02'></i>
                          </div>
                          <h5 className='h3'>Customer Tracking</h5>
                          <p>
                            Including information on their pools, locations,
                            gate codes & contact information.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6 pt-lg-5 pt-4'>
                      <div className='card mb-4'>
                        <div className='card-body'>
                          <div className='icon icon-shape bg-gradient-success text-white rounded-circle shadow mb-4'>
                            <i className='ni ni-email-83'></i>
                          </div>
                          <h5 className='h3'>Service Emails</h5>
                          <p>
                            Email your customers a beautiful service report
                            automatically when you finish each route stop,
                            including checmical readings & dosages.
                          </p>
                        </div>
                      </div>
                      <div className='card mb-4'>
                        <div className='card-body'>
                          <div className='icon icon-shape bg-gradient-warning text-white rounded-circle shadow mb-4'>
                            <i className='ni ni-delivery-fast'></i>
                          </div>
                          <h5 className='h3'>Work Orders</h5>
                          <p>
                            Easily track repairs, service calls, filter
                            cleanings and more.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
        <section className='py-6 pb-9 bg-default'>
          <div className='container'>
            <div className='row justify-content-center text-center'>
              <div className='col-md-8'>
                <h2 className='display-3 text-white'>
                  A Complete Solution For The Modern Pool Business
                </h2>
                <p className='lead text-white'>
                  Argon is a completly new product built on our newest re-built
                  from scratch framework structure that is meant to make our
                  products more intuitive, more adaptive and, needless to say,
                  so much easier to customize. Let Argon amaze you with its cool
                  features and build tools and get your project to a whole new
                  level.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='section section-lg pt-lg-0 mt--7'>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-lg-12'>
                <div className='row'>
                  <div className='col-lg-4'>
                    <div className='card card-lift--hover shadow border-0'>
                      <div className='card-body py-5'>
                        <div className='icon icon-shape bg-gradient-primary text-white rounded-circle mb-4'>
                          <i className='ni ni-check-bold'></i>
                        </div>
                        <h4 className='h3 text-primary text-uppercase'>
                          Based on Bootstrap 4
                        </h4>
                        <p className='description mt-3'>
                          Argon is built on top of the most popular open source
                          toolkit for developing with HTML, CSS, and JS.
                        </p>
                        <div>
                          <span className='badge badge-pill badge-primary'>
                            bootstrap 4
                          </span>
                          <span className='badge badge-pill badge-primary'>
                            dashboard
                          </span>
                          <span className='badge badge-pill badge-primary'>
                            template
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4'>
                    <div className='card card-lift--hover shadow border-0'>
                      <div className='card-body py-5'>
                        <div className='icon icon-shape bg-gradient-success text-white rounded-circle mb-4'>
                          <i className='ni ni-istanbul'></i>
                        </div>
                        <h4 className='h3 text-success text-uppercase'>
                          Integrated build tools
                        </h4>
                        <p className='description mt-3'>
                          Use Argons's included npm and gulp scripts to compile
                          source code, run tests, and more with just a few
                          simple commands.
                        </p>
                        <div>
                          <span className='badge badge-pill badge-success'>
                            npm
                          </span>
                          <span className='badge badge-pill badge-success'>
                            gulp
                          </span>
                          <span className='badge badge-pill badge-success'>
                            build tools
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4'>
                    <div className='card card-lift--hover shadow border-0'>
                      <div className='card-body py-5'>
                        <div className='icon icon-shape bg-gradient-warning text-white rounded-circle mb-4'>
                          <i className='ni ni-planet'></i>
                        </div>
                        <h4 className='h3 text-warning text-uppercase'>
                          Full Sass support
                        </h4>
                        <p className='description mt-3'>
                          Argon makes customization easier than ever before. You
                          get all the tools to make your website building
                          process a breeze.
                        </p>
                        <div>
                          <span className='badge badge-pill badge-warning'>
                            sass
                          </span>
                          <span className='badge badge-pill badge-warning'>
                            design
                          </span>
                          <span className='badge badge-pill badge-warning'>
                            customize
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='py-6'>
          <div className='container'>
            <div className='row row-grid align-items-center'>
              <div className='col-md-6 order-md-2'>
                <img
                  src='./assets/img/theme/landing-1.png'
                  className='img-fluid'
                />
              </div>
              <div className='col-md-6 order-md-1'>
                <div className='pr-md-5'>
                  <h1>Awesome features</h1>
                  <p>
                    This dashboard comes with super cool features that are meant
                    to help in the process. Handcrafted components, page
                    examples and functional widgets are just a few things you
                    will see and love at first sight.
                  </p>
                  <ul className='list-unstyled mt-5'>
                    <li className='py-2'>
                      <div className='d-flex align-items-center'>
                        <div>
                          <div className='badge badge-circle badge-success mr-3'>
                            <i className='ni ni-settings-gear-65'></i>
                          </div>
                        </div>
                        <div>
                          <h4 className='mb-0'>Carefully crafted components</h4>
                        </div>
                      </div>
                    </li>
                    <li className='py-2'>
                      <div className='d-flex align-items-center'>
                        <div>
                          <div className='badge badge-circle badge-success mr-3'>
                            <i className='ni ni-html5'></i>
                          </div>
                        </div>
                        <div>
                          <h4 className='mb-0'>Amazing page examples</h4>
                        </div>
                      </div>
                    </li>
                    <li className='py-2'>
                      <div className='d-flex align-items-center'>
                        <div>
                          <div className='badge badge-circle badge-success mr-3'>
                            <i className='ni ni-satisfied'></i>
                          </div>
                        </div>
                        <div>
                          <h4 className='mb-0'>Super friendly support team</h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='py-6'>
          <div className='container'>
            <div className='row row-grid align-items-center'>
              <div className='col-md-6'>
                <img
                  src='./assets/img/theme/landing-2.png'
                  className='img-fluid'
                />
              </div>
              <div className='col-md-6'>
                <div className='pr-md-5'>
                  <h1>Example pages</h1>
                  <p>
                    If you want to get inspiration or just show something
                    directly to your clients, you can jump start your
                    development with our pre-built example pages.
                  </p>
                  <a
                    href='./pages/examples/profile.html'
                    className='font-weight-bold text-warning mt-5'
                  >
                    Explore pages
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='py-6'>
          <div className='container'>
            <div className='row row-grid align-items-center'>
              <div className='col-md-6 order-md-2'>
                <img
                  src='./assets/img/theme/landing-3.png'
                  className='img-fluid'
                />
              </div>
              <div className='col-md-6 order-md-1'>
                <div className='pr-md-5'>
                  <h1>Lovable widgets and cards</h1>
                  <p>
                    We love cards and everybody on the web seems to. We have
                    gone above and beyond with options for you to organise your
                    information. From cards designed for content, to pricing
                    cards or user profiles, you will have many options to choose
                    from.
                  </p>
                  <a
                    href='./pages/widgets.html'
                    className='font-weight-bold text-info mt-5'
                  >
                    Explore widgets
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='py-7 section-nucleo-icons bg-white overflow-hidden'>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-lg-8 text-center'>
                <h2 className='display-3'>Nucleo Icons</h2>
                <p className='lead'>
                  The official package contains over 21.000 icons which are
                  looking great in combination with Argon Design System. Make
                  sure you check all of them and use those that you like the
                  most.
                </p>
                <div className='btn-wrapper'>
                  <a
                    href='./docs/foundation/icons.html'
                    className='btn btn-primary'
                  >
                    View demo icons
                  </a>
                  <a
                    href='https://nucleoapp.com/?ref=1712'
                    target='_blank'
                    className='btn btn-default mt-3 mt-md-0'
                  >
                    View all icons
                  </a>
                </div>
              </div>
            </div>
            <div className='blur--hover'>
              <a href='./docs/foundation/icons.html'>
                <div className='icons-container blur-item mt-5'>
                  <i className='icon ni ni-diamond'></i>

                  <i className='icon icon-sm ni ni-album-2'></i>
                  <i className='icon icon-sm ni ni-app'></i>
                  <i className='icon icon-sm ni ni-atom'></i>

                  <i className='icon ni ni-bag-17'></i>
                  <i className='icon ni ni-bell-55'></i>
                  <i className='icon ni ni-credit-card'></i>

                  <i className='icon icon-sm ni ni-briefcase-24'></i>
                  <i className='icon icon-sm ni ni-building'></i>
                  <i className='icon icon-sm ni ni-button-play'></i>

                  <i className='icon ni ni-calendar-grid-58'></i>
                  <i className='icon ni ni-camera-compact'></i>
                  <i className='icon ni ni-chart-bar-32'></i>
                </div>
                <span className='blur-hidden h5 text-success'>
                  Explore all the 21.000+ Nucleo Icons
                </span>
              </a>
            </div>
          </div>
        </section>
        <section className='py-7'>
          <div className='container'>
            <div className='row row-grid justify-content-center'>
              <div className='col-lg-8 text-center'>
                <h2 className='display-3'>
                  Do you love this awesome{' '}
                  <span className='text-success'>
                    Dashboard for Bootstrap 4?
                  </span>
                </h2>
                <p className='lead'>
                  Cause if you do, it can be yours now. Hit the button below to
                  navigate to get the free version or purchase a license for
                  your next project. Build a new web app or give an old
                  Bootstrap project a new look!
                </p>
                <div className='btn-wrapper'>
                  <a
                    href='https://www.creative-tim.com/product/argon-dashboard'
                    className='btn btn-neutral mb-3 mb-sm-0'
                    target='_blank'
                  >
                    <span className='btn-inner--text'>Get FREE version</span>
                  </a>
                  <a
                    href='https://www.creative-tim.com/product/argon-dashboard-pro'
                    className='btn btn-primary btn-icon mb-3 mb-sm-0'
                  >
                    <span className='btn-inner--icon'>
                      <i className='ni ni-basket'></i>
                    </span>
                    <span className='btn-inner--text'>Purchase now</span>
                  </a>
                </div>
                <div className='text-center'>
                  <h4 className='display-4 mb-5 mt-5'>
                    Available on these technologies
                  </h4>
                  <div className='row justify-content-center'>
                    <div className='col-md-2 col-3 my-2'>
                      <a
                        href='https://www.creative-tim.com/product/argon-dashboard'
                        target='_blank'
                        data-toggle='tooltip'
                        data-original-title='Bootstrap 4 - Most popular front-end component library'
                      >
                        <img
                          src='https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/bootstrap.jpg'
                          className='img-fluid rounded-circle shadow shadow-lg--hover'
                        />
                      </a>
                    </div>
                    <div className='col-md-2 col-3 my-2'>
                      <a
                        href=' https://www.creative-tim.com/product/vue-argon-dashboard'
                        target='_blank'
                        data-toggle='tooltip'
                        data-original-title='Vue.js - The progressive javascript framework'
                      >
                        <img
                          src='https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/vue.jpg'
                          className='img-fluid rounded-circle'
                        />
                      </a>
                    </div>
                    <div className='col-md-2 col-3 my-2'>
                      <a
                        href=' https://www.creative-tim.com/product/argon-dashboard'
                        target='_blank'
                        data-toggle='tooltip'
                        data-original-title='Sketch - Digital design toolkit'
                      >
                        <img
                          src='https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/sketch.jpg'
                          className='img-fluid rounded-circle'
                        />
                      </a>
                    </div>
                    <div className='col-md-2 col-3 my-2'>
                      <a
                        href=' https://www.creative-tim.com/product/argon-dashboard-angular'
                        target='_blank'
                        data-toggle='tooltip'
                        data-original-title='Angular - One framework. Mobile &amp; desktop'
                      >
                        <img
                          src='https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/angular.jpg'
                          className='img-fluid rounded-circle'
                        />
                      </a>
                    </div>
                    <div className='col-md-2 col-3 my-2'>
                      <a
                        href=' https://www.creative-tim.com/product/argon-dashboard-react'
                        target='_blank'
                        data-toggle='tooltip'
                        data-original-title='React - A JavaScript library for building user interfaces'
                      >
                        <img
                          src='https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/react.jpg'
                          className='img-fluid rounded-circle'
                        />
                      </a>
                    </div>
                    <div className='col-md-2 col-3 my-2'>
                      <a
                        href=' https://www.creative-tim.com/product/argon-dashboard-laravel'
                        target='_blank'
                        data-toggle='tooltip'
                        data-original-title='Laravel - The PHP Framework For Web Artisans'
                      >
                        <img
                          src='https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/laravel_logo.png'
                          className='img-fluid rounded-circle'
                        />
                      </a>
                    </div>
                  </div>
                  <div className='row justify-content-center'>
                    <div className='col-md-2 col-3 my-2'>
                      <a
                        href=' https://www.creative-tim.com/product/argon-dashboard-nodejs'
                        target='_blank'
                        data-toggle='tooltip'
                        data-original-title="Node.js - a JavaScript runtime built on Chrome's V8 JavaScript engine"
                      >
                        <img
                          src='https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/nodejs-logo.jpg'
                          className='img-fluid rounded-circle'
                        />
                      </a>
                    </div>
                    <div className='col-md-2 col-3 my-2'>
                      <a
                        href=' https://www.adobe.com/products/photoshop.html'
                        target='_blank'
                        data-toggle='tooltip'
                        data-original-title='[Coming Soon] Adobe Photoshop - Software for digital images manipulation'
                      >
                        <img
                          src='https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/ps.jpg'
                          className='img-fluid rounded-circle opacity-3'
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default LandingContent;

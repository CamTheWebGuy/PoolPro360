import React, { Fragment } from 'react';

const Footer = ({ cssClass }) => {
  return (
    <Fragment>
      <footer className={`py-5 ${cssClass}`} id='footer-main'>
        <div className='container'>
          <div className='row align-items-center justify-content-xl-between'>
            <div className='col-xl-5'>
              <div className='copyright text-center text-xl-left text-muted'>
                &copy; 2020 - 2021{' '}
                <a
                  href='https://www.creative-tim.com'
                  className='font-weight-bold ml-1'
                  target='_blank'
                >
                  PoolPro360
                </a>
              </div>
            </div>
            <div className='col-xl-7'>
              <ul className='nav nav-footer justify-content-center justify-content-xl-end'>
                <li className='nav-item'>
                  <a
                    href='https://www.creative-tim.com'
                    className='nav-link'
                    target='_blank'
                  >
                    Pools On Command
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    href='https://www.creative-tim.com/presentation'
                    className='nav-link'
                    target='_blank'
                  >
                    About Us
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    href='https://www.creative-tim.com/presentation'
                    className='nav-link'
                    target='_blank'
                  >
                    Video Guides
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    href='http://blog.creative-tim.com'
                    className='nav-link'
                    target='_blank'
                  >
                    Terms/Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;

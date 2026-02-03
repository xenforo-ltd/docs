import React, {type ReactNode} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import './styles.css';

// SVG Icons for the color mode toggle
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" fill="currentColor">
    <path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"/>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" fill="currentColor">
    <path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"/>
  </svg>
);

const SystemIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" fill="currentColor">
    <path d="M512 256c0-35.5-19.4-68.2-49.6-85.4 8.5-35.1-1.3-73.5-29.5-101.6-28.2-28.2-66.6-38-101.6-29.5C314.2 9.4 281.5-10 246-10c-35.5 0-68.2 19.4-85.4 49.6-35.1-8.5-73.5 1.3-101.6 29.5-28.2 28.2-38 66.6-29.5 101.6C-1.4 187.8-21 220.5-21 256c0 35.5 19.4 68.2 49.6 85.4-8.5 35.1 1.3 73.5 29.5 101.6 28.2 28.2 66.6 38 101.6 29.5 17.1 30.1 49.8 49.6 85.4 49.6s68.2-19.4 85.4-49.6c35.1 8.5 73.5-1.3 101.6-29.5 28.2-28.2 38-66.6 29.5-101.6 30.2-17.2 49.6-49.9 49.6-85.4zm-256 96c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"/>
  </svg>
);

function ColorModeToggle() {
  const {colorMode, setColorMode} = useColorMode();

  const modes = [
    { value: null, label: 'System', icon: <SystemIcon /> },
    { value: 'light', label: 'Light', icon: <SunIcon /> },
    { value: 'dark', label: 'Dark', icon: <MoonIcon /> },
  ];

  const cycleColorMode = () => {
    // Cycle through: system -> light -> dark -> system
    if (colorMode === 'light') {
      setColorMode('dark');
    } else if (colorMode === 'dark') {
      setColorMode('light');
    } else {
      setColorMode('light');
    }
  };

  const currentIcon = colorMode === 'dark' ? <MoonIcon /> : <SunIcon />;

  return (
    <button
      className="p-footer-colorMode"
      onClick={cycleColorMode}
      title={`Switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="p-footer-colorMode-icon">{currentIcon}</span>
    </button>
  );
}

function Footer(): ReactNode {
  return (
    <footer className="p-footer" id="footer">
      <div className="p-footer-inner">
        <div className="p-footer-row">
          <div className="p-footer-row-main">
            <ColorModeToggle />
          </div>
          <div className="p-footer-row-opposite">
            <ul className="p-footer-linkList">
              <li>
                <a href="https://xenforo.com/terms/">
                  Terms and rules
                </a>
              </li>
              <li>
                <a href="https://xenforo.com/privacy-policy/">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="https://xenforo.com/help/">
                  Help
                </a>
              </li>
              <li>
                <a href="https://xenforo.com/">
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-footer-copyright-container">
          <div className="p-footer-copyright">
            Community platform by XenForo<sup>&reg;</sup> &copy; 2010-{new Date().getFullYear()} XenForo Ltd.
          </div>
        </div>
      </div>
      <div className="p-footer-inner">
        <nav className="p-footer-block">
          <ul className="p-footer-blockColumns">
            <li className="p-footer-logoColumn">
              <div className="p-footer-logoContent">
                <div className="p-footer-logo">
                  <a href="https://xenforo.com/">
                    <img
                      src="/docs/img/logo.svg"
                      alt="XenForo"
                      width="200"
                    />
                  </a>
                </div>

                <div className="p-footer-buttons">
                  <a href="https://xenforo.com/purchase/" className="p-footer-button">
                    Buy XenForo
                  </a>
                  <a href="https://xenforo.com/demo/" className="p-footer-button">
                    Try a demo
                  </a>
                </div>

                <div className="p-footer-social">
                  <a href="https://x.com/xenforo/">
                    <span className="p-footer-social-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" />
                      </svg>
                    </span>{' '}
                    @XenForo
                  </a>
                  <a href="https://facebook.com/XenForo/">
                    <span className="p-footer-social-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
                      </svg>
                    </span>{' '}
                    XenForo
                  </a>
                </div>
              </div>
            </li>
            <li>
              <div className="p-footer-linkGroup">
                <div className="p-footer-linkGroup-header">Products</div>
                <ul>
                  <li><a href="https://xenforo.com/solutions/#xf">Forum</a></li>
                  <li><a href="https://xenforo.com/solutions/#xfmg">Media gallery</a></li>
                  <li><a href="https://xenforo.com/solutions/#xfrm">Resource manager</a></li>
                  <li><a href="https://xenforo.com/solutions/#xfes">Enhanced search</a></li>
                  <li><a href="https://xenforo.com/solutions/#migration">Importers</a></li>
                </ul>
              </div>
            </li>
            <li>
              <div className="p-footer-linkGroup">
                <div className="p-footer-linkGroup-header">Sales</div>
                <ul>
                  <li><a href="https://xenforo.com/features/">Features</a></li>
                  <li><a href="https://xenforo.com/purchase/">Buy XenForo</a></li>
                  <li><a href="https://xenforo.com/community/forums/xenforo-pre-sales-and-feedback.5/">Pre-sales questions</a></li>
                  <li><a href="https://xenforo.com/demo/">Admin demo</a></li>
                </ul>
              </div>
            </li>
            <li>
              <div className="p-footer-linkGroup">
                <div className="p-footer-linkGroup-header">Customers</div>
                <ul>
                  <li><a href="https://xenforo.com/customers/">Account area</a></li>
                  <li><a href="https://xenforo.com/customers/support/">Get support</a></li>
                  <li><a href="https://xenforo.com/community/">Community</a></li>
                  <li><a href="https://xenforo.com/customer-api/">License validation</a></li>
                  <li><a href="https://xenforo.com/license-agreement/">License agreement</a></li>
                  <li><a href="https://xenforo.com/cloud-service-agreement/">Cloud service agreement</a></li>
                </ul>
              </div>
            </li>
            <li>
              <div className="p-footer-linkGroup">
                <div className="p-footer-linkGroup-header">Help</div>
                <ul>
                  <li><a href="https://xenforo.com/docs/">Manual</a></li>
                  <li><a href="https://xenforo.com/docs/dev/">Developer docs</a></li>
                  <li><a href="https://xenforo.com/help/">Help</a></li>
                  <li><a href="https://xenforo.com/contact/">Contact us</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default React.memo(Footer);

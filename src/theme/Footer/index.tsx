import React, { type ReactNode } from "react";
import "./styles.css";

function Footer(): ReactNode {
  return (
    <footer className="p-footer" id="footer">
      <div className="p-footer-inner">
        <div className="p-footer-row">
          <div className="p-footer-row-opposite">
            <ul className="p-footer-linkList">
              <li>
                <a href="https://xenforo.com/terms/">Terms and rules</a>
              </li>
              <li>
                <a href="https://xenforo.com/privacy-policy/">Privacy policy</a>
              </li>
              <li>
                <a href="https://xenforo.com/help/">Help</a>
              </li>
              <li>
                <a href="https://xenforo.com/">Home</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-footer-copyright-container">
          <div className="p-footer-copyright">
            Community platform by XenForo<sup>&reg;</sup> &copy; 2010-
            {new Date().getFullYear()} XenForo Ltd.
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
                    <img src="/img/logo.svg" alt="XenForo" width="200" />
                  </a>
                </div>

                <div className="p-footer-buttons">
                  <a
                    href="https://xenforo.com/purchase/"
                    className="p-footer-button"
                  >
                    Buy XenForo
                  </a>
                  <a
                    href="https://xenforo.com/demo/"
                    className="p-footer-button"
                  >
                    Try a demo
                  </a>
                </div>

                <div className="p-footer-social">
                  <a href="https://x.com/xenforo/">
                    <span className="p-footer-social-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" />
                      </svg>
                    </span>{" "}
                    @XenForo
                  </a>
                  <a href="https://facebook.com/XenForo/">
                    <span className="p-footer-social-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
                      </svg>
                    </span>{" "}
                    XenForo
                  </a>
                </div>
              </div>
            </li>
            <li>
              <div className="p-footer-linkGroup">
                <div className="p-footer-linkGroup-header">Products</div>
                <ul>
                  <li>
                    <a href="https://xenforo.com/solutions/#xf">Forum</a>
                  </li>
                  <li>
                    <a href="https://xenforo.com/solutions/#xfmg">
                      Media gallery
                    </a>
                  </li>
                  <li>
                    <a href="https://xenforo.com/solutions/#xfrm">
                      Resource manager
                    </a>
                  </li>
                  <li>
                    <a href="https://xenforo.com/solutions/#xfes">
                      Enhanced search
                    </a>
                  </li>
                  <li>
                    <a href="https://xenforo.com/solutions/#migration">
                      Importers
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="p-footer-linkGroup">
                <div className="p-footer-linkGroup-header">Sales</div>
                <ul>
                  <li>
                    <a href="https://xenforo.com/features/">Features</a>
                  </li>
                  <li>
                    <a href="https://xenforo.com/purchase/">Buy XenForo</a>
                  </li>
                  <li>
                    <a href="https://xenforo.com/community/forums/xenforo-pre-sales-and-feedback.5/">
                      Pre-sales questions
                    </a>
                  </li>
                  <li>
                    <a href="https://xenforo.com/demo/">Admin demo</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="p-footer-linkGroup">
                <div className="p-footer-linkGroup-header">Customers</div>
                <ul>
                  <li>
                    <a href="https://xenforo.com/customers/">Account area</a>
                  </li>
                  <li>
                    <a href="https://xenforo.com/customers/support/">
                      Get support
                    </a>
                  </li>
                  <li>
                    <a href="https://xenforo.com/community/">Community</a>
                  </li>
                  <li>
                    <a href="https://xenforo.com/customer-api/">
                      License validation
                    </a>
                  </li>
                  <li>
                    <a href="https://xenforo.com/license-agreement/">
                      License agreement
                    </a>
                  </li>
                  <li>
                    <a href="https://xenforo.com/cloud-service-agreement/">
                      Cloud service agreement
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="p-footer-linkGroup">
                <div className="p-footer-linkGroup-header">Help</div>
                <ul>
                  <li>
                    <a href="https://xenforo.com/docs/">Manual</a>
                  </li>
                  <li>
                    <a href="https://xenforo.com/docs/dev/">Developer docs</a>
                  </li>
                  <li>
                    <a href="https://xenforo.com/help/">Help</a>
                  </li>
                  <li>
                    <a href="https://xenforo.com/contact/">Contact us</a>
                  </li>
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

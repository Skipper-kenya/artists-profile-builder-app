import React from "react";
import "./footer.css";

import {
  GithubLogo,
  PhoneCall,
  TwitterLogo,
  LinkedinLogo,
  Envelope,
  Copyright,
} from "phosphor-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="top-footer">
        <Link to="https://github.com/Skipper-kenya" target="_blank">
          <GithubLogo size={30} />
        </Link>
        <Link to="mailTo:kimwetichandrew@gmail.com" target="_blank">
          <Envelope size={30} />
        </Link>
        <Link
          to="https://www.linkedin.com/in/andrew-kimwetich-84070a263/"
          target="_blank"
        >
          <LinkedinLogo size={30} />
        </Link>
        <Link to="https://twitter.com/Skipper_Ke" target="_blank">
          <TwitterLogo size={30} />
        </Link>
        <Link to="tel:254702526377" target="_blank">
          <PhoneCall size={30} />
        </Link>
      </div>
      <div className="bottom-footer">
        <h3>
          <Copyright />
          2023. rastaTech. All rights reserved.
        </h3>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import "./Footer.css";

const Footer: React.FC<{}> = () => {
  return (
    <div className="footer-div">
      <p className="copyright-text">
        Copyright © 2021
        <p>
          Designed with <i className="fa fa-heart"></i> by Anubhav
        </p>
      </p>
    </div>
  );
};

export default Footer;

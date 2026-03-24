import React from "react";
import { Link } from "react-router-dom";
import footerBg from "../assets/img/footer-top-bg.8913087d9f9dab0e4d73.png";
import logo from "../assets/img/gamelogo.png";

const Footer = () => {
  return (
    <footer className="footer text-white py-5" style={{ background: "black" }}>
      <div className="container">
        <div className="row gy-4">
          {/* Logo & Contact */}
          <div className="col-md-2 d-flex align-items-center">
            <img src={logo} height={50} />
          </div>

          {/* Categories */}
          <div className="col-md-3">
            <h5 className="text-neon">Legal</h5>
            <ul className="list-unstyled mt-3">
              <li>
                <Link to="/about-us" className="footer-link">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="footer-link">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="footer-link">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="col-md-3">
            <h5 className="text-neon">Categories</h5>
            <ul className="list-unstyled mt-3">
              <li>
                <Link to="category/action" className="footer-link">
                  Action
                </Link>
              </li>
              <li>
                <Link to="category/open-world" className="footer-link">
                  Open world
                </Link>
              </li>
              <li>
                <Link to="/category/role-playing-games" className="footer-link">
                  Role Playing games
                </Link>
              </li>
              <li>
                <Link to="category/sports" className="footer-link">
                  Sports
                </Link>
              </li>
              <li>
                <Link to="category/shooting" className="footer-link">
                  Shooting
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="text-neon">Contact us</h5>
            <ul className="list-unstyled mt-3">
              <li>
                <i className="fas fa-envelope me-2 text-danger"></i>
                support@cheappcgames.in
              </li>
            </ul>
          </div>
          <div className="col-md-1">
            <img
              src={footerBg}
              alt="game-character"
              className="footer-character"
              style={{ maxHeight: "200px" }}
            />
          </div>
        </div>

        <hr className="bg-danger mt-4" />

        {/* Bottom Bar */}
        <div
          className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3"
          style={{ fontFamily: "Orbitron" }}
        >
          <p className="m-0 text-secondary">
            Copyright © 2025 | Cheap PC Games.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

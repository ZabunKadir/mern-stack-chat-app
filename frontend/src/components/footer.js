import React from "react";
import "../styles/components/footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
const Footer = (props) => {
  const year = new Date().getFullYear();
  return (
    <div className="footer container">
      <div className="footer-top">
        <div className="app-info">
          <label>Chat App</label>
          <article>
            Chat App, is a web-based chat application with a focus on speed and
            fun.
          </article>
        </div>

        <div className="about">
          <label>About</label>

          <a href="Blog">Blog</a>

          <a href="Developer">Developer</a>

          <a href="Contact">Contact</a>
        </div>

        <div className="social-medias">
          <div>
            <label>Social Medias</label>
          </div>
          <div>
            <a href="">
              <FontAwesomeIcon
                className="fa-social-medias-icon"
                icon={faInstagram}
              ></FontAwesomeIcon>
            </a>
            <a href="">
              <FontAwesomeIcon
                className="fa-social-medias-icon"
                icon={faTwitter}
              ></FontAwesomeIcon>
            </a>
            <a href="">
              <FontAwesomeIcon
                className="fa-social-medias-icon"
                icon={faFacebook}
              ></FontAwesomeIcon>
            </a>
            <a href="">
              <FontAwesomeIcon
                className="fa-social-medias-icon"
                icon={faLinkedin}
              ></FontAwesomeIcon>
            </a>
          </div>
        </div>
      </div>
      <div className="copyright">
        <label>© {year} Copyright: ChatApp.net</label>
      </div>
    </div>
  );
};
export default Footer;

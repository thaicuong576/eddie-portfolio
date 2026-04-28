import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
} from "react-icons/ai";
import xLogo from "../Assets/x-logo.svg";
import { FaLinkedinIn } from "react-icons/fa";
import { identity } from "../data/identity";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Designed and Developed by {identity.basics.name}</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright &copy; {year} EP</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href={identity.socials.github}
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href={identity.socials.twitter}
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={xLogo} alt="X" style={{ width: "16px", height: "16px", filter: "invert(1)" }} />
              </a>
            </li>
            <li className="social-icons">
              <a
                href={identity.socials.linkedin}
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;

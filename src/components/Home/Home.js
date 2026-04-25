import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Globe3D from "../Globe3D";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import About from "../About/About";
import Projects from "../Projects/Projects";
import ResumeNew from "../Resume/ResumeNew";
import {
  AiFillGithub,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

import { identity } from "../../data/identity";

import xLogo from "../../Assets/x-logo.svg";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> {identity.basics.name.toUpperCase()}</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type tagline={identity.basics.tagline} />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <Globe3D />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
      <About isHome={true} />
      <Projects isHome={true} />
      <ResumeNew isHome={true} />

      <Container>
        <Row style={{ paddingTop: "50px", paddingBottom: "80px" }}>
          <Col md={12} className="home-about-social">
            <h1>Find Me On</h1>
            <p>
              Feel free to <span className="blue">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href={identity.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href={identity.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <img src={xLogo} alt="X" style={{ width: "24px", height: "24px", filter: "invert(1)" }} />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href={identity.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
            <p style={{ marginTop: "20px" }}>
              ...or email me directly at <a href="mailto:cuongphungthai1@gmail.com" className="blue" style={{ textDecoration: "none" }}>cuongphungthai1@gmail.com</a>
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Home;

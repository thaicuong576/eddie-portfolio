import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I'm a Fintech Researcher who loves turning emerging technology
              into real, practical solutions. Over time, I've explored several
              domains and found my passion at the intersection of finance,
              blockchain, and intelligent automation.
              <br />
              <br />
              I'm experienced in
              <i>
                <b className="purple">
                  {" "}
                  n8n Automation, Python, Node.js, and API Integration{" "}
                </b>
              </i>
              — and I enjoy building workflows that save teams hours of manual work.
              <br />
              <br />
              My key areas of interest include
              <i>
                <b className="purple">
                  {" "}
                  Fintech Research, Crypto Analysis, DeFi,{" "}
                </b>
              </i>
              and building AI-powered automation pipelines with{" "}
              <b className="purple">n8n</b>.
              <br />
              <br />
              I've published <b className="purple">8 research papers</b>,
              written <b className="purple">150+ crypto articles</b>, and built{" "}
              <b className="purple">42 production workflows</b> that automate
              real business processes.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;

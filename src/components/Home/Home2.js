import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/eddie-cutout.png";
import { identity } from "../../data/identity";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              THE <span className="blue"> FOUNDER-BUILDER </span> ESSENCE
            </h1>
            <p className="home-about-body">
              {identity.basics.unfair_advantage}
              <br />
              <br />
              I'm a Fintech Researcher at <span className="blue">{identity.personal.university}</span> who loves turning emerging technology
              into real, practical solutions. 
              <br />
              <br />
              Currently, I'm scaling <i><b className="blue"> {identity.startups[0].name} </b></i> and <i><b className="blue"> {identity.startups[1].name} </b></i>, 
              leveraging AI automation to redefine how brands communicate.
              <br />
              <br />
              My key areas of interest include
              <i>
                <b className="blue">
                  {" "}
                  Fintech Research, AI Agents, and Crypto Tokenomics.{" "}
                </b>
              </i>
              <br />
              <br />
              Whether it's closing VC deals, winning academic prizes, or building 24/7 AI agents, 
              I am obsessed with <b className="blue">efficiency</b> and the <b className="blue">speed to result</b>.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <div className="avatar-wrapper">
              <div className="avatar-dots avatar-dots-top"></div>
              <div className="avatar-border">
                <img src={myImg} className="img-fluid avatar-img" alt="avatar" />
              </div>
              <div className="avatar-dots avatar-dots-bottom"></div>
              <div className="avatar-status">
                <span className="avatar-status-dot"></span>
                Currently working on <b>Fintech & AI</b>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;

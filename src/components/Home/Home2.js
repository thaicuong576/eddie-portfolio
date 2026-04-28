import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/eddie-cutout.png";
import { identity } from "../../data/identity";

function Home2() {
  const highlightText = (text) => {
    // List of high-impact keywords to highlight
    const keywords = [
      "Fintech student",
      "UEH",
      "automation",
      "manual workflows",
      "systems",
      "faster, more consistent, and easier to scale",
      "Currently",
      "autonomous media production lines",
      "agentic project management systems",
      "econometric logic",
      "self-operating business infrastructure",
      "multiple early-stage Web3 Startups",
      "U2U Network, Boom Max, Gam3, JustFAB",
      "efficiency and speed",
      "building systems that actually solve them"
    ];

    // Create a combined regex for all keywords
    const regex = new RegExp(`(${keywords.join("|")})`, "gi");
    
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? 
      <span key={i} className="blue" style={{ fontWeight: "600" }}>{part}</span> : part
    );
  };

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              THE <span className="blue"> BUILDER MINDSET </span>
            </h1>
            <div className="home-about-body">
              {identity.basics.builder_mindset.intro.map((p, i) => (
                <p key={i}>{highlightText(p)}</p>
              ))}
              <p>{highlightText(identity.basics.builder_mindset.current)}</p>
              <b className="blue">I’m especially interested in:</b>
              <ul className="home-about-list">
                {identity.basics.builder_mindset.interests.map((interest, i) => (
                  <li key={i}>{interest}</li>
                ))}
              </ul>
              <p>{highlightText(identity.basics.builder_mindset.closing)}</p>
            </div>
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

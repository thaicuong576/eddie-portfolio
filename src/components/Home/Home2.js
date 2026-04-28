import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/eddie-cutout.png";
import { identity } from "../../data/identity";

function Home2() {
  const highlightText = (text) => {
    const headerTrigger = "I’m especially interested in:";
    
    const exclusions = [
      "Currently",
      "econometric logic with self-operating business infrastructure.",
      "(U2U Network, Boom Max, Gam3, JustFAB, ...)"
    ];

    const keywords = [
      "Fintech student",
      "UEH",
      "automation",
      "manual workflows",
      "systems",
      "faster, more consistent, and easier to scale",
      "autonomous media production lines",
      "agentic project management systems",
      "multiple early-stage Web3 Startups",
      "efficiency and speed",
      "building systems that actually solve them"
    ];

    if (text === headerTrigger) {
      return <b className="blue">{text}</b>;
    }

    // Function to escape regex characters
    const escapeRegExp = (string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    // Filter out keywords that are in the exclusions list and escape them
    const activeKeywords = keywords
      .filter(k => !exclusions.some(e => e.includes(k) || k.includes(e)))
      .map(escapeRegExp);
    
    if (activeKeywords.length === 0) return text;

    const regex = new RegExp(`(${activeKeywords.join("|")})`, "gi");
    const parts = text.split(regex);
    
    return parts.map((part, i) => {
      if (regex.test(part)) {
        // Double check it's not inside an exclusion phrase in the original text
        const isExcluded = exclusions.some(e => e.includes(part));
        if (!isExcluded) {
          return <span key={i} className="blue">{part}</span>;
        }
      }
      return part;
    });
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

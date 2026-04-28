import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";

import Toolstack from "./Toolstack";
import { identity } from "../../data/identity";

function About({ isHome }) {
  const formatAchievement = (text) => {
    // Regex to find numbers, dollar amounts, and metrics like 1.3M+, 2,500+, 5 hours, 1 hour
    const parts = text.split(/(\$?\d+(?:,\d{3})*(?:\.\d+)?(?:M\+|K\+|h|\s?hours?|\s?hour)?)/g);
    return parts.map((part, i) => 
      /(\$?\d+(?:,\d{3})*(?:\.\d+)?(?:M\+|K\+|h|\s?hours?|\s?hour)?)/.test(part) ? 
      <strong key={i} className="blue" style={{ fontWeight: "700", fontSize: "1.1em" }}>{part}</strong> : part
    );
  };

  return (
    <>
      {!isHome && <Particle />}
      <Container fluid className="about-section">
        <Container>
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col
              md={6}
              style={{ paddingTop: "30px", paddingBottom: "50px", display: "flex", flexDirection: "column" }}
              className="about-img"
            >
              <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                WHAT <strong className="blue">I BRING</strong>
              </h1>
              <Card className="quote-card-view" style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px" }}>
                  <ul className="home-about-list" style={{ margin: 0, flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    {identity.basics.builder_mindset.achievements.map((achievement, index) => (
                      <li key={index} className="about-activity" style={{ fontSize: "1.1em", paddingBottom: "30px", lineHeight: "1.6" }}>
                        {formatAchievement(achievement)}
                      </li>
                    ))}
                  </ul>
                  <div style={{ 
                    marginTop: "10px", 
                    padding: "25px 20px", 
                    background: "rgba(56, 189, 248, 0.08)", 
                    borderRadius: "15px", 
                    borderLeft: "5px solid var(--accent-blue)",
                    fontSize: "1.05em",
                    color: "var(--text-secondary)",
                    fontStyle: "italic",
                    lineHeight: "1.7",
                    fontWeight: "500",
                    textAlign: "center"
                  }}>
                    Combining technical automation with strategic business execution to drive measurable results.
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col
              md={6}
              style={{
                justifyContent: "center",
                paddingTop: "30px",
                paddingBottom: "50px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                HOW <strong className="blue">I WORK</strong>
              </h1>
              <Aboutcard />
            </Col>
          </Row>
          <h1 className="project-heading" style={{ paddingBottom: "40px" }}>
            Core <strong className="blue">Specializations </strong>
          </h1>

          <Techstack />

          <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
            <strong className="blue">Tools</strong> I use
          </h1>
          <Toolstack />

          <Github />
        </Container>
      </Container>
    </>
  );
}

export default About;

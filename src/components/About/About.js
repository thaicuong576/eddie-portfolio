import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";

import Toolstack from "./Toolstack";
import { identity } from "../../data/identity";

function About({ isHome }) {
  return (
    <>
      {!isHome && <Particle />}
      <Container fluid className="about-section">
        <Container>
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col
              md={7}
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
            <Col
              md={5}
              style={{ paddingTop: "30px", paddingBottom: "50px", display: "flex", flexDirection: "column" }}
              className="about-img"
            >
              <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                WHAT <strong className="blue">I BRING</strong>
              </h1>
              <Card className="quote-card-view" style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <ul className="home-about-list" style={{ margin: 0 }}>
                    {identity.basics.builder_mindset.achievements.map((achievement, index) => (
                      <li key={index} className="about-activity" style={{ fontSize: "1.1em", paddingBottom: "15px" }}>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                  <div style={{ 
                    marginTop: "20px", 
                    padding: "15px", 
                    background: "rgba(56, 189, 248, 0.04)", 
                    borderRadius: "8px", 
                    borderLeft: "4px solid var(--accent-blue)",
                    fontSize: "0.9em",
                    color: "var(--text-secondary)",
                    fontStyle: "italic"
                  }}>
                    Combining technical automation with strategic business execution to drive measurable results.
                  </div>
                </Card.Body>
              </Card>
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

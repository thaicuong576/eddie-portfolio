"use client";
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";

import Toolstack from "./Toolstack";

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
                Know Who <strong className="blue">I AM</strong>
              </h1>
              <Aboutcard />
            </Col>
            <Col
              md={5}
              style={{ paddingTop: "30px", paddingBottom: "50px", display: "flex", flexDirection: "column" }}
              className="about-img"
            >
              <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                The <strong className="blue">Formula</strong>
              </h1>
              <Card className="quote-card-view" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 0, height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", borderLeft: "3px solid var(--accent-blue)", background: "rgba(56, 189, 248, 0.04)", borderRadius: "0 8px 8px 0", padding: "10px 20px" }}>
                    <span className="blue" style={{ fontWeight: "700", minWidth: "90px", fontSize: "1.4em" }}>40%</span>
                    <span style={{ fontSize: "1.05em" }}>Hate for wasting time</span>
                  </div>
                  
                  <div style={{ display: "flex", justifyContent: "center", margin: "2px 0" }}>
                    <span className="blue" style={{ fontSize: "1.6em", fontWeight: "900", opacity: 0.8 }}>+</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", borderLeft: "3px solid var(--accent-blue)", background: "rgba(56, 189, 248, 0.04)", borderRadius: "0 8px 8px 0", padding: "10px 20px" }}>
                    <span className="blue" style={{ fontWeight: "700", minWidth: "90px", fontSize: "1.4em" }}>30%</span>
                    <span style={{ fontSize: "1.05em" }}>Love for winning</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", margin: "2px 0" }}>
                    <span className="blue" style={{ fontSize: "1.6em", fontWeight: "900", opacity: 0.8 }}>+</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", borderLeft: "3px solid var(--accent-blue)", background: "rgba(56, 189, 248, 0.04)", borderRadius: "0 8px 8px 0", padding: "10px 20px" }}>
                    <span className="blue" style={{ fontWeight: "700", minWidth: "90px", fontSize: "1.4em" }}>20%</span>
                    <span style={{ fontSize: "1.05em" }}>Fun and discovery</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", margin: "2px 0" }}>
                    <span className="blue" style={{ fontSize: "1.6em", fontWeight: "900", opacity: 0.8 }}>+</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", borderLeft: "3px solid var(--accent-blue)", background: "rgba(56, 189, 248, 0.04)", borderRadius: "0 8px 8px 0", padding: "10px 20px" }}>
                    <span className="blue" style={{ fontWeight: "700", minWidth: "90px", fontSize: "1.4em" }}>10%</span>
                    <span style={{ fontSize: "1.05em" }}>Do it now</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 2px 0" }}>
                    <span className="blue" style={{ fontSize: "2.2em", fontWeight: "900", opacity: 0.9 }}>=</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(56, 189, 248, 0.15)", borderRadius: "8px", borderBottom: "3px solid var(--accent-blue)", padding: "12px 20px" }}>
                    <strong className="blue" style={{ fontSize: "2em", letterSpacing: "2px", textTransform: "uppercase" }}>Eddie</strong>
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

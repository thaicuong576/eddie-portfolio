import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";

import Toolstack from "./Toolstack";
import { identity } from "../../data/identity";
import { FiTarget, FiZap, FiTrendingUp, FiAward, FiLayers } from "react-icons/fi";

function About({ isHome }) {
  const getIcon = (index) => {
    const icons = [
      <FiLayers style={{ color: "var(--accent-blue)" }} />,
      <FiTarget style={{ color: "var(--accent-blue)" }} />,
      <FiTrendingUp style={{ color: "var(--accent-blue)" }} />,
      <FiZap style={{ color: "var(--accent-blue)" }} />,
      <FiAward style={{ color: "var(--accent-blue)" }} />
    ];
    return icons[index % icons.length];
  };

  const formatAchievement = (text) => {
    // Regex to find numbers, dollar amounts, and metrics
    const parts = text.split(/(\$?\d+(?:,\d{3})*(?:\.\d+)?(?:M\+|K\+|h|\s?hours?|\s?hour)?)/g);
    return parts.map((part, i) => 
      /(\$?\d+(?:,\d{3})*(?:\.\d+)?(?:M\+|K\+|h|\s?hours?|\s?hour)?)/.test(part) ? 
      <strong key={i} className="blue" style={{ fontWeight: "800", fontSize: "1.15em", color: "var(--accent-yellow)" }}>{part}</strong> : part
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
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
                {identity.basics.builder_mindset.achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className="achievement-card"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(56, 189, 248, 0.15)",
                      borderRadius: "12px",
                      padding: "18px 22px",
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      transition: "all 0.3s ease",
                      position: "relative",
                      overflow: "hidden"
                    }}
                  >
                    <div className="achievement-icon" style={{ 
                      fontSize: "1.6em", 
                      background: "rgba(56, 189, 248, 0.1)", 
                      padding: "12px", 
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      {getIcon(index)}
                    </div>
                    <div style={{ fontSize: "1.1em", lineHeight: "1.5", color: "var(--text-secondary)" }}>
                      {formatAchievement(achievement)}
                    </div>
                    <div style={{ 
                      position: "absolute", 
                      left: 0, 
                      top: 0, 
                      height: "100%", 
                      width: "4px", 
                      background: "var(--accent-blue)",
                      opacity: 0.6
                    }}></div>
                  </div>
                ))}
                
                <div style={{ 
                  marginTop: "10px", 
                  padding: "20px", 
                  background: "rgba(56, 189, 248, 0.05)", 
                  borderRadius: "15px", 
                  border: "1px dashed rgba(56, 189, 248, 0.3)",
                  fontSize: "1.05em",
                  color: "var(--text-secondary)",
                  fontStyle: "italic",
                  lineHeight: "1.6",
                  fontWeight: "500",
                  textAlign: "center"
                }}>
                  Combining technical automation with strategic business execution to drive measurable results.
                </div>
              </div>
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

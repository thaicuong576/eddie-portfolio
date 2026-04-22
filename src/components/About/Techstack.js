import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Techstack() {
  const skills = [
    {
      id: "system-design",
      title: "I. System Design",
      emoji: "⛓️",
      abstraction: "Building autonomous logic that replaces manual labor at scale."
    },
    {
      id: "fintech",
      title: "II. Fintech Builder",
      emoji: "📉",
      abstraction: "Merging academic-grade econometric research with raw market execution."
    },
    {
      id: "startup-growth",
      title: "III. Startup Growth & Ops",
      emoji: "🚀",
      abstraction: "Zero-to-one business development through partnership negotiation and data-led GTM."
    },
    {
      id: "creative-tech",
      title: "IV. Creative Tech",
      emoji: "🎨",
      abstraction: "High-fidelity visual authority and 'Generative Identity' orchestrations."
    }
  ];

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {skills.map((skill) => (
        <Col key={skill.id} md={6} lg={3} className="specialization-col">
          <Link to={`/skill/${skill.id}`} className="specialization-link">
            <div className="specialization-card">
              <div className="specialization-icon">{skill.emoji}</div>
              <h3 className="specialization-title">{skill.title}</h3>
              <p className="specialization-abstraction">{skill.abstraction}</p>
              <div className="specialization-footer">
                <span>Deep Dive</span>
                <span className="arrow">→</span>
              </div>
            </div>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default Techstack;

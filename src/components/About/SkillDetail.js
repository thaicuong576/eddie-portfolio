import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import { useParams, Link, Navigate } from "react-router-dom";

const SKILL_DATA = {
  "system-design": {
    title: "System Design",
    emoji: "⛓️",
    abstraction: "Building autonomous logic that replaces manual labor at scale.",
    evidence: [
      "Agentic n8n planning with JSON-batching for high-performance data processing.",
      "Complex API orchestration linking NocoDB, Vercel, and external services.",
      "Automated scraper infrastructure for data harvesting (Google Maps, Telegram)."
    ],
    value: "You don't just build scripts; you build Production-Grade Automations that scale output without scaling headcount."
  },
  "fintech": {
    title: "Fintech Builder",
    emoji: "📉",
    abstraction: "Merging academic-grade econometric research with raw market execution.",
    evidence: [
      "Quantitative Econometrics using Panel Data Regression for predictive modeling.",
      "Deep Tokenomics Analysis and valuation frameworks for crypto assets.",
      "UEH-Awarded Fintech Research focused on structural market signals."
    ],
    value: "You translate complex structural market signals into Defensible Investment/Business Theses."
  },
  "startup-growth": {
    title: "Startup Growth & Ops",
    emoji: "🚀",
    abstraction: "Zero-to-one business development through partnership negotiation and data-led GTM.",
    evidence: [
      "Solo-closing $5K–$10K VC/MM deals through strategic relationship management.",
      "GTM frameworking for niche startups (Bep Ink) using data-led growth loops.",
      "Lead-Gen Scoring systems to optimize sales conversion pipelines."
    ],
    value: "You close the gap between 'Technical Product' and 'Real-World Revenue'."
  },
  "creative-tech": {
    title: "Creative Tech",
    emoji: "🎨",
    abstraction: "High-fidelity visual authority and 'Generative Identity' orchestrations.",
    evidence: [
      "Programmatic Motion Graphics using GSAP and HyperFrames for cinematic UI.",
      "Virtual KOL Persona Design (Dương Quá) integrating AI and storytelling.",
      "AI-UGC Production pipelines for automated social media authority building."
    ],
    value: "You engineer Digital Authority that stops the scroll and builds trust through high-production content."
  }
};

function SkillDetail() {
  const { id } = useParams();
  const skill = SKILL_DATA[id];

  if (!skill) return <Navigate to="/about" />;

  return (
    <section>
      <Particle />
      <Container fluid className="about-section">
        <Container>
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col md={12} className="skill-detail-header">
              <Link to="/about" className="back-link">
                ← Back to Specializations
              </Link>
              <div className="skill-detail-title-block">
                <span className="skill-detail-emoji">{skill.emoji}</span>
                <h1 className="project-heading">
                  {skill.title.split(' ')[0]} <strong className="purple">{skill.title.split(' ').slice(1).join(' ')}</strong>
                </h1>
              </div>
            </Col>
          </Row>

          <Row className="skill-detail-content">
            <Col md={12}>
              <div className="abstraction-box">
                <p>{skill.abstraction}</p>
              </div>
            </Col>
            
            <Col md={7}>
              <h2 className="skill-sub-heading">Core <strong className="purple">Evidence</strong></h2>
              <ul className="evidence-list">
                {skill.evidence.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Col>

            <Col md={5}>
              <div className="value-proposition-card">
                <h3 className="purple">The Value</h3>
                <p>{skill.value}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default SkillDetail;

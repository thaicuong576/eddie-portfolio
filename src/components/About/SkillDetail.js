import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import { useParams, Link, Navigate } from "react-router-dom";

import { identity } from "../../data/identity";

function SkillDetail() {
  const { id } = useParams();
  const skill = identity.specializations.find(s => s.id === id);

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
                  {skill.title.split(' ')[0]} <strong className="blue">{skill.title.split(' ').slice(1).join(' ')}</strong>
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
              <h2 className="skill-sub-heading">Core <strong className="blue">Evidence</strong></h2>
              <ul className="evidence-list">
                {skill.evidence.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Col>

            <Col md={5}>
              <div className="value-proposition-card">
                <h3 className="blue">The Value</h3>
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

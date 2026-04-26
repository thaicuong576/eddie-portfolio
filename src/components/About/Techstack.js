import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { identity } from "../../data/identity";

function Techstack() {
  const skills = identity.specializations;

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {skills.map((skill) => (
        <Col key={skill.id} md={6} lg={3} className="specialization-col">
          <Link to={`/skill/${skill.id}`} className="specialization-link">
            <div className="specialization-card">
              <div className="specialization-icon">{skill.emoji}</div>
              <h3 className="specialization-title">{skill.title}</h3>
              <p className="specialization-abstraction">{skill.summary}</p>
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

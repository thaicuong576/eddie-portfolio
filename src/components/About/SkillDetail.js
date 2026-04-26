import React, { useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Particle from "../Particle";
import { identity } from "../../data/identity";
import { getExperienceBySpec, getExperienceImage } from "../../utils/identityUtils";
import ProjectCard from "../Projects/ProjectCards";

function SkillDetail() {
  const { id: skillId } = useParams();
  
  const skill = useMemo(() => {
    return identity.specializations.find(s => s.id === skillId);
  }, [skillId]);

  const relatedWork = useMemo(() => {
    return getExperienceBySpec(skillId);
  }, [skillId]);

  if (!skill) {
    return (
      <Container className="skill-detail-page mt-5 pt-5 text-center">
        <h2 className="blue">Specialization Not Found</h2>
        <Link to="/about" className="btn btn-primary mt-3">Back to About</Link>
      </Container>
    );
  }

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
                <p>{skill.summary}</p>
              </div>
            </Col>
            
            <Col md={6}>
              <div className="detail-section">
                <h2 className="skill-sub-heading">What <strong className="blue">I Do</strong></h2>
                <ul className="evidence-list">
                  {skill.what_i_do.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h2 className="skill-sub-heading">Example <strong className="blue">Projects</strong></h2>
                <ul className="evidence-list">
                  {skill.example_projects.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </Col>

            <Col md={6}>
              <div className="value-proposition-card h-100">
                <h3 className="blue">Business Impact</h3>
                <ul className="impact-list">
                  {skill.business_impact.map((item, index) => (
                    <li key={index}>
                      <span className="impact-bullet">✔</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>

          {relatedWork.length > 0 && (
            <div className="related-work-section mt-5 pt-4">
              <h2 className="project-heading text-center mb-5">
                Related <strong className="blue">Work & Projects</strong>
              </h2>
              <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
                {relatedWork.map((item) => (
                  <Col md={4} className="project-card" key={item.id}>
                    <ProjectCard
                      id={item.id}
                      imgPath={getExperienceImage(item.id)}
                      imgPosition={item.imgPosition}
                      isBlog={false}
                      title={item.title}
                      description={item.description}
                      ghLink={item.link}
                      impact={item.impact}
                      stats={item.stats}
                      role={item.role}
                      tech={item.tech}
                      specializationIds={item.specializations}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Container>
      </Container>
    </section>
  );
}

export default SkillDetail;

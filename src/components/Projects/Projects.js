import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import bepInk from "../../Assets/Projects/bep_ink.png";
import research from "../../Assets/Projects/research.png";
import aiVideo from "../../Assets/Projects/ai_video.png";
import automation from "../../Assets/Projects/automation.png";
import { identity } from "../../data/identity";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few high-impact projects I've built or led recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bepInk}
              isBlog={false}
              title={identity.startups[1].name}
              description={identity.startups[1].description + " " + identity.startups[1].highlights[0]}
              demoLink={identity.startups[1].url}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={research}
              isBlog={false}
              title={identity.projects[0].title}
              description={identity.projects[0].description + " " + identity.projects[0].achievements}
              ghLink={identity.socials.github}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={aiVideo}
              isBlog={false}
              title={identity.projects[2].title}
              description={identity.projects[2].description + " " + identity.projects[2].achievements}
              ghLink={identity.socials.github}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={automation}
              isBlog={false}
              title={identity.projects[1].title}
              description={identity.projects[1].description + " " + identity.projects[1].achievements}
              ghLink={identity.socials.github}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;

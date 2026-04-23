import React, { useState } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import experienceData from "../../data/experience";

// Generic image placeholders (if unique ones aren't available)
import bepInk from "../../Assets/Projects/bep_ink.png";
import research from "../../Assets/Projects/research.png";
import aiVideo from "../../Assets/Projects/ai_video.png";
import automation from "../../Assets/Projects/automation.png";

function Projects() {
  const [filter, setFilter] = useState("all");

  const filteredData = filter === "all" 
    ? experienceData 
    : experienceData.filter(item => item.category === filter);

  const getImage = (id) => {
    if (id === "bep-ink") return bepInk;
    if (id === "attacker-2024" || id === "green-sm") return research;
    if (id === "nops-labs" || id === "ai-ugc") return aiVideo;
    return automation;
  };

  const categories = [
    { id: "all", label: "All" },
    { id: "founding", label: "Founding & Ops" },
    { id: "systems", label: "AI Systems" },
    { id: "research", label: "Research Eng" },
    { id: "growth", label: "Growth BD" },
  ];

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Career <strong className="purple">Experience </strong>
        </h1>
        <p style={{ color: "white" }}>
          A high-stakes roadmap of founding ventures, AI orchestration, and quantitative research.
        </p>

        <div className="experience-filter-wrapper">
          <ButtonGroup className="experience-filters">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                className={`filter-btn ${filter === cat.id ? "active" : ""}`}
                onClick={() => setFilter(cat.id)}
              >
                {cat.label}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {filteredData.map((item) => (
            <Col md={4} className="project-card" key={item.id}>
              <ProjectCard
                imgPath={getImage(item.id)}
                isBlog={false}
                title={item.title}
                description={item.description}
                ghLink={item.link} // Reusing ghLink as card link
                impact={item.impact}
                stats={item.stats}
                role={item.role}
                tech={item.tech}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;

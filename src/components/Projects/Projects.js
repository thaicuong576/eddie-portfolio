import React, { useState } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import { identity } from "../../data/identity";

// Generic image placeholders (if unique ones aren't available)
import bepInk from "../../Assets/Projects/bep-ink.png";
import research from "../../Assets/Projects/research.png";
import nopsLabs from "../../Assets/Projects/nopslabs.png";
import automation from "../../Assets/Projects/automation.png";
import attacker from "../../Assets/Projects/attacker.jpg";
import gam3 from "../../Assets/Projects/gam3.png";
import gfi from "../../Assets/Projects/gfi-duong-qua.png";
import greenSM from "../../Assets/Projects/green-sm.png";
import justfab from "../../Assets/Projects/justfab.jpg";
import u2u from "../../Assets/Projects/u2u.jpeg";
import xToThread from "../../Assets/Projects/x-to-thread.png";
import nnct from "../../Assets/Projects/nnct-2025.png";
import pmAgent from "../../Assets/Projects/pm-agent.png";
import bepScraper from "../../Assets/Projects/bep-ink-ggmap-scraper.png";
import contentBot from "../../Assets/Projects/eddie-content-bot.png";
import justfactor from "../../Assets/Projects/justfactor.png";

function Projects({ isHome }) {
  const [filter, setFilter] = useState("all");

  const experienceData = identity.experience;

  const filteredData = filter === "all" 
    ? experienceData 
    : experienceData.filter(item => item.category === filter);

  const getImage = (id) => {
    if (id === "bep-ink") return bepInk;
    if (id === "attacker-2024") return attacker;
    if (id === "green-sm") return greenSM;
    if (id === "nops-labs" || id === "ai-ugc") return nopsLabs;
    if (id === "gfi") return gfi;
    if (id === "gam3") return gam3;
    if (id === "u2u") return u2u;
    if (id === "justfab") return justfab;
    if (id === "x-threads") return xToThread;
    if (id === "rd-proximity") return nnct;
    if (id === "pm-agent") return pmAgent;
    if (id === "lead-gen-scraper") return bepScraper;
    if (id === "content-bot") return contentBot;
    if (id === "justfactor") return justfactor;
    return automation;
  };

  const categories = [
    { id: "all", label: "All" },
    { id: "work", label: "Work" },
    { id: "projects", label: "Projects" },
    { id: "academy", label: "Academy" },
  ];

  return (
    <Container fluid className="project-section">
      {!isHome && <Particle />}
      <Container>
        <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
          Career <strong className="blue">Experience </strong>
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

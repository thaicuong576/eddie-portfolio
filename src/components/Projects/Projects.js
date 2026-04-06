import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import chatify from "../../Assets/Projects/chatify.png";
import bitsOfCode from "../../Assets/Projects/blog.png";
import editor from "../../Assets/Projects/codeEditor.png";
import leaf from "../../Assets/Projects/leaf.png";
import suicide from "../../Assets/Projects/suicide.png";
import emotion from "../../Assets/Projects/emotion.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="F&B Lead Scraper"
              description="Automated n8n workflow that scrapes Google Maps for F&B business leads in Vietnam, extracts contact info, and exports to Google Sheets. Built with HTTP Request nodes, data transformation, and schedule triggers for daily runs."
              ghLink="#"
              demoLink="#"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Crypto Market Intelligence"
              description="AI-powered n8n pipeline that monitors crypto prices, analyzes sentiment from Twitter/Reddit, generates daily reports using GPT, and delivers insights via Telegram bot. Processes 1000+ data points daily."
              ghLink="#"
              demoLink="#"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Digital Banking Research"
              description="Published research on the architectural evolution of digital banking systems in Southeast Asia. Covers financial inclusion strategies, RegTech frameworks, and the bridge between legacy infrastructure and modern fintech solutions."
              ghLink="#"
              demoLink="#"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="AI Content Pipeline"
              description="End-to-end automation workflow using n8n + OpenAI that generates, edits, and publishes crypto articles. Includes research aggregation, outline generation, draft writing, SEO optimization, and multi-platform publishing."
              ghLink="#"
              demoLink="#"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="DeFi Protocol Tracker"
              description="Automated monitoring system for DeFi protocols. Tracks TVL changes, yield opportunities, and governance proposals across multiple chains. Sends real-time alerts when significant changes are detected."
              ghLink="#"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="Fintech Payment Flow Analyzer"
              description="Research project analyzing global payment system architectures. Mapped transaction flows across 15+ payment providers in SEA, identifying optimization points and regulatory compliance gaps."
              ghLink="#"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;

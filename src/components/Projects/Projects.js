import React, { useState, useMemo } from "react";
import { Container, Row, Col, Button, ButtonGroup, Form, InputGroup } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import { identity } from "../../data/identity";
import { FaSearch } from "react-icons/fa";
import { getExperienceImage, getCertificateImage } from "../../utils/identityUtils";

function Projects({ isHome }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const experienceData = identity.experience;

  const filteredData = useMemo(() => {
    let data = filter === "all"
      ? experienceData
      : experienceData.filter(item => item.category === filter);

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      data = data.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.tech?.some(t => t.toLowerCase().includes(searchLower)) ||
        item.role.toLowerCase().includes(searchLower)
      );
    }

    return data;
  }, [filter, search, experienceData]);

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

        {isHome && (
          <div className="experience-search-wrapper">
            <InputGroup className="experience-search">
              <InputGroup.Text className="search-icon">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search experiences..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </InputGroup>
          </div>
        )}

        <div className={isHome ? "experience-scroll-frame" : ""}>
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
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
              ))
            ) : (
              <Col md={12} className="text-center" style={{ color: "var(--text-secondary)", padding: "40px 0" }}>
                No experiences found matching your search.
              </Col>
            )}
          </Row>
        </div>

        {isHome && (
          <>
            <h1 className="project-heading" style={{ marginTop: "80px", paddingBottom: "20px" }}>
              Professional <strong className="blue">Certifications </strong>
            </h1>
            <p style={{ color: "white" }}>
              Academic validation of technical skills from global institutions.
            </p>
            <div className="experience-scroll-frame">
              <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
                {identity.certificates.map((cert) => (
                  <Col md={4} className="project-card" key={cert.id}>
                    <ProjectCard
                      id={cert.id}
                      imgPath={getCertificateImage(cert.img_key)}
                      isBlog={false}
                      title={cert.title}
                      description={cert.description}
                      ghLink={cert.link}
                      role={cert.issuer}
                      date={cert.date}
                      isCertificate={true}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </>
        )}
      </Container>
    </Container>
  );
}

export default Projects;

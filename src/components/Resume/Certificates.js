import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import { identity } from "../../data/identity";
import { getCertificateImage } from "../../utils/identityUtils";
import ProjectCard from "../Projects/ProjectCards";

function Certificates() {
  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Container>
          <h2 className="project-heading" style={{ textAlign: "center", marginBottom: "50px", paddingTop: "50px" }}>
            Professional <strong className="blue">Certifications</strong>
          </h2>
          <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            {identity.certificates.map((cert) => (
              <Col md={4} className="project-card" key={cert.id} style={{ marginBottom: "20px" }}>
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
        </Container>
      </Container>
    </div>
  );
}

export default Certificates;

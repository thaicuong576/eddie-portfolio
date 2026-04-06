import React from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";

const resumeLink = "https://github.com/thaicuong576";

function ResumeNew() {
  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={resumeLink}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>

        <Row className="resume">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "50px 0",
              color: "white",
              textAlign: "center",
            }}
          >
            <div style={{ maxWidth: "600px" }}>
              <h2 style={{ color: "#60a5fa", marginBottom: "20px" }}>
                Eddie Phung
              </h2>
              <h4 style={{ color: "#fbbf24", marginBottom: "30px" }}>
                Fintech Researcher | Crypto Writer | Automation Builder
              </h4>
              <p style={{ fontSize: "1.1em", lineHeight: "1.8" }}>
                Ho Chi Minh City, Vietnam
                <br />
                UEH University - Fintech, Class of 2024
                <br />
                <br />
                8 Research Papers Published | 42 n8n Workflows Built | 150+
                Crypto Articles Written
              </p>
              <p
                style={{
                  color: "#94a3b8",
                  fontStyle: "italic",
                  marginTop: "20px",
                }}
              >
                Full PDF resume coming soon. Please use the contact form to
                request a copy.
              </p>
            </div>
          </div>
        </Row>

        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={resumeLink}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;

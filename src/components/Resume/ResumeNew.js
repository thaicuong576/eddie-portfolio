import React from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";

const pdfUrl = process.env.PUBLIC_URL + "/eddie-cv.pdf";

function ResumeNew() {
  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={pdfUrl}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>

        <Row className="resume" style={{ justifyContent: "center" }}>
          <iframe
            src={pdfUrl}
            title="Eddie Phung CV"
            style={{
              width: "100%",
              maxWidth: "800px",
              height: "1150px",
              border: "none",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.03)",
              boxShadow:
                "0 2px 4px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.1)",
            }}
          />
        </Row>

        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={pdfUrl}
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

import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import { identity } from "../../data/identity";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

const pdfUrl = process.env.PUBLIC_URL + "/eddie-cv.pdf";

function ResumeNew() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function goToPrev() {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  }

  function goToNext() {
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
  }

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
          <div className="pdf-viewer-wrapper">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div className="pdf-loading">Loading CV...</div>}
              error={
                <div className="pdf-error">
                  Failed to load PDF.{" "}
                  <a href={pdfUrl} target="_blank" rel="noreferrer">
                    Download instead
                  </a>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                width={Math.min(window.innerWidth * 0.85, 800)}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </Document>

            {numPages && numPages > 1 && (
              <div className="pdf-nav">
                <button
                  onClick={goToPrev}
                  disabled={pageNumber <= 1}
                  className="pdf-nav-btn"
                  aria-label="Previous page"
                >
                  ‹ Prev
                </button>
                <span className="pdf-nav-info">
                  Page {pageNumber} of {numPages}
                </span>
                <button
                  onClick={goToNext}
                  disabled={pageNumber >= numPages}
                  className="pdf-nav-btn"
                  aria-label="Next page"
                >
                  Next ›
                </button>
              </div>
            )}
          </div>
        </Row>

        {/* Experience Highlights Section */}
        <Container className="experience-highlights" style={{ marginTop: "50px", color: "white" }}>
          <h2 className="purple" style={{ textAlign: "center", marginBottom: "30px" }}>Experience Highlights</h2>
          {identity.experience.map((exp, index) => (
            <div key={index} style={{ marginBottom: "40px", borderLeft: "2px solid #be50f4", paddingLeft: "20px" }}>
              <h3>{exp.title}</h3>
              <p className="purple" style={{ fontWeight: "bold" }}>{exp.role}</p>
              <p style={{ color: "#d1d1d1" }}>{exp.date}</p>
              <p>{exp.description}</p>
              <p style={{ color: "#be50f4", fontWeight: "bold" }}>{exp.impact} — {exp.stats}</p>
            </div>
          ))}
          
          <h2 className="purple" style={{ textAlign: "center", margin: "30px 0" }}>Startups</h2>
          {identity.startups.map((startup, index) => (
            <div key={index} style={{ marginBottom: "40px", borderLeft: "2px solid #50f4be", paddingLeft: "20px" }}>
              <h3>{startup.role} <span className="purple">@ {startup.name}</span></h3>
              <p style={{ fontStyle: "italic" }}>{startup.description}</p>
              {startup.highlights && (
                <ul>
                  {startup.highlights.map((item, id) => (
                    <li key={id} style={{ marginBottom: "10px" }}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Container>

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

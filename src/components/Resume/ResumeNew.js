import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

const pdfUrl = process.env.PUBLIC_URL + "/Phung Thai Cuong (Eddie) - Resume.pdf";

function ResumeNew({ isHome }) {
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
        {!isHome && <Particle />}

        <h1 className="project-heading" style={{ paddingBottom: "10px" }}>
          My <strong className="blue">Resume</strong>
        </h1>
        <p style={{ color: "white", textAlign: "center", marginBottom: "20px" }}>
          A detailed breakdown of my technical background, research focus, and operational impact.
        </p>

        <Row className="resume" style={{ justifyContent: "center" }}>
          <div className="pdf-viewer-wrapper">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div className="pdf-loading">Loading Resume...</div>}
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


        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={pdfUrl}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download Resume
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;

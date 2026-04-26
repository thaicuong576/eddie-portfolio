"use client";
import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";
import { identity } from "../../data/identity";
import dynamic from "next/dynamic";

const ResumeViewer = dynamic(() => import("./ResumeViewer"), {
  ssr: false,
});

const pdfUrl = "/eddie-cv.pdf";

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
      {!isHome && <Particle />}
      <Container fluid className="resume-section">
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

        <Row className="resume">
          <ResumeViewer 
            pdfUrl={pdfUrl} 
            onDocumentLoadSuccess={onDocumentLoadSuccess} 
            pageNumber={pageNumber} 
          />
        </Row>

        <Row style={{ justifyContent: "center", position: "relative" }}>
          <div className="resume-pagination">
             <Button onClick={goToPrev} disabled={pageNumber <= 1}>Previous</Button>
             <span className="page-info">
               Page {pageNumber} of {numPages || "..."}
             </span>
             <Button onClick={goToNext} disabled={pageNumber >= numPages}>Next</Button>
          </div>
        </Row>

        <Row style={{ justifyContent: "center", position: "relative", marginTop: "20px" }}>
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

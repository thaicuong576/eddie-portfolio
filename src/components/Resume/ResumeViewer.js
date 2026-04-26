"use client";
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export default function ResumeViewer({ pdfUrl, onDocumentLoadSuccess, pageNumber }) {
  return (
    <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} className="d-flex justify-content-center">
      <Page pageNumber={pageNumber} scale={1.7} />
    </Document>
  );
}

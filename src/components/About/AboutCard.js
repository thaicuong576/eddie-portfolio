import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi everyone! I'm <span className="purple">Eddie Phung</span>{" "}
            from <span className="purple">Ho Chi Minh City, Vietnam</span>.
            <br />
            I'm a <span className="purple">Fintech Researcher</span> and{" "}
            <span className="purple">Automation Builder</span>, currently
            exploring the intersection of finance, AI, and blockchain.
            <br />I hold a degree in{" "}
            <span className="purple">Fintech</span> from{" "}
            <span className="purple">UEH University</span> (Class of 2024).
            <br />
            <br />
            Beyond research and automation, I enjoy:
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Writing about Crypto & DeFi
            </li>
            <li className="about-activity">
              <ImPointRight /> Building n8n automation workflows
            </li>
            <li className="about-activity">
              <ImPointRight /> Exploring AI & LLM applications
            </li>
          </ul>

          <p style={{ color: "rgb(108, 165, 222)" }}>
            "If you do it more than twice, automate it."{" "}
          </p>
          <footer className="blockquote-footer">Eddie</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;

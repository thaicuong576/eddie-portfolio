import React from "react";
import { Col, Row } from "react-bootstrap";
import Node from "../../Assets/TechIcons/Node.svg";
import Python from "../../Assets/TechIcons/Python.svg";
import Javascript from "../../Assets/TechIcons/Javascript.svg";
import Git from "../../Assets/TechIcons/Git.svg";
import Docker from "../../Assets/TechIcons/Docker.svg";
import SQL from "../../Assets/TechIcons/SQL.svg";
import AWS from "../../Assets/TechIcons/AWS.svg";
import ReactIcon from "../../Assets/TechIcons/React.svg";
import n8n from "../../Assets/TechIcons/n8n.svg";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <img src={Python} alt="Python" />
        <div className="tech-icons-text">Python</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={Node} alt="node" />
        <div className="tech-icons-text">Node.js</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={Javascript} alt="javascript" />
        <div className="tech-icons-text">JavaScript</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={SQL} alt="SQL" />
        <div className="tech-icons-text">PostgreSQL</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={AWS} alt="aws" className="tech-icon-images" />
        <div className="tech-icons-text">AWS</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={ReactIcon} alt="react" />
        <div className="tech-icons-text">React.js</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={Docker} alt="docker" />
        <div className="tech-icons-text">Docker</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={Git} alt="git" />
        <div className="tech-icons-text">Git</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={n8n} alt="n8n" style={{ width: "65px", height: "65px" }} />
        <div className="tech-icons-text" style={{ marginTop: "10px" }}>n8n</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <div className="tech-icons-text" style={{ fontSize: "1.5em", fontWeight: "bold" }}>AI</div>
        <div className="tech-icons-text">Agents</div>
      </Col>
    </Row>
  );
}

export default Techstack;

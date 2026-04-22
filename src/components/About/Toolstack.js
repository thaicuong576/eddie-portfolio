import React from "react";
import { Col, Row } from "react-bootstrap";
import vsCode from "../../Assets/TechIcons/vscode.svg";
import chrome from "../../Assets/TechIcons/Google Chrome.svg";
import Postman from "../../Assets/TechIcons/Postman.svg";
import Python from "../../Assets/TechIcons/Python.svg";
import Javascript from "../../Assets/TechIcons/Javascript.svg";
import Docker from "../../Assets/TechIcons/Docker.svg";
import Git from "../../Assets/TechIcons/Git.svg";
import n8n from "../../Assets/TechIcons/n8n.svg";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <img src={vsCode} alt="vsCode" className="tech-icon-images" />
        <div className="tech-icons-text">VS Code</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons ">
        <img src={chrome} alt="Chrome" className="tech-icon-images" />
        <div className="tech-icons-text">Chrome</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons ">
        <img src={Postman} alt="Postman" className="tech-icon-images" />
        <div className="tech-icons-text">Postman</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons ">
        <img src={Python} alt="Python" className="tech-icon-images" />
        <div className="tech-icons-text">Python</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons ">
        <img src={Javascript} alt="Javascript" className="tech-icon-images" />
        <div className="tech-icons-text">Javascript</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons ">
        <img src={Docker} alt="Docker" className="tech-icon-images" />
        <div className="tech-icons-text">Docker</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons ">
        <img src={Git} alt="Git" className="tech-icon-images" />
        <div className="tech-icons-text">Git</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons ">
        <img src={n8n} alt="n8n" className="tech-icon-images" style={{ width: "45px" }} />
        <div className="tech-icons-text">n8n</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons ">
        <div className="tech-icons-text" style={{ fontSize: "1.2em", fontWeight: "bold" }}>TradingView</div>
        <div className="tech-icons-text">Markets</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons ">
        <div className="tech-icons-text" style={{ fontSize: "1.2em", fontWeight: "bold" }}>Vercel</div>
        <div className="tech-icons-text">Deployment</div>
      </Col>
    </Row>
  );
}

export default Toolstack;

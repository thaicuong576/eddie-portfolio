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
import { identity } from "../../data/identity";

function Toolstack() {
  const imageMap = {
    vsCode,
    chrome,
    Postman,
    Python,
    Javascript,
    Docker,
    Git,
    n8n,
  };

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {identity.skills.tools.map((tool, index) => (
        <Col key={index} xs={4} md={2} className="tech-icons">
          {imageMap[tool.img_key] ? (
            <img 
              src={imageMap[tool.img_key]} 
              alt={tool.name} 
              className="tech-icon-images" 
              style={tool.img_key === "n8n" ? { width: "45px" } : {}}
            />
          ) : (
            <div className="tech-icons-text" style={{ fontSize: "1.2em", fontWeight: "bold" }}>
              {tool.name}
            </div>
          )}
          <div className="tech-icons-text">{tool.name}</div>
        </Col>
      ))}
    </Row>
  );
}

export default Toolstack;

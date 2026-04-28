import React from "react";
import { Col, Row } from "react-bootstrap";
import nodejs from "../../Assets/TechIcons/nodejs.svg";
import antigravity from "../../Assets/TechIcons/antigravity.svg";
import nocodb from "../../Assets/TechIcons/nocodb.svg";
import openclaw from "../../Assets/TechIcons/openclaw.svg";
import Python from "../../Assets/TechIcons/Python.svg";
import Javascript from "../../Assets/TechIcons/Javascript.svg";
import Docker from "../../Assets/TechIcons/Docker.svg";
import Git from "../../Assets/TechIcons/Git.svg";
import n8n from "../../Assets/TechIcons/n8n.svg";
import Vercel from "../../Assets/TechIcons/Vercel.svg";
import { identity } from "../../data/identity";

function Toolstack() {
  const imageMap = {
    nodejs,
    antigravity,
    nocodb,
    openclaw,
    Python,
    Javascript,
    Docker,
    Git,
    n8n,
    Vercel,
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
            />
          ) : (
            <div className="tech-icons-text" style={{ fontSize: "1.4em", fontWeight: "900", color: "#fff", marginBottom: "10px" }}>
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

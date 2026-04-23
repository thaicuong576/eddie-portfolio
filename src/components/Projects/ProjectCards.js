import React from "react";
import Card from "react-bootstrap/Card";
import { Badge } from "react-bootstrap";
import { AiOutlineArrowRight } from "react-icons/ai";

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body className="d-flex flex-column">
        <div className="card-role-badge">{props.role}</div>
        <Card.Title className="experience-title">{props.title}</Card.Title>
        
        <div className="impact-badge-container">
          <Badge bg="info" className="impact-badge">
            {props.stats}
          </Badge>
        </div>

        <Card.Text style={{ textAlign: "justify", fontSize: "0.9em", flexGrow: 1 }}>
          {props.description}
        </Card.Text>

        <div className="tech-stack-mini">
          {props.tech && props.tech.map((t, index) => (
            <span key={index} className="tech-tag">#{t}</span>
          ))}
        </div>

        <div className="experience-impact-footer">
          <strong>Key Impact:</strong> {props.impact}
        </div>
        
        {props.ghLink && (
          <div className="experience-action mt-3">
            <a href={props.ghLink} className="experience-link">
              Deep Dive <AiOutlineArrowRight />
            </a>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;

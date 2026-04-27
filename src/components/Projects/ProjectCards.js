import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getSpecTitle } from "../../utils/identityUtils";

function ProjectCards(props) {
  return (
    <Card className="modern-experience-card">
      <div 
        className="experience-card-img" 
        style={{ 
          backgroundImage: `url(${props.imgPath})`,
          backgroundPosition: `${props.imgPosition || "center top"}`,
          backgroundSize: "120%", // Restored large zoom
          backgroundRepeat: "no-repeat",
          height: "210px",
          width: "100%"
        }}
      >
        <div className="card-image-overlay"></div>
      </div>
      
      <Card.Body className="card-content">
        <div className="card-impact-highlight">
          {props.stats}
        </div>
        
        <Card.Title className="card-title-minimal">
          {props.title}
        </Card.Title>

        {props.isCertificate && (
          <div className="card-issuer" style={{ color: "var(--accent-blue)", fontSize: "0.9em", marginBottom: "10px", fontWeight: "bold" }}>
             {props.role}
          </div>
        )}

        <Card.Text className="card-description-minimal">
          {props.description}
        </Card.Text>

        {props.specializationIds && props.specializationIds.length > 0 && (
          <div className="card-business-tags">
            {props.specializationIds.map((specId) => (
              <span key={specId} className="business-tag-pill">
                {getSpecTitle(specId)}
              </span>
            ))}
          </div>
        )}

        <div className="card-action-minimal">
          {props.isCertificate ? (
             <a href={props.ghLink} target="_blank" rel="noreferrer" className="cta-link-minimal">
               Verify Certificate <AiOutlineArrowRight />
             </a>
          ) : (
            <Link to={`/experience/${props.id}`} className="cta-link-minimal">
              See How It Works <AiOutlineArrowRight />
            </Link>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;

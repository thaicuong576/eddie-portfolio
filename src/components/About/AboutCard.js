import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { identity } from "../../data/identity";

function AboutCard() {
  return (
    <Card className="quote-card-view" style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
      <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi everyone! I'm <span className="blue">{identity.basics.name}</span>{" "}
            from <span className="blue">{identity.personal.location}</span>.
            <br />
            I'm a <span className="blue">Fintech Researcher</span> and{" "}
            <span className="blue">Startup Founder</span>, currently
            leading <span className="blue">nOps Labs</span> and <span className="blue">Bep Ink</span>.
            <br />
            I'm currently pursuing a degree in{" "}
            <span className="blue">{identity.personal.major}</span> at{" "}
            <span className="blue">{identity.personal.university}</span>.
            <br />
            <br />
            Beyond building startups and research, I enjoy:
          </p>

          <ul>
            {identity.basics.activities.map((activity, index) => (
              <li key={index} className="about-activity">
                <ImPointRight /> {activity}
              </li>
            ))}
          </ul>

          <p style={{ color: "rgb(155, 126, 172)" }}>
            "{identity.basics.quote}"{" "}
          </p>
          <footer className="blockquote-footer">{identity.basics.nickname}</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;

import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { identity } from "../../data/identity";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi everyone! I'm <span className="purple">{identity.basics.name}</span>{" "}
            from <span className="purple">{identity.personal.location}</span>.
            <br />
            I'm a <span className="purple">Fintech Researcher</span> and{" "}
            <span className="purple">Startup Founder</span>, currently
            leading <span className="purple">nOps Labs</span> and <span className="purple">Bep Ink</span>.
            <br />
            I'm currently pursuing a degree in{" "}
            <span className="purple">{identity.personal.major}</span> at{" "}
            <span className="purple">{identity.personal.university}</span>.
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
          <footer className="blockquote-footer">Eddie</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;

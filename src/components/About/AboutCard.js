import React from "react";
import Card from "react-bootstrap/Card";

import { identity } from "../../data/identity";

function AboutCard() {
  return (
    <Card className="quote-card-view" style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
      <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            {identity.basics.how_i_work.intro}
          </p>

          <br />
          <p style={{ textAlign: "justify", marginBottom: "10px" }}>
            <b className="blue">{identity.basics.how_i_work.approach_title}</b>
          </p>
          <ul className="home-about-list">
            {identity.basics.how_i_work.approach_steps.map((step, index) => (
              <li key={index} className="about-activity">
                {step}
              </li>
            ))}
          </ul>

          <br />
          <p style={{ textAlign: "justify", marginBottom: "10px" }}>
            <b className="blue">{identity.basics.how_i_work.preferences_title}</b>
          </p>
          <ul className="home-about-list">
            {identity.basics.how_i_work.preferences.map((pref, index) => (
              <li key={index} className="about-activity">
                {pref}
              </li>
            ))}
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;

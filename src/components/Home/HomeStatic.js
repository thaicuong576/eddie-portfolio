import React from "react";
import eddieImg from "../../Assets/eddie-cutout.png";
import { identity } from "../../data/identity";

function HomeStatic() {
  return (
    <div className="home-static-container">
      <div className="home-static-image-wrapper">
        <img
          src={eddieImg}
          alt={identity.basics.name}
          className="img-fluid home-static-image"
          style={{ maxHeight: "450px" }}
        />
        <div className="home-static-glow"></div>
      </div>
      <div className="home-static-content">
        <h2 className="static-tagline">{identity.basics.tagline}</h2>
        <p className="static-description">
          {identity.basics.quote}
        </p>
      </div>
    </div>
  );
}

export default HomeStatic;

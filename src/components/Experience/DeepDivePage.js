import React, { useMemo, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Particle from "../Particle";
import { identity } from "../../data/identity";
import { getExperienceImage } from "../../utils/identityUtils";
import { AiOutlineClose } from "react-icons/ai";

/**
 * Reusable Section component for the Deep Dive page
 */
const Section = ({ title, children, className = "" }) => (
  <div className={`deep-dive-section ${className}`}>
    <h2 className="section-header">
      {title.split(' ')[0]} <strong className="blue">{title.split(' ').slice(1).join(' ')}</strong>
    </h2>
    <div className="section-body">
      {children}
    </div>
  </div>
);

const DeepDivePage = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(null);

  const item = useMemo(() => {
    return identity.experience.find((e) => e.id === id);
  }, [id]);

  if (!item) {
    return (
      <Container className="text-center mt-5 pt-5">
        <h2 className="blue">Case Study Not Found</h2>
        <Link to="/experience" className="btn btn-primary mt-3">Back to Experience</Link>
      </Container>
    );
  }

  const { deepDive } = item;

  const openLightbox = (img) => {
    setActiveImage(img);
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const closeLightbox = () => {
    setActiveImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="deep-dive-page-wrapper">
      <Particle />
      <Container className="deep-dive-container">
        {/* HERO SECTION */}
        <header className="deep-dive-hero">
          <Link to="/experience" className="back-link-minimal">
            ← Back to Experience
          </Link>
          <div className="hero-impact-text">{item.stats || item.impact}</div>
          <h1 className="hero-title">{item.title}</h1>
          <p className="hero-description">{item.description}</p>
        </header>

        {deepDive ? (
          <div className="deep-dive-content">
            {/* PROBLEM */}
            <Section title="The Problem">
              <p className="body-text-large">{deepDive.problem}</p>
            </Section>

            {/* WHAT I BUILT */}
            <Section title="What I Built">
              <p className="body-text-large">{deepDive.solution}</p>
            </Section>

            {/* HOW IT WORKS */}
            <Section title="How It Works">
              <ul className="step-list">
                {deepDive.flow.map((step, index) => (
                  <li key={index} className="step-item">
                    <span className="step-number">{index + 1}.</span> {step}
                  </li>
                ))}
              </ul>
            </Section>

            {/* RESULTS */}
            <Section title="Results">
              <ul className="results-list">
                {deepDive.results.map((result, index) => (
                  <li key={index} className="result-item">
                    <span className="result-check">✔</span> {result}
                  </li>
                ))}
              </ul>
            </Section>

            {/* VISUALS PRO MAX */}
            {deepDive.visuals && deepDive.visuals.length > 0 && (
              <Section title="Visuals">
                <Row className="g-4">
                  {deepDive.visuals.map((img, index) => {
                    // Logic for responsive column sizing based on total image count
                    let mdSize = 6;
                    if (deepDive.visuals.length === 1) mdSize = 12;
                    else if (deepDive.visuals.length === 3 && index === 0) mdSize = 12; // Feature first image if 3 total
                    
                    return (
                      <Col md={mdSize} key={index}>
                        <div 
                          className="visual-block-wrapper" 
                          onClick={() => openLightbox(img || getExperienceImage(item.id))}
                        >
                          <img 
                            src={img || getExperienceImage(item.id)} 
                            alt={`${item.title} visual ${index + 1}`} 
                            className="visual-img-rect"
                          />
                          <div className="visual-overlay">
                            <button className="view-proof-btn">See full image</button>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Section>
            )}
          </div>
        ) : (
          <div className="placeholder-section text-center py-5">
             <h3 className="placeholder-text italic">Case study details coming soon...</h3>
          </div>
        )}
      </Container>

      {/* LIGHTBOX MODAL */}
      {activeImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-close" onClick={closeLightbox}>
            <AiOutlineClose />
          </div>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={activeImage} alt="Enlarged visual" className="lightbox-img" />
          </div>
        </div>
      )}
    </section>
  );
};

export default DeepDivePage;

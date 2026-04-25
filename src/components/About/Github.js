import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";
import { identity } from "../../data/identity";

function Github() {
  return (
    <Row
      style={{
        justifyContent: "center",
        paddingBottom: "10px",
        color: "white",
      }}
    >
      <h1 className="project-heading pb-4" style={{ paddingBottom: "20px" }}>
        Days I <strong className="blue">Code</strong>
      </h1>
      <GitHubCalendar
        username={identity.socials.github_username}
        blockSize={30}
        blockMargin={10}
        color="#60a5fa"
        fontSize={20}
      />
    </Row>
  );
}

export default Github;

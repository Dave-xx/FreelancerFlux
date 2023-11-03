import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.scss";

const ProjectCard = ({ project }) => {
  return (
    <Link to="/" className="link">
      <div className="projectCard">
        <img src={project.img} alt="" />
        <div className="profile">
          <img src={project.pp} alt="" />
          <div className="texts">
            <h2>{project.cat}</h2>
            <p>{project.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

const CatCard = ({ cat }) => {
  return (
    <Link to={`/gigs?cat=${cat.category}`}>
      <div className="catCard">
        <img src={cat.img} alt="" />
        <span className="desc">{cat.desc}</span>
        <span className="title">{cat.title}</span>
      </div>
    </Link>
  );
};

export default CatCard;

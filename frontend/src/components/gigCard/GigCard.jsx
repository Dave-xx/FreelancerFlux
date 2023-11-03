import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./GigCard.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ gig }) => {
  const [heartImage, setHeartImage] = useState("./img/heart.png");

  // Event handler for mouse hover and click
  const handleMouseOver = () => {
    setHeartImage("./img/redHeart.png");
  };

  const handleMouseOut = () => {
    setHeartImage("./img/heart.png");
  };

  const handleClick = () => {
    setHeartImage("./img/redHeart.png");
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["gigUser", gig.userId],
    queryFn: () =>
      newRequest(`/users/${gig.userId}`).then((res) => {
        return res.data;
      }),
  });

  console.log(data);
  return (
    <Link to={`/gig/${gig._id}`} className="link">
      <div className="gigCard">
        <div className="cover">
          <img src={gig.cover} alt="" className="cover-image" />
          <img
            src={heartImage}
            alt=""
            className="heart"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
          />
        </div>

        <div className="info">
          {isLoading ? (
            "loading..."
          ) : error ? (
            console.log(error)
          ) : (
            <div className="user">
              <img src={data.user.img || "/img/noavatar.jpg"} alt="" />
              <span>{data?.user.username}</span>
            </div>
          )}
          <p className="desc">{gig.shortDesc}</p>
          <div className="rating">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(gig.totalStars / gig.starNumber) &&
                Math.round(gig.totalStars / gig.starNumber)}
            </span>
          </div>
          <hr />
          <div className="details">
            <div className="price">
              <span>From</span>
              <span>$ {gig.price}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;

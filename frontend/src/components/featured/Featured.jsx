import React, { useEffect, useState } from "react";
import "./Featured.scss";
import { Link, useNavigate } from "react-router-dom";

const Featured = () => {
  const [input, setInput] = useState("");
  const [imageSrc, setImageSrc] = useState("./img/girl.png");
  const [fade, setFade] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  useEffect(() => {
    const images = ["./img/girl.png", "./img/man.png", "./img/girl2.png"];
    let index = 0;

    const intervalId = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        index = (index + 1) % images.length;
        setImageSrc(images[index]);
        setFade(false);
      }, 30); // Wait for 0.03 second to change image
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div className="Featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder="Search for any service"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular</span>
            <Link to={`/gigs?cat=Web Development`}>
              <button>Web Development</button>
            </Link>
            <Link to={`/gigs?cat=WordPress`}>
              <button>WordPress</button>
            </Link>
            <Link to={`/gigs?cat=Logo Design`}>
              <button>Logo Design</button>
            </Link>
            <Link to={`/gigs?cat=Ai Services`}>
              <button>AI Services</button>
            </Link>
          </div>
        </div>
        <div className="right">
          <img src={imageSrc} alt="" style={{ opacity: fade ? "0.3" : "1" }} />
        </div>
      </div>
    </div>
  );
};

export default Featured;

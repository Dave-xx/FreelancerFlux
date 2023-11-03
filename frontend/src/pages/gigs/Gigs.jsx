import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
// import { gigs } from "../../components/Data";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation, useNavigate } from "react-router-dom";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const [input, setInput] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const catName = params.get("cat");
  const searchName = params.get("search");
  const location = useLocation();

  const handleTitleSearch = () => {
    navigate(`/gigs?search=${input}`);
  };

  let minRef = useRef();
  let maxRef = useRef();

  const { search } = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    refetch();
  }, [sort, search, input, location]);

  const apply = () => {
    setOpen(false);
    refetch();
  };

  const handleReset = () => {
    setInput("");
    inputRef.current.value = "";
    minRef.current.value = "";
    maxRef.current.value = "";
    navigate("/gigs?search=");
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">
          FreelancerFlux. &gt;{" "}
          {catName ? catName : searchName ? searchName : "All Gigs"}
        </span>
        <h1>{catName ? catName : searchName ? searchName : "All Gigs"}</h1>
        <p>Explore the boundaries of art and technology with FreelancerFlux</p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for any service"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleTitleSearch}>Search</button>
            <img
              src="./img/reset.png"
              onClick={handleReset}
              className="reset"
              alt=""
            />
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data && data.map((gig) => <GigCard key={gig._id} gig={gig} />)}
        </div>
      </div>
    </div>
  );
};

export default Gigs;

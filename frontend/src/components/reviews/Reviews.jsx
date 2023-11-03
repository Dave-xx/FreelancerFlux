import React, { useRef, useState } from "react";
import "./Reviews.scss";
import Review from "../review/Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "./../../utils/newRequest";

const Reviews = ({ gigId }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState(null);
  const descRef = useRef();
  const starRef = useRef();

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onError: (error) => {
      // Update the error message
      setErrorMessage(error.response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = descRef.current.value;
    const star = starRef.current.value;
    mutation.mutate({ gigId, desc, star });

    // Clear the input fields
    descRef.current.value = "";
    starRef.current.value = "";
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "Loading..."
        : error
        ? "Something went wrong"
        : data.map((review) => <Review key={review._id} review={review} />)}
      {currentUser && !currentUser?.isSeller && (
        <div className="addReview">
          <h3>Add a review</h3>
          <form onSubmit={handleSubmit}>
            <input ref={descRef} type="text" placeholder="write your opinion" />
            <select name="" id="" ref={starRef}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {errorMessage && <p className="error">{errorMessage}</p>}{" "}
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Reviews;

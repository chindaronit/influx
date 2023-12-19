import React, { useState } from "react";

const MovieCardLower = ({
  title,
  year,
  rating,
  description,
  genre,
  maxLines = 5,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  // Split the description into an array of words
  const words = description.split(" ");
  // Display either the full description or the truncated version
  const displayedDescription = showFullDescription
    ? description
    : words.slice(0, maxLines * 5).join(" "); // Assuming an average of 5 words per line

  // Check if the description has more lines
  const isMore = words.length > maxLines * 5;

  return (
    <div className="card-lower">
      <h3>{title}</h3>
      <div className="d-flex jc-between blue info">
        <h5>{genre}</h5>
        <h5>|</h5>
        <h5>{year}</h5>
        <h5>|</h5>
        <h5> IMDB: {rating} </h5>
      </div>
      {displayedDescription}{" "}
      {isMore && !showFullDescription && (
        <span
          onClick={() => setShowFullDescription(true)}
          style={{ cursor: "pointer", fontWeight: "bold" }}
        >
          ...more
        </span>
      )}
    </div>
  );
};

export default MovieCardLower;

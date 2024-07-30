import React from "react";
import {
  MISSING_MOVIE_POSTER_IMAGRE,
  MOVIE_POSTER_IMAGE_URL,
  MAX_NAME_LENGTH,
} from "../../constants/constants";
import "./index.css";

interface PosterProp {
  name: string;
  "poster-image": string;
}

interface PosterComponentProp {
  poster: PosterProp;
}

const Poster: React.FC<PosterComponentProp> = ({ poster }) => {
  const truncateName = (name: string, maxLength: number) => {
    return name.length > maxLength
      ? `${name.substring(0, maxLength)}...`
      : name;
  };

  return (
    <div className="movie-poster-item">
      <div className="thumbnail">
        <img
          src={MOVIE_POSTER_IMAGE_URL + poster["poster-image"]}
          alt={`${poster.name} Poster`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = MISSING_MOVIE_POSTER_IMAGRE;
            e.currentTarget.alt = "Error while loading image";
          }}
        />
      </div>
      <p className="movie-name">{truncateName(poster.name, MAX_NAME_LENGTH)}</p>
    </div>
  );
};

export default Poster;

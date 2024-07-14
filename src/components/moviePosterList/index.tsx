import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import { getMoviePosterList } from "../../apis/moviePosterAPI";
import {
  MISSING_MOVIE_POSTER_IMAGRE,
  MOVIE_POSTER_IMAGE_URL,
} from "../../constants/constants";

interface MoviePoster {
  name: string;
  "poster-image": string;
}

interface MoviePosterListProp {
  searchText: string;
}

const MoviePosterList: React.FC<MoviePosterListProp> = ({ searchText }) => {
  const [moviePosters, setMoviePosters] = useState<MoviePoster[]>([]);
  const [page, setPage] = useState<number>(1);
  const allMovieList = useRef<MoviePoster[]>([]);
  const isAllListFetched = useRef(false);

  const getMoviePosterListData = async (pageNumber: number) => {
    const data = await getMoviePosterList(pageNumber);
    if (!data.length) {
      isAllListFetched.current = true;
      return;
    }
    allMovieList.current = [...moviePosters, ...data];
    setMoviePosters([...moviePosters, ...data]);
  };

  useEffect(() => {
    getMoviePosterListData(page);
  }, [page]);

  useEffect(() => {
    const filteredData = allMovieList.current.filter((movie) =>
      movie.name.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log("filteredData", filteredData);
    setMoviePosters(filteredData);
  }, [searchText]);

  const handleUserScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isAllListFetched.current
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleUserScroll);
    return () => window.removeEventListener("scroll", handleUserScroll);
  }, []);

  return (
    <div className="movie-poster-wrapper">
      {moviePosters.map((poster, index) => (
        <div key={index} className="movie-poster-item">
          <div className="thumbnail">
            <img
              src={MOVIE_POSTER_IMAGE_URL + poster["poster-image"]}
              alt={`${poster.name} Poster`}
              loading="lazy" // Lazy loading attribute
              onError={(e) => {
                e.currentTarget.src = MISSING_MOVIE_POSTER_IMAGRE; // Fallback image url
                e.currentTarget.alt = "Fallback Image"; // Fallback alt text
              }}
            />
          </div>
          <p className="movie-name">{poster.name}</p>
        </div>
      ))}
    </div>
  );
};

export default MoviePosterList;

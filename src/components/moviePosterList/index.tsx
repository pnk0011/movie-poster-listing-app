import React, { useEffect, useState, useRef } from "react";
import { getMoviePosterList } from "../../apis/moviePosterAPI";
import "./index.css";
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
  const [isLoading, setIsLoading] = useState(false);
  const initialLoad = useRef(true);
  const [moviePosters, setMoviePosters] = useState<MoviePoster[]>([]);
  const [page, setPage] = useState<number>(1);
  const allMovieList = useRef<MoviePoster[]>([]);
  const isAllListFetched = useRef(false);
  const [prefetchedImage, setPrefetchedImage] = useState<string>("");

  const getMoviePosterListData = async (pageNumber: number) => {
    if (initialLoad.current) {
      setIsLoading(true);
      initialLoad.current = false;
    }
    const data = await getMoviePosterList(pageNumber);
    if (!data.length) {
      isAllListFetched.current = true;
      setIsLoading(false);
      return;
    }
    allMovieList.current = [...moviePosters, ...data];
    setMoviePosters([...moviePosters, ...data]);
    setIsLoading(false);
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
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 5 &&
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
      {isLoading && <span className="loader"></span>}
      {!isLoading &&
        moviePosters.map((poster, index) => (
          <div key={index} className="movie-poster-item">
            <div className="thumbnail">
              <img
                src={MOVIE_POSTER_IMAGE_URL + poster["poster-image"]}
                alt={`${poster.name} Poster`}
                loading="lazy" // Lazy loading attribute
                onLoadStart={(e) => (e.currentTarget.src = prefetchedImage)}
                onError={(e) => {
                  e.currentTarget.src = MISSING_MOVIE_POSTER_IMAGRE; // Fallback image url
                  e.currentTarget.alt = "Error while loading image"; // Fallback alt text
                }}
              />
            </div>
            <p className="movie-name">{poster.name}</p>
          </div>
        ))}
      {!isLoading && moviePosters.length === 0 && (
        <span className="no-match-found">No match found :(</span>
      )}
    </div>
  );
};

export default MoviePosterList;

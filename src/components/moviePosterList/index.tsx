import React, { useEffect, useState, useRef } from "react";
import { getMoviePosterList } from "../../apis/moviePosterAPI";
import Poster from "../poster/index";
import "./index.css";
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
          <Poster poster={poster} key={index} />
        ))}
      {!isLoading && moviePosters.length === 0 && (
        <span className="no-match-found">No match found :(</span>
      )}
    </div>
  );
};

export default MoviePosterList;

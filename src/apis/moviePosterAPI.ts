import axios from "axios";

import { MOVIE_POSTER_LIST_URL } from "../constants/constants";

export const getMoviePosterList = async (pageNumber: number = 1) => {
  try {
    const response = await axios.get(
      `${MOVIE_POSTER_LIST_URL + pageNumber}.json`
    );
    const posters = response.data.page["content-items"].content;
    return posters;
  } catch (error) {
    console.error("Error fetching movie posters", error);
    return [];
  }
};

import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
interface ContentItem {
  name: string;
  "poster-image": string;
}

interface ContentItems {
  content: ContentItem[];
}

interface Page {
  title: string;
  "total-content-items": string;
  "page-num-requested": string;
  "page-size-requested": string;
  "page-size-returned": string;
  "content-items": ContentItems;
}

interface ApiResponse {
  page: Page;
}

export default function MoviePosterList() {
  const [moviePosterList, setMoviePosterList] = useState<any>([]);
  const loadMoviePosterList = async () => {
    const MoviePosterListData = await axios.get(
      "https://test.create.diagnal.com/data/page1.json"
    );
    console.log(
      "MoviePosterListData",
      MoviePosterListData.data.page["content-items"].content
    );
    setMoviePosterList(MoviePosterListData.data.page["content-items"].content);
  };
  useEffect(() => {
    loadMoviePosterList();
  }, []);
  return (
    <div className="movie-poster-wrapper">
      {moviePosterList.length
        ? moviePosterList.map((item: any, index: number) => {
            return (
              <div key={index}>
                <div className="thumbnail">
                  <img
                    src={
                      "https://test.create.diagnal.com/images/" +
                      item["poster-image"]
                    }
                    alt="Movie Poster"
                  />
                </div>
                <p className="movie-name">{item.name}</p>
              </div>
            );
          })
        : null}
    </div>
  );
}

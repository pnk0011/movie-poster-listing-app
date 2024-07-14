import React from "react";
import AppHeader from "./components/header";
import MoviePosterList from "./components/moviePosterList";
import "./App.css";
import { useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="App">
      <AppHeader setSearchText={setSearchText} />
      <MoviePosterList searchText={searchText} />
    </div>
  );
}

export default App;

import React from "react";
import AppHeader from "./components/header";
import MoviePosterList from "./components/moviePosterList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <MoviePosterList />
    </div>
  );
}

export default App;

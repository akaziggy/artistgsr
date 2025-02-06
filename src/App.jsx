// App.jsx - Optimized Filtering Logic, useMemo, and Improved Performance
import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import Results from "./components/Results";
import "./styles/App.css";
import database from "./data/database.json";

const continentMap = {
  us: "north america",
  mx: "north america",
  ca: "north america",
  br: "south america",
  ar: "south america",
  co: "south america",
  fr: "europe",
  de: "europe",
  es: "europe",
  it: "europe",
  no: "europe",
  se: "europe",
  gb: "europe",
  ph: "asia",
  id: "asia",
  jp: "asia",
  kr: "asia",
  cn: "asia",
  in: "asia",
  tr: "asia",
  il: "asia",
  uz: "asia",
  pk: "asia",
  vn: "asia",
  np: "asia",
  ru: "europe",
  au: "oceania",
  nz: "oceania",
  za: "africa",
  eg: "africa",
  ng: "africa",
  tz: "africa",
  dk: "europe",
  bb: "north america",
  am: "asia",
  pl: "europe",
  nl: "europe",
  be: "europe",
  is: "europe",
  ie: "europe",
  ua: "europe",
  ro: "europe",
};

const App = () => {
  const [searchParams, setSearchParams] = useState({
    lastGuess: "",
    debut: "",
    popularity: "",
    members: "",
    gender: "",
    country: "",
    genre: "",
    debutMode: "default",
    lowerBound: 1900,
    upperBound: 2025,
    popularityMode: "default",
    popularityLower: 1,
    popularityUpper: 204,
    countryMode: "exact",
  });
  const [results, setResults] = useState([]);
  const [isFirstSearch, setIsFirstSearch] = useState(true);

  const filteredResults = useMemo(() => {
    return database.filter((artist) => {
      const artistCountry = artist.COUNTRY.toLowerCase();
      const userCountry = searchParams.country?.toLowerCase() || "";
      const userContinent = continentMap[userCountry];
      const artistContinent = continentMap[artistCountry];

      return [
        !searchParams.genre || artist.GENRE.toLowerCase() === searchParams.genre.toLowerCase(),
        !searchParams.gender || artist.GENDER === searchParams.gender,
        !searchParams.members || artist.MEMBERS === searchParams.members,
        !searchParams.debut || (searchParams.debutMode === "exact" && artist.DEBUT.toString() === searchParams.debut),
        !searchParams.popularity || (searchParams.popularityMode === "exact" && artist.POPULARITY.toString() === searchParams.popularity),
        searchParams.countryMode === "exact" ? artistCountry === userCountry : true,
        searchParams.countryMode === "close" ? artistContinent === userContinent && artistCountry !== userCountry : true,
        searchParams.countryMode === "exclude" ? artistCountry !== userCountry : true,
      ].every(Boolean);
    });
  }, [searchParams]);

  const handleSearchClick = () => {
    setIsFirstSearch(false);
    setResults(filteredResults);
  };

  return (
      <div className="app-container">
        <Header />
        <Filters searchParams={searchParams} setSearchParams={setSearchParams} />
        <div className="action-buttons">
          <button className="search-button" onClick={handleSearchClick}>Search</button>
          <button className="clear-button" onClick={() => setSearchParams({ /* default state */ })}>Clear</button>
        </div>
        <Results results={results} searchParams={searchParams} />
      </div>
  );
};
export default App;

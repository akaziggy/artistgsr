import React, { useState, useEffect } from "react";
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
    excludedGenres: [],
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

  const searchDatabase = () => {
    const filteredResults = database.filter((artist) => {
      const artistCountry = artist.COUNTRY.toLowerCase();
      const userCountry = searchParams.country?.toLowerCase() || "";
      const userContinent = continentMap[userCountry];
      const artistContinent = continentMap[artistCountry];
      const genreMatch = searchParams.genre
          ? artist.GENRE.toLowerCase() === searchParams.genre.toLowerCase()
          : true;

      const genreExcluded = searchParams.excludedGenres.some((excluded) =>
          artist.GENRE.toLowerCase().includes(excluded.toLowerCase())
      );

      let countryMatch = true;
      if (searchParams.country) {
        if (searchParams.countryMode === "exact") {
          countryMatch = artistCountry === userCountry;
        } else if (searchParams.countryMode === "close") {
          countryMatch = artistContinent === userContinent && artistCountry !== userCountry;
        } else if (searchParams.countryMode === "exclude") {
          countryMatch = artistCountry !== userCountry;
        }
      }

      let debutMatch = true;
      if (searchParams.debut) {
        if (searchParams.debutMode === "exact") {
          debutMatch = artist.DEBUT.toString() === searchParams.debut;
        } else if (searchParams.debutMode === "range") {
          debutMatch = Math.abs(artist.DEBUT - parseInt(searchParams.debut)) <= 5;
        } else if (searchParams.debutMode === "lower") {
          debutMatch = artist.DEBUT >= searchParams.lowerBound && artist.DEBUT < parseInt(searchParams.debut);
        } else if (searchParams.debutMode === "upper") {
          debutMatch = artist.DEBUT > parseInt(searchParams.debut) && artist.DEBUT <= searchParams.upperBound;
        }
      }

      let popularityMatch = true;
      if (searchParams.popularity) {
        if (searchParams.popularityMode === "exact") {
          popularityMatch = artist.POPULARITY.toString() === searchParams.popularity;
        } else if (searchParams.popularityMode === "range") {
          popularityMatch = Math.abs(artist.POPULARITY - parseInt(searchParams.popularity)) <= 50;
        } else if (searchParams.popularityMode === "lower") {
          popularityMatch = artist.POPULARITY >= parseInt(searchParams.popularity) && artist.POPULARITY <= searchParams.popularityUpper;
        } else if (searchParams.popularityMode === "upper") {
          popularityMatch = artist.POPULARITY >= searchParams.popularityLower && artist.POPULARITY <= parseInt(searchParams.popularity);
        }
      }

      return (
          !genreExcluded && // Exclude artists with excluded genres
          genreMatch &&
          debutMatch &&
          popularityMatch &&
          (!searchParams.members || artist.MEMBERS === searchParams.members) &&
          (!searchParams.gender || artist.GENDER === searchParams.gender) &&
          (!searchParams.genre || artist.GENRE.toLowerCase() === searchParams.genre.toLowerCase()) &&
          countryMatch
      );
    });

    setResults(filteredResults);
  };

  useEffect(() => {
    if (!isFirstSearch) {
      searchDatabase();
    }
  }, [searchParams]);

  const handleSearchClick = () => {
    setIsFirstSearch(false);
    searchDatabase();
  };

  const clearFilters = () => {
    setSearchParams({
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
    setResults([]);
    setIsFirstSearch(true);
  };

  return (
      <div className="app-container">
        <Header />
        <Filters searchParams={searchParams} setSearchParams={setSearchParams} />
        <div className="action-buttons">
          <button className="search-button" onClick={handleSearchClick}>
            Search
          </button>
          <button className="clear-button" onClick={clearFilters}>
            Clear
          </button>
        </div>
        <Results results={results} searchParams={searchParams} />
      </div>
  );
};

export default App;

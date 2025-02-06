import React from "react";
import Select from "react-select";
import ToggleButton from "./ToggleButton";
import exactIcon from "../assets/exact.svg";
import closeIcon from "../assets/close.svg";
import lessIcon from "../assets/less.svg";
import upperIcon from "../assets/more.svg";
import exactCountryIcon from "../assets/exact-country.svg";
import closeCountryIcon from "../assets/close-country.svg";
import excludeCountry from "../assets/exclude.svg";

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#2b2b2b",
    border: "1px solid #555",
    color: "white",
    fontSize: "14px",
    padding: "2px",
    boxShadow: "none", // Removes the default focus outline
    "&:hover": {
      borderColor: "#4caf50", // Add hover effect
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1e1e1e",
    color: "white",
    borderRadius: "5px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? "#4caf50" : "transparent", // Highlight focused option
    color: isFocused ? "white" : "#fff", // White font on focus
    padding: "10px",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "white", // Ensure selected value is white
  }),
};


const genreOptions = ["Pop", "Rock", "Indie", "Hip Hop", "R&B"].map((g) => ({ value: g, label: g }));
const genderOptions = ["Male", "Female", "Mixed"].map((g) => ({ value: g, label: g }));
const memberOptions = ["Solo", "Group"].map((m) => ({ value: m, label: m }));
const countryOptions = [
  { value: "us", label: "United States" },
  { value: "mx", label: "Mexico" },
  { value: "ca", label: "Canada" },
  { value: "br", label: "Brazil" },
  { value: "ar", label: "Argentina" },
  { value: "co", label: "Colombia" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
  { value: "no", label: "Norway" },
  { value: "se", label: "Sweden" },
  { value: "gb", label: "Great Britain" },
  { value: "ph", label: "Philippines" },
  { value: "id", label: "Indonesia" },
  { value: "jp", label: "Japan" },
  { value: "kr", label: "South Korea" },
  { value: "cn", label: "China" },
  { value: "in", label: "India" },
  { value: "tr", label: "Turkey" },
  { value: "il", label: "Israel" },
  { value: "uz", label: "Uzbekistan" },
  { value: "pk", label: "Pakistan" },
  { value: "vn", label: "Vietnam" },
  { value: "np", label: "Nepal" },
  { value: "ru", label: "Russia" },
  { value: "au", label: "Australia" },
  { value: "nz", label: "New Zealand" },
  { value: "za", label: "South Africa" },
  { value: "eg", label: "Egypt" },
  { value: "ng", label: "Nigeria" },
  { value: "tz", label: "Tanzania" },
  { value: "dk", label: "Denmark" },
  { value: "bb", label: "Barbados" },
  { value: "am", label: "Armenia" },
  { value: "pl", label: "Poland" },
  { value: "nl", label: "Netherlands" },
  { value: "be", label: "Belgium" },
  { value: "is", label: "Iceland" },
  { value: "ie", label: "Ireland" },
  { value: "ua", label: "Ukraine" },
  { value: "ro", label: "Romania" },
];

const Filters = ({ searchParams, setSearchParams }) => {
  return (
      <div className="filter-wrapper">
        {/* Last Guess */}
        {/*<div className="filter-item">*/}
        {/*  <label>Last Guess</label>*/}
        {/*  <input*/}
        {/*      type="text"*/}
        {/*      placeholder="Enter artist name"*/}
        {/*      value={searchParams.lastGuess}*/}
        {/*      onChange={(e) => setSearchParams({ ...searchParams, lastGuess: e.target.value })}*/}
        {/*  />*/}
        {/*</div>*/}

        <div className="filter-item">
          <label>Debut</label>
          <input
              type="number"
              placeholder="Enter Year"
              value={searchParams.debut}
              onChange={(e) => setSearchParams({ ...searchParams, debut: e.target.value })}
              style={{
                backgroundColor: searchParams.debutMode === "exact" ? "#4caf50" :
                    searchParams.debutMode === "range" ? "#ad9730" : "#2b2b2b",
                color: "white",
              }}
          />
          <div className="toggle-buttons">
            <ToggleButton
                label={<img src={exactIcon} alt="Exact Mode" className="button-icon" />}
                isActive={searchParams.debutMode === "exact"}
                onClick={() => setSearchParams({ ...searchParams, debutMode: "exact" })}
                color="#4caf50"
            />
            <ToggleButton
                label={<img src={closeIcon} alt="Close Mode" className="button-icon" />}
                isActive={searchParams.debutMode === "range"}
                onClick={() => setSearchParams({
                  ...searchParams,
                  debutMode: "range",
                  lowerBound: searchParams.debut ? Math.max(parseInt(searchParams.debut) - 5, 1) : 1900,
                  upperBound: searchParams.debut ? Math.min(parseInt(searchParams.debut) + 5, 2025) : 2025,
                })}
                color="#ad9730"
            />
            <ToggleButton
                label={<img src={lessIcon} alt="Less Mode" className="button-icon" />}
                isActive={searchParams.debutMode === "lower"}
                onClick={() => setSearchParams({
                  ...searchParams,
                  debutMode: "lower",
                  lowerBound: searchParams.lowerBound || (searchParams.debut ? Math.max(parseInt(searchParams.debut) - 5, 1) : 1900),
                })}
                color="#ad9730"
            />
            <ToggleButton
                label={<img src={upperIcon} alt="Upper Mode" className="button-icon" />}
                isActive={searchParams.debutMode === "upper"}
                onClick={() => setSearchParams({
                  ...searchParams,
                  debutMode: "upper",
                  upperBound: searchParams.upperBound || (searchParams.debut ? Math.min(parseInt(searchParams.debut) + 5, 2025) : 2025),
                })}
                color="#ad9730"
            />
          </div>
          {searchParams.debutMode === "lower" && (
              <input
                  type="number"
                  placeholder="Lower Bound"
                  value={searchParams.lowerBound}
                  onChange={(e) => setSearchParams({ ...searchParams, lowerBound: e.target.value })}
              />
          )}
          {searchParams.debutMode === "upper" && (
              <input
                  type="number"
                  placeholder="Upper Bound"
                  value={searchParams.upperBound}
                  onChange={(e) => setSearchParams({ ...searchParams, upperBound: e.target.value })}
              />
          )}
        </div>

        {/* Popularity */}
        <div className="filter-item">
          <label>Popularity</label>
          <input
              type="number"
              placeholder="Enter Popularity"
              value={searchParams.popularity}
              onChange={(e) => setSearchParams({ ...searchParams, popularity: e.target.value })}
              style={{
                backgroundColor: searchParams.popularityMode === "exact" ? "#4caf50" :
                    searchParams.popularityMode === "range" ? "#ad9730" : "#2b2b2b",
                color: "white",
              }}
          />
          <div className="toggle-buttons">
            <ToggleButton
                label={<img src={exactIcon} alt="Exact Mode" className="button-icon" />}
                isActive={searchParams.popularityMode === "exact"}
                onClick={() => setSearchParams({ ...searchParams, popularityMode: "exact" })}
                color="#4caf50"
            />
            <ToggleButton
                label={<img src={closeIcon} alt="Close Mode" className="button-icon" />}
                isActive={searchParams.popularityMode === "range"}
                onClick={() => setSearchParams({
                  ...searchParams,
                  popularityMode: "range",
                  popularityLower: searchParams.popularity ? Math.max(parseInt(searchParams.popularity) - 50, 1) : 1,
                  popularityUpper: searchParams.popularity ? Math.min(parseInt(searchParams.popularity) + 50, 204) : 204,
                })}
                color="#ad9730"
            />
            <ToggleButton
                label={<img src={lessIcon} alt="Less Mode" className="button-icon" />}
                isActive={searchParams.popularityMode === "lower"}
                onClick={() => setSearchParams({
                  ...searchParams,
                  popularityMode: "lower",
                  popularityUpper: searchParams.popularityUpper || (searchParams.popularity ? Math.min(parseInt(searchParams.popularity) + 50, 204) : 204),
                })}
                color="#ad9730"
            />
            <ToggleButton
                label={<img src={upperIcon} alt="Upper Mode" className="button-icon" />}
                isActive={searchParams.popularityMode === "upper"}
                onClick={() => setSearchParams({
                  ...searchParams,
                  popularityMode: "upper",
                  popularityLower: searchParams.popularityLower || (searchParams.popularity ? Math.max(parseInt(searchParams.popularity) - 50, 1) : 1),
                })}
                color="#ad9730"
            />
          </div>
          {searchParams.popularityMode === "lower" && (
              <input
                  type="number"
                  placeholder="Upper Bound"
                  value={searchParams.popularityUpper}
                  onChange={(e) => setSearchParams({ ...searchParams, popularityUpper: e.target.value })}
              />
          )}
          {searchParams.popularityMode === "upper" && (
              <input
                  type="number"
                  placeholder="Lower Bound"
                  value={searchParams.popularityLower}
                  onChange={(e) => setSearchParams({ ...searchParams, popularityLower: e.target.value })}
              />
          )}
        </div>

        {/* Members */}
        <div className="filter-item">
          <label>Members</label>
          <Select
              options={memberOptions}
              styles={customStyles}
              placeholder="Select Members"
              onChange={(option) => setSearchParams({ ...searchParams, members: option.value })}
          />
        </div>

        {/* Genre */}
        <div className="filter-item">
          <label>Genre</label>
          <Select
              options={genreOptions}
              styles={customStyles}
              placeholder="Select Genre"
              onChange={(option) => setSearchParams({ ...searchParams, genre: option.value })}
          />
        </div>

        {/* Gender */}
        <div className="filter-item">
          <label>Gender</label>
          <Select
              options={genderOptions}
              styles={customStyles}
              placeholder="Select Gender"
              onChange={(option) => setSearchParams({ ...searchParams, gender: option.value })}
          />
        </div>

        {/* Country */}
        <div className="filter-item">
          <label>Country</label>
          <Select
              options={countryOptions}
              styles={customStyles}
              placeholder="Select Country"
              onChange={(selected) => setSearchParams({ ...searchParams, country: selected ? selected.value : "" })}
          />
          <div className="toggle-buttons">
            <ToggleButton
                label={<img src={exactCountryIcon} alt="Exact-C" className="button-icon" />}
                isActive={searchParams.countryMode === "exact"}
                onClick={() => setSearchParams({ ...searchParams, countryMode: "exact" })}
                color="#4caf50"
            />
            <ToggleButton
                label={<img src={closeCountryIcon} alt="Close country" className="button-icon" />}
                isActive={searchParams.countryMode === "close"}
                onClick={() => setSearchParams({ ...searchParams, countryMode: "close" })}
                color="#ad9730"
            />
            <ToggleButton
                label={<img src={excludeCountry} alt="Exclude Country" className="button-icon" />}
                isActive={searchParams.countryMode === "exclude"}
                onClick={() => setSearchParams({ ...searchParams, countryMode: "exclude" })}
                color="#f44336"
            />
          </div>
        </div>
      </div>
  );
};

export default Filters;

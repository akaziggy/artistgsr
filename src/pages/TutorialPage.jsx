import React from "react";
import { Link } from "react-router-dom";

const TutorialPage = () => {
  return (
      <div style={{ padding: "20px", color: "#fff", backgroundColor: "#101010" }}>
        <h1>Tutorial: How to Use SoundMap Artist Finder</h1>
        <p>Welcome to the SoundMap Artist Finder! Here's how you can use the app:</p>
        <ul>
          <li><strong>Last Guess:</strong> Enter an artist name to pre-fill related filters automatically.</li>
          <li><strong>Debut:</strong> Specify the debut year of the artist. Toggle options for exact match or range.</li>
          <li><strong>Popularity:</strong> Enter a ranking for popularity. Use the toggles for exact or approximate match.</li>
          <li><strong>Members:</strong> Select whether the artist is Solo or a Group.</li>
          <li><strong>Genre:</strong> Choose a genre from the dropdown menu.</li>
          <li><strong>Country:</strong> Enter the country code (e.g., US, UK, CA).</li>
          <li><strong>Gender:</strong> Select the gender of the artist (Male, Female, or Mixed).</li>
          <li><strong>Search:</strong> Press the Search button to see results based on your filters.</li>
          <li><strong>Clear:</strong> Reset all filters to start a new search.</li>
        </ul>
        <p>
          Use the filters to narrow down your search. For example, you can find all solo female artists in the Pop genre from the US!
        </p>
        <Link to="/" style={{ color: "#4caf50", textDecoration: "none" }}>Go Back</Link>
      </div>
  );
};

export default TutorialPage;

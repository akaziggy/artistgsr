import React from "react";

const Results = ({results, searchParams}) => {
  const getHighlightStyle = (field, value) => {
    if (!value) return {}; // No filter applied for this field

    // Highlight Exact Matches (Green)
    if (
        (searchParams.debutMode === "exact" && field === "DEBUT" && value.toString() === searchParams.debut) ||
        (searchParams.popularityMode === "exact" && field === "POPULARITY" && value.toString() === searchParams.popularity) ||
        (searchParams.countryMode === "exact" && field === "COUNTRY" && value.toLowerCase() === searchParams.country?.toLowerCase()) ||
        (field === "MEMBERS" && value === searchParams.members) ||
        (field === "GENRE" && value.toLowerCase() === searchParams.genre?.toLowerCase()) ||
        (field === "GENDER" && value === searchParams.gender)
    ) {
      return {backgroundColor: "#4caf50", color: "white"};
    }

// Highlight Close Matches (Yellow)
    if (
        ((searchParams.debutMode === "range" || searchParams.debutMode === "lower" || searchParams.debutMode === "upper") && field === "DEBUT" && Math.abs(value - parseInt(searchParams.debut)) <= 5) ||
        ((searchParams.popularityMode === "range" || searchParams.popularityMode === "lower" || searchParams.popularityMode === "upper") && field === "POPULARITY" && Math.abs(value - parseInt(searchParams.popularity)) <= 50) ||
        (searchParams.countryMode === "close" && field === "COUNTRY" && value.toLowerCase() !== searchParams.country?.toLowerCase())
    ) {
      return {backgroundColor: "#ad9730", color: "white"};
    }

    return {};
  };

  return (
      <div className="results-container">
        {results.length > 0 ? (
            results.map((artist, index) => (
                <div key={index} className="result-card">
                  <img src={artist.ImageURL || "/placeholder.jpg"} alt={artist.ARTIST} className="result-image"/>
                  <h3 className="result-name">{artist.ARTIST}</h3>
                  <div className="result-details">
                    <div className="detail-item" style={getHighlightStyle("DEBUT", artist.DEBUT)}>
                      <span className="detail-label">Debut:</span>
                      <span className="detail-value">{artist.DEBUT}</span>
                    </div>
                    <div className="detail-item" style={getHighlightStyle("POPULARITY", artist.POPULARITY)}>
                      <span className="detail-label">Popularity:</span>
                      <span className="detail-value">#{artist.POPULARITY}</span>
                    </div>
                    <div className="detail-item" style={getHighlightStyle("MEMBERS", artist.MEMBERS)}>
                      <span className="detail-label">Members:</span>
                      <span className="detail-value">{artist.MEMBERS}</span>
                    </div>
                    <div className="detail-item" style={getHighlightStyle("GENRE", artist.GENRE)}>
                      <span className="detail-label">Genre:</span>
                      <span className="detail-value">{artist.GENRE}</span>
                    </div>
                    <div className="detail-item" style={getHighlightStyle("COUNTRY", artist.COUNTRY)}>
                      <span className="detail-label">Country:</span>
                      <span className="detail-value">{artist.COUNTRY}</span>
                    </div>
                    <div className="detail-item" style={getHighlightStyle("GENDER", artist.GENDER)}>
                      <span className="detail-label">Gender:</span>
                      <span className="detail-value">{artist.GENDER}</span>
                    </div>
                  </div>
                </div>
            ))
        ) : (
            <p className="no-results">No results found. Adjust your filters and try again.</p>
        )}
      </div>
  );
};

export default Results;
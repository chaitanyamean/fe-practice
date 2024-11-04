/* eslint-disable react/prop-types */
import React from "react";

const SuggestionsList = ({
  suggestions = [],
  highlight,
  dataKey,
  onSuggestionClick,
  selectedIndex,
}) => {
  const getHighLightText = (text, highLight) => {
    // return text;
    const pars = text.split(new RegExp(`(${highlight})`, "gi"));
    console.log(pars);

    return (
      <span>
        {pars.map((par, index) => {
          return par.toLowerCase() == highLight.toLowerCase() ? (
            <b key={index}>{par}</b>
          ) : (
            par
          );
        })}
      </span>
    );
  };

  return (
    <>
      {console.log(suggestions)}
      {suggestions.map((suggestion, index) => {
        const currSuggestion = dataKey ? suggestion[dataKey] : suggestion;
        return (
          <li
            key={index}
            id={`suggestion-${index}`}
            onClick={() => onSuggestionClick(suggestion)}
            className="suggestion-item"
            role="option"
            aria-selected={selectedIndex === index}
          >
            {getHighLightText(currSuggestion, highlight)}
          </li>
        );
      })}
    </>
  );
};

export default SuggestionsList;

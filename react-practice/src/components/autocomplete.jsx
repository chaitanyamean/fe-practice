import React, { useCallback, useEffect, useRef, useState } from "react";
import "./autocompleteStyles.css";

import SuggestionsList from "./suggestions-list";

import debounce from "lodash/debounce";
const AutoComplete = ({
  staticData,
  fetchSuggestions,
  placeholder,
  customStyles,
  onBlur,
  onFocus,
  onChange,
  onSelect,
  customLoading,
  dataKey,
  caching = true,
}) => {
  const [inputValue, setInputValues] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const suggestionsRef = useRef(null);
  // const [setCache, getCache] = useCache("autocomplete", 3600);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleInputChange = (event) => {
    setInputValues(event.target.value);
    onChange(event.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);

    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestions) {
        result = await fetchSuggestions(query);
      }
      console.log(result);
      setSuggestions(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Error");
      setSuggestions([]);
      setLoading(false);
    }
  };

  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    []
  );

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        setSelectedIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % suggestions.length;
          scrollIntoView(newIndex);
          return newIndex;
        });
        break;

      case "ArrowUp":
        setSelectedIndex((prevIndex) => {
          const newIndex =
            (prevIndex - 1 + suggestions.length) % suggestions.length;
          scrollIntoView(newIndex);

          return newIndex;
        });
        break;
      case "Enter":
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;

      default:
        break;
    }
  };

  const scrollIntoView = (index) => {
    if (suggestionsRef.current) {
      const suggestionsElement =
        suggestionsRef.current.getElementsByTagName("li");
      if (suggestionsElement[index]) {
        suggestionsElement[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    console.log(suggestion);
    setInputValues(dataKey ? suggestion[dataKey] : dataKey);
    onSelect(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div className="container">
      <h1>TypeaHead</h1>
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onSelect={onSelect}
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        aria-activedescendant={`suggestion-${selectedIndex}`}
      />
      {((suggestions && suggestions.length > 0) || loading || error) && (
        <ul ref={suggestionsRef} className="suggestions-list" role="listbox">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}
          <SuggestionsList
            dataKey={dataKey}
            highlight={inputValue}
            suggestions={suggestions}
            selectedIndex={selectedIndex}
            onSuggestionClick={handleSuggestionClick}
          />
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;

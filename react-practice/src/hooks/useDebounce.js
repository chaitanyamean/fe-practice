import React, { useState, useEffect } from "react";

const useDebounce = (inputValue, delay) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    let handler = setTimeout(() => {
      setDebounceValue(inputValue);
    }, delay);

    () => clearTimeout(handler);
  }, [inputValue, delay]);
  return debounceValue;
};

export default useDebounce;

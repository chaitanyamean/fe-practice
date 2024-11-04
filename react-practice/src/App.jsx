import { useState } from "react";
import "./App.css";
import TicTacToe from "./components/tictactoe";
import AutoComplete from "./components/autocomplete";
import useDebounce from "./hooks/useDebounce";

function App() {
  // return <TicTacToe />;

  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 1000);

  const fetchSuggestions = async (query) => {
    const response = await fetch(`
      https://dummyjson.com/recipes/search?q=${query}
      `);
    if (!response.ok) {
      throw new Error("Network Response failed");
    }
    const result = await response.json();
    console.log(result);
    return result.recipes;
  };

  const onHandleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <AutoComplete
      placeholder={"Enter Recipe"}
      // staticData={["Apple", "banana"]}
      fetchSuggestions={fetchSuggestions}
      dataKey={"name"}
      customLoading={<>Loading Recipes..</>}
      onSelect={(res) => console.log(res)}
      onChange={() => {}}
      onBlur={() => {}}
      onFocus={() => {}}
      customStyles={{}}
      caching={true}
    />
  );
}

export default App;

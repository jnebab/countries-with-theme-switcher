import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Navigation from "./components/Navigation";
import Filters from "./components/Filters";
import Homepage from "./components/Homepage";
import CountryDetails from "./components/CountryDetails";

import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_COUNTRIES } from "./queries.js";

function App() {
  const [theme, setTheme] = useState("light");
  const [filter, setFilter] = useState(null);
  const [keyword, setKeyword] = useState("");

  const { loading, error, data } = useQuery(GET_ALL_COUNTRIES, {
    variables: { filter, keyword },
  });

  const handleSwitchTheme = () => {
    setTheme((old) => {
      if (old === "light") {
        return "dark";
      }
      return "light";
    });
  };

  const handleFilterChange = (selectedOption) => {
    setFilter(selectedOption);
  };

  const handleKeywordChange = (e) => setKeyword(e.target.value);

  return (
    <Router>
      <ThemeProvider
        theme={{
          mode: theme,
        }}
      >
        <div className="App">
          <Navigation onSwitchTheme={handleSwitchTheme} theme={theme} />
          <Switch>
            <Route
              path="/"
              exact
              children={
                <>
                  <Filters
                    theme={theme}
                    onFilterChange={handleFilterChange}
                    onKeywordChange={handleKeywordChange}
                    filter={filter}
                    keyword={keyword}
                  />
                  <Homepage
                    theme={theme}
                    loading={loading}
                    error={error}
                    data={data}
                  />
                </>
              }
            />
            <Route exact path="/:name" children={<CountryDetails />} />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;

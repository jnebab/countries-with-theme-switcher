import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";

import Navigation from "./components/Navigation";
import Filters from "./components/Filters";
import Homepage from "./components/Homepage";
import CountryDetails from "./components/CountryDetails";

import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_COUNTRIES } from "./queries.js";

import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [filter, setFilter] = useState(null);
  const [keyword, setKeyword] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_ALL_COUNTRIES);

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

  const handleKeywordChange = (value) => setKeyword(value);

  useEffect(() => {
    const regionFilter = !isEmpty(filter)
      ? {
          subregion_in: {
            region_in: { name: filter?.label },
          },
        }
      : null;

    const vars = !isEmpty(keyword)
      ? {
          regionFilter,
          keyword,
        }
      : { regionFilter };
    refetch(vars);
  }, [filter, keyword]);

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

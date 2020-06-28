import React, { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import theme from "styled-theming";

const filterBackground = theme("mode", {
  light: "var(--very-light-gray)",
  dark: "var(--very-dark-blue-dark)",
});

const inputBackground = theme("mode", {
  light: "var(--white)",
  dark: "var(--dark-blue)",
});

const FilterWrapper = styled.div`
  padding: 30px 50px;
  display: flex;
  justify-content: space-between;
  background: ${filterBackground};

  .region-filter {
    width: 20%;
    height: 30px;
  }

  .region-filter > div {
    background: ${inputBackground};
    height: 30px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    border: none;
  }

  .region-filter input {
    height: 30px;
  }

  @media (max-width: 375px) {
    flex-direction: column;

    input {
      width: 100%;
    }

    .region-filter {
      width: 70%;
      margin-top: 30px;
    }
  }
`;

const SearchWrapper = styled.div`
  position: relative;

  ion-icon {
    position: absolute;
    top: 12px;
    left: 10px;
  }

  input {
    width: 100;
    border: none;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding-left: 30px;
    height: 40px;
    background: ${inputBackground};
  }
`;

export default function Filters({
  onFilterChange,
  onKeywordChange,
  filter,
  keyword,
}) {
  const [searchText, setSearchText] = useState("");
  const options = [
    {
      value: "africa",
      label: "Africa",
    },
    {
      value: "americas",
      label: "Americas",
    },
    {
      value: "asia",
      label: "Asia",
    },
    {
      value: "europe",
      label: "Europe",
    },
    {
      value: "oceania",
      label: "Oceania",
    },
  ];
  return (
    <FilterWrapper>
      <SearchWrapper>
        <ion-icon
          name="search"
          onClick={() => onKeywordChange(searchText)}
        ></ion-icon>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search for a country..."
          value={searchText}
        />
      </SearchWrapper>{" "}
      <Select
        options={options}
        onChange={onFilterChange}
        value={filter}
        placeholder="Filter by Region"
        className="region-filter"
      />
    </FilterWrapper>
  );
}

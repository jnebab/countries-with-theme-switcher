import React from "react";
import styled from "styled-components";
import theme from "styled-theming";

import { useHistory } from "react-router-dom";

const mainBackground = theme("mode", {
  light: "var(--very-light-gray)",
  dark: "var(--very-dark-blue-dark)",
});

const countryBackground = theme("mode", {
  light: "var(--white)",
  dark: "var(--dark-blue)",
});

const mainColor = theme("mode", {
  light: "var(--very-dark-blue-light)",
  dark: "var(--white)",
});

const MainWrapper = styled.main`
  padding: 35px;
  color: ${mainColor};
  background: ${mainBackground};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 40px;
  min-height: 100vh;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    grid-gap: 0;
  }
`;

const CountryWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  background: ${countryBackground};
  border-radius: 5px;
  padding-bottom: 30px;

  p,
  h3 {
    padding: 0 20px;
    word-wrap: break-word;
    text-align: left;
    margin: 0;
  }

  p,
  span {
    font-size: 14px;
  }

  h3 {
    padding-top: 30px;
    margin-bottom: 25px;
  }

  p {
    font-weight: 600;
  }

  p > span {
    font-weight: 300;
  }

  @media(max-width: 800px) {
    margin-top: 30px;
  }
`;

const FlagImage = styled.img`
  display: flex;
  width: 100%;
  margin: 0 auto;
  height: 150px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export default function Homepage({ data, loading, error }) {
  const history = useHistory();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data !== null) {
    return (
      <MainWrapper>
        {data?.Country?.map((ctr, index) => (
          <CountryWrapper
            key={index}
            onClick={() => {
              history.push(`/${ctr?.name}`);
            }}
          >
            <FlagImage src={ctr?.flag?.svgFile} alt={ctr.name} />
            <h3>{ctr?.name}</h3>
            <p>
              Population: <span>{ctr?.population}</span>
            </p>
            <p>
              Region: <span>{ctr?.subregion?.region?.name}</span>
            </p>
            <p>
              Capital: <span>{ctr?.capital}</span>
            </p>
          </CountryWrapper>
        ))}
      </MainWrapper>
    );
  }
}

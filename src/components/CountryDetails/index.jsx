import React from "react";
import { useParams, useHistory } from "react-router-dom";

import styled from "styled-components";
import theme from "styled-theming";

import { useGetCountry } from '../../queries'

const countryBackground = theme("mode", {
  light: "var(--very-light-gray)",
  dark: "var(--very-dark-blue-dark)",
});

const borderSpanBackground = theme("mode", {
  light: "var(--white)",
  dark: "var(--dark-blue)",
});

const countryColor = theme("mode", {
  light: "var(--very-dark-blue-light)",
  dark: "var(--white)",
});

const countryShadow = theme("mode", {
  light: "var(--shadow-light)",
  dark: "var(--shadow-dark)",
});

const CountryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 25px;
  background: ${countryBackground};
  height: calc(100vh - 60px);
  color: ${countryColor};
`;

const DetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;

  @media (max-width: 991.98px) { 
    flex-direction: column;
    align-items: flex-start;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  text-align: left;

  @media (max-width: 991.98px) {
    margin-left: 0;
  }
`;

const ContentWrapper = styled.div`
  display: flex;

  p {
    margin: 0;
    font-weight: 600;
  }

  p > span {
    font-weight: 300;
  }

  div {
    margin-right: 50px;
    text-align: left;
  }

  @media (max-width: 991.98px) {
    flex-direction: column;

    div:last-child {
      margin-top: 25px;
    }
  }
`;

const BordersWrapper = styled.div`
  display: flex;
  @media (max-width: 991.98px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
`;

const CountryName = styled.div`
  font-size: 1.3em;
  font-weight: 800;

  @media (max-width: 991.98px) {
    margin-top: 30px;
    margin-bottom: 0;
  }
`;

const BorderName = styled.span`
  background: ${borderSpanBackground};
  height: 40px;
  display: flex;
  align-items: center;
  padding: 10px;
  word-wrap: break-word;
  justify-content: center;
  box-shadow: ${countryShadow};
  border-radius: 4px;
  margin-right: 10px;
`;

const BackButton = styled.button`
  width: 10%;
  border: none;
  height: 40px;
  background: ${borderSpanBackground};
  color: ${countryColor};
  box-shadow: ${countryShadow};
  padding: 10px;
  border-radius: 4px;

  @media (max-width: 991.98px) {
    width: 35%;
  }
`;

const FlagImage = styled.img`
  height: 40vh;

  @media (max-width: 991.98px) {
    height: 20vh;
  }
`;

export default function CountryDetails(props) {
  const { name } = useParams();
  const history = useHistory();
  const { data, loading, error } = useGetCountry(name)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data !== null) {
    const country = data?.Country[0];
    return (
      <CountryWrapper>
        <BackButton
          onClick={() => {
            history.push("/");
          }}
        >
          {" "}
          Back{" "}
        </BackButton>{" "}
        <DetailsWrapper>
          <FlagImage src={country?.flag?.svgFile} alt={country?.name} />
          <InfoWrapper>
            <CountryName>
              <h3>{country?.name}</h3>
            </CountryName>
            <ContentWrapper>
              <div>
                <p>
                  Native Name: <span>{country?.nativeName}</span>
                </p>
                <p>
                  Population: <span>{country?.population}</span>
                </p>
                <p>
                  Region: <span>{country?.subregion?.region?.name}</span>
                </p>
                <p>
                  Sub Region: <span>{country?.subregion?.name}</span>
                </p>
                <p>
                  Capital: <span>{country?.capital}</span>
                </p>
              </div>
              <div>
                <p>
                  Top Level Domain:{" "}
                  <span>
                    {country?.topLevelDomains
                      ?.map((domain) => domain.name)
                      .join(", ")}
                  </span>
                </p>
                <p>
                  Currencies:{" "}
                  <span>
                    {country?.currencies
                      ?.map((currency) => currency.name)
                      .join(", ")}
                  </span>
                </p>
                <p>
                  Languages:{" "}
                  <span>
                    {country?.officialLanguages
                      ?.map((lang) => lang.name)
                      .join(", ")}
                  </span>
                </p>
              </div>
            </ContentWrapper>
            <div>
              <h3>Border Countries:</h3>
              <BordersWrapper>
                {country?.borders?.map((border, index) => (
                  <BorderName key={index}>{border.name}</BorderName>
                ))}
              </BordersWrapper>
            </div>
          </InfoWrapper>
        </DetailsWrapper>
      </CountryWrapper>
    );
  }
}

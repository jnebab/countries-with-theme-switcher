import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import styled from "styled-components";
import theme from "styled-theming";

import { GET_COUNTRY } from "../../queries.js";

const countryBackground = theme("mode", {
  light: "var(--very-light-gray)",
  dark: "var(--very-dark-blue-dark)",
});

const CountryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 25px;
  background: ${countryBackground};
  height: 100vh;
`;

const BackButton = styled.button`
  width: 35%;
`;

const FlagImage = styled.img`
  height: 25vh;
`;

export default function CountryDetails(props) {
  const { name } = useParams();
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: {
      countryName: name,
    },
  });

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
          Go back{" "}
        </BackButton>{" "}
        <FlagImage src={country?.flag?.svgFile} alt={country?.name} />
        <h3>{country?.name}</h3>
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
            {country?.topLevelDomains?.map((domain) => domain.name).join(", ")}
          </p>
          <p>
            Currencies:{" "}
            {country?.currencies?.map((currency) => currency.name).join(", ")}
          </p>
          <p>
            Languages:{" "}
            {country?.officialLanguages?.map((lang) => lang.name).join(", ")}
          </p>

          <div>
            <h3>Border Countries:</h3>
            {country?.borders?.map((border) => border.name).join(", ")}
          </div>
        </div>
      </CountryWrapper>
    );
  }
}

import {
  gql
} from "apollo-boost";

import { useQuery } from "@apollo/react-hooks";

export const GET_ALL_COUNTRIES = gql `
  query countries($regionFilter: _CountryFilter, $keyword: String) {
    Country(filter: $regionFilter, name: $keyword) {
      name
      population
      capital
      subregion {
        region {
          name
        }
      }
      flag {
        svgFile
      }
    }
  }
`;

export const useGetCountries = () => {
    const result = useQuery(GET_ALL_COUNTRIES)

    return result;
}

export const GET_COUNTRY = gql `
  query country($countryName: String) {
    Country(name: $countryName) {
      name
      nativeName
      population
      capital
      flag {
        svgFile
      }
      subregion {
        name
        region {
          name
        }
      }
      topLevelDomains {
        name
      }
      currencies {
        name
      }
      officialLanguages {
        name
      }
      borders {
        name
      }
    }
  }
`;

export const useGetCountry = (name) => {
  const result = useQuery(GET_COUNTRY, {
    variables: {
      countryName: name
    }
  })
  
  return result;
}
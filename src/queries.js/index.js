import {
  gql
} from "apollo-boost";

export const GET_ALL_COUNTRIES = gql `
  query countries {
    Country(first: 20) {
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
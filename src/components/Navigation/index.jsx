import React from "react";
import styled from "styled-components";
import theme from "styled-theming";

const navBGColor = theme("mode", {
  light: "var(--white)",
  dark: "var(--dark-blue)",
});

const navColor = theme("mode", {
  light: "var(--very-dark-blue-light)",
  dark: "var(--very-light-gray)",
});

const Nav = styled.nav`
  background: ${navBGColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 60px;
  @media (max-width: 375px) {
    height: 75px;
    padding: 0 20px;
  }
`;

const Heading = styled.h1`
  color: ${navColor};
  @media (max-width: 375px) {
    font-size: 14px;
  }
`;

const Button = styled.button`
  background: ${navBGColor};
  color: ${navColor};
  border: none;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
`;

export default function Navigation({ theme, onSwitchTheme }) {
  return (
    <Nav>
      <Heading> Where in the world? </Heading>{" "}
      <div>
        <Button onClick={onSwitchTheme}>
          <ion-icon name="moon"></ion-icon>
          <span>{`${theme} Mode`}</span>
        </Button>
      </div>
    </Nav>
  );
}

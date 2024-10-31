import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
import logoDarkMode from "../assets/logo-dark.png";
import logoLightMode from "../assets/logo-light.png";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { darkMode } = useDarkMode();

  const src = darkMode ? logoDarkMode : logoLightMode;

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;

import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3.2rem;
`;

const StyledAnchor = styled.a`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #6366f1;
  justify-content: center;
`;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledSpan = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  text-align: center;
`;

function SideBar() {
  return (
    <StyledSidebar>
      <StyledNav>
        <Logo />
        <MainNav />
      </StyledNav>

      <StyledSpan>
        Developed by{" "}
        <StyledAnchor href="https://www.linkedin.com/in/abdallahshaheen404/">
          Abdallah Shaheen
        </StyledAnchor>
      </StyledSpan>
    </StyledSidebar>
  );
}

export default SideBar;

// zFmIzp3acvF2QHrv

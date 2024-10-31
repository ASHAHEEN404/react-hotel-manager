import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll; /* Changed to overflow-y for clarity */
  overflow-x: hidden;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-100);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-500);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey-700);
  }

  scrollbar-color: var(--color-grey-500) var(--color-grey-100);
  scrollbar-width: thin;
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <SideBar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  // GET THE CURR PAGE NUM
  const [searchParams, setSearchParams] = useSearchParams();

  const currPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const numOfPages = Math.ceil(count / PAGE_SIZE);

  console.log(numOfPages, count, currPage);

  function nextPage() {
    const next = currPage === numOfPages ? currPage : currPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  function perviousPage() {
    // No -1 -2 etc..
    const pervious = currPage === 1 ? currPage : currPage - 1;
    searchParams.set("page", pervious);
    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      <p>
        Showing <span>{(currPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span> {currPage === numOfPages ? count : currPage * PAGE_SIZE}</span>{" "}
        of <span>{count}</span> results
      </p>

      <Buttons>
        <PaginationButton disabled={currPage === 1} onClick={perviousPage}>
          <HiChevronLeft /> <span>Pervious</span>
        </PaginationButton>

        <PaginationButton disabled={currPage === numOfPages} onClick={nextPage}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;

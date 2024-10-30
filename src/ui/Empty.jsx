import styled from "styled-components";

const StyledEmpty = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-500);
  text-align: center;
  padding: 2rem;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  margin: 2rem 0;

  &::before {
    content: "⚠️";
    display: block;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;

function Empty({ resource }) {
  return <StyledEmpty>No {resource} could be found.</StyledEmpty>;
}

export default Empty;

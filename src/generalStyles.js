import styled from "styled-components";

export const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin:0 auto;
  position: absolute;
  top:160px;
  left:0;
  right:0;

  section {
    margin-top:80px;
  }

  ${({ product }) => {
  if (product) {
    return `
  display: grid;
  grid-template-columns: repeat(2,1fr);
  column-gap: 4rem;
  margin-top: 152.39px;
   max-width: 1440px;
  width: 100%;
  margin: 0 auto;
    `;
  }
  }}
`
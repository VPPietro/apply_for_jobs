import styled from "styled-components";

const MainButton = styled.button`
  color: #61dafb;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: transparent;
  font-size: calc(10px + 2vmin);
  font-family: inherit;

  :hover {
    cursor: pointer;
  }
`;

const SecondaryButton = styled.button`
  font-size: 10px;
  height: 30px;
`;

export { MainButton, SecondaryButton };

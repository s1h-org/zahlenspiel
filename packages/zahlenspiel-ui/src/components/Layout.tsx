import styled from "styled-components";

export const Top = styled.div`
    height: 25%;
    display: flex;
    flex-grow: 0.5;
    align-items: center;
    justify-content: space-even;
`;
export const Center = styled.div`
    height: 50%;
    width: 100%;
    display: flex;
    flex-grow: 2;
    align-items: center;
    justify-content: space-around;
`;
export const Bottom = styled.div`
    height: 25%;
    display: flex;
    flex-grow: 0.5;
    align-items: center;
    justify-content: space-even;
`;
export const HeaderText = styled.h3`
    display: flex;
    flex-grow: 0.5;
`;
export const CardStacks = styled.div`
    display: flex;
    flex-grow: 2;
`;
export const CardDeck = styled.div`
    display: flex;
    flex-grow: 1;
`;
export const AppContainer = styled.div`
  background-color: #2b2b2b;
  min-height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
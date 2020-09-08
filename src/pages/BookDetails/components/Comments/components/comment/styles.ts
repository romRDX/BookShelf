import styled from 'styled-components';

export const Container = styled.div`
  border: 0;
  color: black;
  display: flex;
  margin-bottom: 30px;
  width: 100%;
  position: relative;

  span {
    svg:first-child {
      width: 60px;
      height: 60px;
      color: #FDCD67;
    }
  }

`;

export const Info= styled.div`
  width: 100%;
    padding: 13px;
    background: lightgray;
    border-radius: 15px;

    strong {
      font-size: 18px;
      font-family: "Roboto";
      width: 100%;
      display: block;
      margin-bottom: 10px;

      span {
        margin-left: 15px;
        font-size: 14px;
        color: gray;
      }
    }

    p {
      font-size: 14px;
    }
`;

export const Options = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;

  svg {
    margin-left: 10px;
    width: 25px;
    height: 25px;
    color: #000;

    @media only screen and (max-width: 1110px) {
        margin-left: 1px;
    }
  }
`;

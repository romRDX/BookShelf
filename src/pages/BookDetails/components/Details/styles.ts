import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 0 auto;
  border-bottom: 1.5px solid black;
  border-radius: 20px;
  padding: 0 30px 50px 30px;

  img {
    max-width: 350px;

    @media only screen and (max-width: 1111px) {
      max-height: 400px;
      margin: 0 auto;
    }
  }
`;

export const BookInfo = styled.div`
  color: #000;
  font-family: 'Roboto';
  margin-left: 30px;
  max-width: 465px;

  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1250px) {
    max-width: 50%;
  }

  @media only screen and (max-width: 1110px) {
    max-width: 40%;
  }

  @media only screen and (max-width: 1110px) {
    max-width: 100%;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;

    strong {
      margin: 10px 20px 0 20px;
      text-align: center;
    }

    span {
      margin: 20px 20px 0 20px;
      text-align: center;
    }
  }

  strong {
    font-size: 30px;
    text-decoration: underline;
    text-decoration-color: #F6B743;
    margin-bottom: 20px;
  }

  span {
    font-size: 20px;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
  }

`;

export const Options = styled.div`
  width: 100%;
  height: 90px;
  padding: 10px 0;
  margin-bottom: 5px;
  display: flex;

  div {
    color: #000;
    display: flex;
    border: 2px solid red;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 8px 10px;

    span {
      text-align: center;
      margin: auto 0;
    }

    button {
      margin: 0 0 0 10px;
      width: 50px;
      text-align: center;

      &:first-of-type {

        &:hover {
          background: red;
          color: white;
        }
      }
    }
  }

  button {
    margin: auto 0;
    margin-right: 25px;
    font-size: 18px;
    padding: 10px;
    border: 0;
    border-radius: 10px;
    box-shadow: 2px 2px 3px grey;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;

    &:hover {
      box-shadow: none;
    }

    &:last-child:hover svg {
        color: red;
    }

    svg {
      margin-left: 8px;
    }
  }
`;

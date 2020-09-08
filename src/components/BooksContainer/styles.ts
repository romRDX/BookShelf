import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  display: flex;
  flex-direction: column;

  span {
    font-size: 25px;
    font-weight: 500;
    width: 100%;
    color: black;
    margin: 5px 0 20px 0;

    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

export const BooksList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  p {
    color: #000;
    font-size: 20px;
    font-family: 'Roboto';
    font-weight: 400;
    margin-bottom: 15px;
  }
`;

export const Book = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 12px;
  color: black;
  font-family: 'Roboto';

  strong {
    padding: 8px 5px 0px 5px;
    font-size: 16px;
  }

  strong + strong {
    color: #28262e;
  }

  img {
    width: 200px;
  }
`;

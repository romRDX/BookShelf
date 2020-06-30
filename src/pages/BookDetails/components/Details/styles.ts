import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
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
  }
`;

export const BookInfo = styled.div`
  color: #000;
  font-family: 'Roboto';
  margin-left: 30px;
  max-width: 465px;

  display: flex;
  flex-direction: column;

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
    font-size: 14px;
  }
`;

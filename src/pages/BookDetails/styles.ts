import styled from 'styled-components';

export const Container = styled.div`
  /* position: relative; */
`;

export const Content = styled.main`
  position: relative;
  max-width: 920px;
  width: 100%;
  margin: 64px auto;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1320px) {
    max-width: 75%;
    margin: 72px auto 64px;
  }
`;

export const SectionTitle = styled.span`
  font-size: 20px;
  font-weight: 500px;
  border-top: 1.2px solid #f5b53f;
  border-bottom: 1.2px solid #f5b53f;
  width: 100%;
  padding: 5px 0;
  font-family: 'Roboto';
`;

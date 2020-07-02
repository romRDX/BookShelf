import styled, { css } from 'styled-components';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 24px 0;
  background: #FFF;
  border-radius: 10px;
  padding: 18px 24px;

  div {
    label {
      color: #000;
      text-align: center;
      font-family: 'Roboto';
      font-weight: 500;

      input {
        height: 22px;
        width: 22px;
        margin-left: 7px;
        vertical-align: middle;
      }
    }
  }
`;

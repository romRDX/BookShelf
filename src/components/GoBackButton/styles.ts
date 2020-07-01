import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.button`
  position: absolute;
  top: -72px;
  left: -70px;
  width: 60px;
  height: 60px;
  border: 4px solid lightgray;
  background: transparent;
  border-radius: 50%;
  padding: 0 16px;
  color: black;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border-color: black;
  }

  &:hover svg {
    color: #000;
  }

  svg {
    color: lightgray;
    width: 35px;
    height: 35px;
    transform: rotate(90deg);
  }
`;

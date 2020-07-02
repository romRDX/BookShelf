import styled from 'styled-components';
import { shade, lighten } from 'polished';

export const Container = styled.header`
  padding: 16px 0;
  background: #28262e;
  position: relative;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 20px;
  }

  img {
    height: 80px;
  }
`;

export const NavBar = styled.div`
  display: flex;

  a, div {
    margin-left: auto;
    display: flex;
    align-items: center;
    text-decoration: none;
    border-radius: 15px;
    justify-content: center;
    background: #F5B53F;
    border-radius: 10px;
    padding: 7px;
    margin: 10px;
    transition: background 0.5s;

    p {
      color: #fff;
      font-family: 'Roboto';
      font-size: 20px;
      border-right: 0.2px solid #808080;
      padding-right: 8px;
    }

    svg {
      color: #fff;
      width: 28px;
      height: 20px;
      margin-left: 2px;
    }

    &:hover {
      background: ${shade(0.2, '#F5B53F')};
    }
  }

  div {
    background: #33ff33;

    p {
      border-right: 0.2px solid #FFF;
    }

    &:hover {
      background: ${shade(0.2, '#33ff33')};
    }
  }
`;


export const OrderBy = styled.div`
  position: absolute;
  z-index: 1;
  bottom: -30px;
  background: ${lighten(0.1, '#28262e')};
  padding: 6px 8px 8px 8px;
  border-radius: 0 0 10px 10px;

  span {
    margin-right: 15px;
    align-self: flex-start;
  }

  button {
    border: 0;
    background: transparent;
    color: #fff;
    margin: 0 8px;
    box-sizing: border-box;

    &:hover {
      box-shadow: 0px 3px 0.5px #f5b53f;
    }

    &:last-child {
      border: none;
    }
  }
`;


import styled from 'styled-components';
import { shade, lighten } from 'polished';

export const Container = styled.header`
  padding: 16px 0;
  background: #28262e;
  position: relative;

  @media only screen and (max-width: 1320px) {
    margin-bottom: 100px;
  }
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  @media only screen and (max-width: 1120px) {
    flex-direction: column;
  }
`;

export const LogoContainer = styled.div`
  cursor: pointer;
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

  div {
    cursor: pointer;
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

    &:last-child {
      background: #33ff33;

      p {
        border-right: 0.2px solid #FFF;
      }

      &:hover {
        background: ${shade(0.2, '#33ff33')};
      }
    }

    p {
      color: #fff;
      font-family: 'Roboto';
      font-size: 20px;
      border-right: 0.2px solid #808080;
      padding-right: 8px;

      @media only screen and (max-width: 855px) {
        border-right: 0;
      }
    }

    svg {
      color: #fff;
      width: 28px;
      height: 20px;
      margin-left: 2px;

      @media only screen and (max-width: 855px) {
        display: none;
      }
    }

    &:hover {
      background: ${shade(0.2, '#F5B53F')};
    }
  }
`;


export const OrderBy = styled.div`
  position: absolute;
  z-index: 1;
  bottom: -35px;

  display: flex;

  div {
    background: ${lighten(0.1, '#28262e')};
    padding: 6px 8px 8px 8px;
    height: fit-content;
    border-radius: 0 0 10px 10px;
    margin-left: 5px;

    &:last-child {
      svg {
        vertical-align: middle;
        cursor: pointer;

        &:hover {
          color: #FDCD67;
        }
      }
    }
  }

  span {
    margin-right: 15px;
    align-self: flex-start;
  }
`;

interface Iselected {
  selected: boolean;
}

export const Button = styled.button<Iselected>`
  border: 0;
  background: transparent;
  color: #fff;
  margin: 0 8px;
  box-sizing: border-box;
  box-shadow: ${ props => props.selected ? '0px 3px 0.5px #FFF' : 0};

  &:hover {
    box-shadow: 0px 3px 0.5px #f5b53f;
  }

  &:last-child {
    border: none;
  }
`;

export const FilterByName = styled.input`
  margin-right: 5px;
`;

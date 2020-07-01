import styled from 'styled-components';
import { shade } from 'polished';

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
  flex-direction: column;
  margin: 30px auto;
  border-top: 1.5px solid black;
  border-radius: 20px;
  padding: 0 30px 30px 30px;

  img {
    max-width: 350px;
  }
`;

export const AddCommentSection = styled.div`
  width: 100%;

  strong {
    display: block;
    color: black;
    font-size: 32px;
    font-family: 'Roboto';
    margin: 10px 0 15px;
  }

  form {
    margin-top: 25px;

    div {
      margin: 0 auto;
      padding-left: 0;
      padding-right: 0;
    }

    input {
      color: black;
      font-size: 22px;
      padding-bottom: 8px;
      border-bottom: 1px solid gray;

      &::placeholder {
        color: #b7b7cc;
      }
    }

    textarea {
      color: black;
      font-size: 18px;
      resize: none;
      padding: 7px;

      &::placeholder {
        color: #b7b7cc;
      }
    }

    button {
      display: block;
      border-radius: 10px;
      padding: 7px;
      font-size: 22px;
      margin-left: auto;
      color: #FFF;
      border: 0;
      box-shadow: 2px 2px 3px gray;
      background: #33ff33;
      border: 1px solid transparent;
      box-sizing: border-box;

      &:hover {
        background: ${shade(0.2, '#33ff33')}
      }

      &:active {
        border: 1px solid lightgray;
      }
    }
  }
`;

export const CommentsSection = styled.div`
  border-top: 1px solid black;
  padding-top: 40px;
  margin: 50px 0;
  width: 100%;
`;

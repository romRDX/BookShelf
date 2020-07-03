import React, { ButtonHTMLAttributes, useCallback } from 'react';

import { ArrowDownwardRounded } from '@material-ui/icons';

import { Container } from './styles';
import { useHistory } from 'react-router-dom';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  disable?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, disable = false, ...restx }) => {
  const history = useHistory();

  const handleGoBack = useCallback(() => {
    if(!disable) {
      history.goBack();
    }

  },[history, disable]);

  return (
    <Container onClick={handleGoBack} type="button" {...restx}>
      { children }
      <ArrowDownwardRounded />
    </Container>
  )
};

export default Button;

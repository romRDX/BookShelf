import React, { ButtonHTMLAttributes, useCallback } from 'react';

import { ArrowDownwardRounded } from '@material-ui/icons';

import { Container } from './styles';
import { useHistory } from 'react-router-dom';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...restx }) => {
  const history = useHistory();

  const handleGoBack = useCallback(() => {
    history.push('/dashboard');
  },[history]);

  return (
    <Container onClick={handleGoBack} type="button" {...restx}>
      {loading ? 'Carregando...' : children}
      <ArrowDownwardRounded />
    </Container>
  )
};

export default Button;

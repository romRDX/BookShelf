import React from 'react';

import { Link } from 'react-router-dom';
import { FiBook, FiBookOpen } from 'react-icons/fi';
import {
  CollectionsBookmark,
  MenuBook,
} from '@material-ui/icons';

import {
  Container,
  HeaderContent,
  NavBar,
  LogoContainer,
  OrderBy,
} from './styles';

import logoImg from '../../../../assets/logo.png';

interface IProps {
  toggleModal(): void;
  orderBy?: boolean;
}

const Header: React.FC<IProps> = ({ toggleModal, orderBy = true }) => {
  return (
    <Container>
      <HeaderContent>
        <LogoContainer>
          <Link to="/dashboard">
            <img src={logoImg} alt="BookShelf" />
          </Link>
          <span>Welcome to BookShelf</span>
        </LogoContainer>

        <NavBar>
          <Link to="/want-to-read">
            <p>Want to Read</p>
            <CollectionsBookmark />
          </Link>

          <Link to="/currently-reading">
            <p>Currently Reading</p>
            <FiBookOpen />
          </Link>

          <Link to="/read">
            <p>Read</p>
            <FiBook />
          </Link>

          <div onClick={toggleModal}>
            <p>New Book</p>
            <MenuBook />
          </div>
        </NavBar>
        { orderBy &&
          <OrderBy>
            <div>
              <span>Order by: </span>
              <button type="button">A-Z</button>|
              <button type="button">Creation Date </button>|
              <button type="button">Rating</button>
            </div>
          </OrderBy>
        }
      </HeaderContent>
    </Container>
  );
};

export default Header;

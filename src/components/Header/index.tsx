import React, { useState, useCallback } from 'react';

import { Link } from 'react-router-dom';
import { FiBook, FiBookOpen } from 'react-icons/fi';
import {
  CollectionsBookmark,
  MenuBook,
  Home,
  Search
} from '@material-ui/icons';

import {
  Container,
  HeaderContent,
  NavBar,
  LogoContainer,
  OrderBy,
  Button,
  FilterByName
} from './styles';

import logoImg from '../../assets/logo.png';

interface IProps {
  toggleModal(): void;
  orderBy?: boolean;
  setOrderType: (orderType: string) => void;
  setOrderDirection: (orderDirection: string) => void;
  nameFilter: string;
  setNameFilter: (nameFilter: string) => void;
}

const Header: React.FC<IProps> = ({
  toggleModal,
  orderBy = false,
  setOrderType,
  setOrderDirection,
  nameFilter,
  setNameFilter,
}) => {
  const [selectedOrderType, setSelectedOrderType] = useState('A-Z');
  const [selectedOrderDirection, setSelectedOrderDirection] = useState('ASC');

  const handleSetOrderType = useCallback((type: string)=>{
    setSelectedOrderType(type);
    setOrderType(type);
  },[]);

  const handleSetOrderDirection = useCallback((direction: string)=>{
    setSelectedOrderDirection(direction);
    setOrderDirection(direction);
  },[]);

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
          <Link to="/dashboard">
            <p>Home</p>
            <Home />
          </Link>

          <Link to="/want-to-read-books">
            <p>Want to Read</p>
            <CollectionsBookmark />
          </Link>

          <Link to="/currently-reading-books">
            <p>Currently Reading</p>
            <FiBookOpen />
          </Link>

          <Link to="/read-books">
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
              <Button
                selected={selectedOrderType === 'A-Z'}
                type="button"
                onClick={() => handleSetOrderType('A-Z')}
              >A-Z</Button>|

              <Button
                selected={selectedOrderType === 'DATE'}
                type="button"
                onClick={() => handleSetOrderType('DATE')}
              >Creation Date</Button>|

              {/* <Button type="Button" onClick={() => setOrderType('')}>Rating</Button> */}
            </div>
            <div>
              <Button
                selected={selectedOrderDirection === 'ASC'}
                type="button"
                onClick={() => handleSetOrderDirection('ASC')}
              >ASC</Button>|

              <Button
                selected={selectedOrderDirection === 'DESC'}
                type="button"
                onClick={() => handleSetOrderDirection('DESC')}
              >DESC</Button>

            </div>
            <div>
              <FilterByName
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder="Search"
                name="filterByName"
              />

              <Search />
            </div>
          </OrderBy>
        }
      </HeaderContent>
    </Container>
  );
};

export default Header;

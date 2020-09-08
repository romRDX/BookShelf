import React, { useState, useCallback } from 'react';

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
  handleChangeView?: (view: string) => void;
  orderBy?: boolean;
  setOrderType?: (orderType: string) => void;
  setOrderDirection?: (orderDirection: string) => void;
  nameFilter?: string;
  setNameFilter?: (nameFilter: string) => void;
}

const Header: React.FC<IProps> = ({
  toggleModal,
  handleChangeView,
  orderBy = false,
  setOrderType = () => null,
  setOrderDirection = () => null,
  nameFilter,
  setNameFilter = () => null,
}) => {
  const [selectedOrderType, setSelectedOrderType] = useState('A-Z');
  const [selectedOrderDirection, setSelectedOrderDirection] = useState('ASC');

  const handleSetOrderType = useCallback((type: string)=>{
    setSelectedOrderType(type);
    setOrderType(type);
  },[setOrderType]);

  const handleSetOrderDirection = useCallback((direction: string)=>{
    setSelectedOrderDirection(direction);
    setOrderDirection(direction);
  },[setOrderDirection]);

  return (
    <Container>
      <HeaderContent>
        <LogoContainer onClick={() => handleChangeView && handleChangeView('home')}>
          <img src={logoImg} alt="BookShelf" />
          <span>Welcome to BookShelf</span>
        </LogoContainer>

        <NavBar>
          <div onClick={() => handleChangeView && handleChangeView('home')}>
            <p>Home</p>
            <Home />
          </div>

          <div onClick={() => handleChangeView && handleChangeView('wantToRead')}>
            <p>Want to Read</p>
            <CollectionsBookmark />
          </div>

          <div onClick={() => handleChangeView && handleChangeView('currentlyReading')}>
            <p>Currently Reading</p>
            <FiBookOpen />
          </div>

          <div onClick={() => handleChangeView && handleChangeView('read')}>
            <p>Read</p>
            <FiBook />
          </div>

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

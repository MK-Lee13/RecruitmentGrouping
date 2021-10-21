import styled from 'styled-components';
import React from 'react'
// import Menu from '../menu'

const HeaderBody = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 64px;
    transition: all 0.1s ease;
`;

const HeaderCol = styled.div`
    display: flex;
    font-family: Noto Sans KR;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 20px;
    font-weight: bold;
    color: white;
`;

const Header = ({ name }) => {
  return (
    <HeaderBody style={{ backgroundColor: '#6289ED' }}>
      <HeaderCol>{name}</HeaderCol>
      {/* <Menu></Menu> */}
    </HeaderBody>
  );
}

export default Header;
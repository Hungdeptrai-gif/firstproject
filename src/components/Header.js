import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart, FaHome, FaPalette } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 1rem 2rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #667eea;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

const CartButton = styled(Link)`
  position: relative;
  text-decoration: none;
  color: #333;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
`;

const Header = () => {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Nav>
        <Logo onClick={() => navigate('/')}>
          The Luvin
        </Logo>
        
        <NavLinks>
          <NavLink to="/">
            <FaHome />
            Trang Chủ
          </NavLink>
          <NavLink to="/customize">
            <FaPalette />
            Tùy Chỉnh
          </NavLink>
          <CartButton to="/cart">
            <FaShoppingCart size={20} />
            {getTotalItems() > 0 && (
              <CartBadge>{getTotalItems()}</CartBadge>
            )}
          </CartButton>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;


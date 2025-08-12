import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CartContainer = styled.div`
  min-height: 100vh;
  color: white;
  padding: 2rem;
`;

const CartContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const CartTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const CartItems = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ItemInfo = styled.div``;

const ItemName = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ItemCustomization = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Quantity = styled.span`
  font-weight: bold;
  min-width: 30px;
  text-align: center;
`;

const ItemPrice = styled.div`
  font-weight: bold;
  color: #f39c12;
`;

const RemoveButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c0392b;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyCartText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.8;
`;

const CartSummary = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
    font-weight: bold;
    font-size: 1.2rem;
    color: #f39c12;
  }
`;

const CheckoutButton = styled.button`
  background: #27ae60;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  width: 100%;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #229954;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(index, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate('/order');
  };

  if (items.length === 0) {
    return (
      <CartContainer>
        <CartContent>
          <CartHeader>
            <BackButton onClick={() => navigate('/')}>
              <FaArrowLeft />
              Quay lại
            </BackButton>
            <CartTitle>Giỏ hàng</CartTitle>
          </CartHeader>

          <EmptyCart>
            <EmptyCartIcon>
              <FaShoppingBag />
            </EmptyCartIcon>
            <EmptyCartText>Giỏ hàng của bạn đang trống</EmptyCartText>
            <BackButton onClick={() => navigate('/customize')}>
              Bắt đầu mua sắm
            </BackButton>
          </EmptyCart>
        </CartContent>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartContent>
        <CartHeader>
          <BackButton onClick={() => navigate('/')}>
            <FaArrowLeft />
            Quay lại
          </BackButton>
          <CartTitle>Giỏ hàng ({getTotalItems()} sản phẩm)</CartTitle>
        </CartHeader>

        <CartItems>
          {items.map((item, index) => (
            <CartItem key={index}>
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemCustomization>
                  {item.customization?.version?.name && `Version: ${item.customization.version.name}`}
                  {item.customization?.background?.name && ` | Nền: ${item.customization.background.name}`}
                  {item.customization?.clothes?.name && ` | Áo: ${item.customization.clothes.name}`}
                </ItemCustomization>
              </ItemInfo>

              <QuantityControl>
                <QuantityButton
                  onClick={() => handleQuantityChange(index, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <FaMinus />
                </QuantityButton>
                <Quantity>{item.quantity}</Quantity>
                <QuantityButton
                  onClick={() => handleQuantityChange(index, item.quantity + 1)}
                >
                  <FaPlus />
                </QuantityButton>
              </QuantityControl>

              <ItemPrice>
                {(item.price * item.quantity).toLocaleString('vi-VN')}₫
              </ItemPrice>

              <RemoveButton onClick={() => removeFromCart(index)}>
                <FaTrash />
              </RemoveButton>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <SummaryRow>
            <span>Tạm tính:</span>
            <span>{getTotalPrice().toLocaleString('vi-VN')}₫</span>
          </SummaryRow>
          <SummaryRow>
            <span>Phí vận chuyển:</span>
            <span>25.000₫</span>
          </SummaryRow>
          <SummaryRow>
            <span>Tổng cộng:</span>
            <span>{(getTotalPrice() + 25000).toLocaleString('vi-VN')}₫</span>
          </SummaryRow>

          <CheckoutButton onClick={handleCheckout}>
            Tiến hành đặt hàng
          </CheckoutButton>
        </CartSummary>
      </CartContent>
    </CartContainer>
  );
};

export default Cart;




import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheckCircle, FaHome, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaWhatsapp, FaFacebook, FaInstagram, FaHashtag } from 'react-icons/fa';

const SuccessContainer = styled.div`
  min-height: 100vh;
  color: white;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessContent = styled.div`
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const SuccessCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  color: #27ae60;
  margin-bottom: 1rem;
`;

const SuccessTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #27ae60;
`;

const SuccessMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const OrderDetails = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
  text-align: left;
`;

const OrderTitle = styled.h3`
  color: #f39c12;
  margin-bottom: 1rem;
  text-align: center;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const DetailIcon = styled.div`
  color: #f39c12;
  font-size: 1.2rem;
  min-width: 20px;
`;

const DetailLabel = styled.span`
  font-weight: bold;
  min-width: 120px;
`;

const DetailValue = styled.span`
  opacity: 0.9;
`;

const ContactSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const ContactTitle = styled.h3`
  color: #f39c12;
  margin-bottom: 1rem;
`;

const ContactText = styled.p`
  margin-bottom: 1.5rem;
  opacity: 0.9;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SocialButton = styled.a`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  &.whatsapp:hover {
    background: #25d366;
  }

  &.facebook:hover {
    background: #1877f2;
  }

  &.instagram:hover {
    background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? '#27ae60' : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.primary ? '#229954' : 'rgba(255, 255, 255, 0.3)'};
    transform: translateY(-2px);
  }
`;

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData, orderId } = location.state || {};

  if (!orderData) {
    return (
      <SuccessContainer>
        <SuccessContent>
          <SuccessCard>
            <SuccessIcon>
              <FaCheckCircle />
            </SuccessIcon>
            <SuccessTitle>Đặt hàng thành công!</SuccessTitle>
            <SuccessMessage>
              Cảm ơn bạn đã chọn The Luvin để gửi gắm món quà đặc biệt!
            </SuccessMessage>
            <ActionButtons>
              <ActionButton onClick={() => navigate('/')}>
                <FaHome />
                Về trang chủ
              </ActionButton>
            </ActionButtons>
          </SuccessCard>
        </SuccessContent>
      </SuccessContainer>
    );
  }

  return (
    <SuccessContainer>
      <SuccessContent>
        <SuccessCard>
          <SuccessIcon>
            <FaCheckCircle />
          </SuccessIcon>
          <SuccessTitle>Đặt hàng thành công!</SuccessTitle>
          <SuccessMessage>
            Cảm ơn bạn đã chọn The Luvin để gửi gắm món quà đặc biệt!
            {orderId && (
              <div style={{ marginTop: '1rem', fontSize: '1rem', color: '#f39c12' }}>
                Mã đơn hàng: <strong>{orderId}</strong>
              </div>
            )}
          </SuccessMessage>
        </SuccessCard>

        <OrderDetails>
          <OrderTitle>Thông tin đơn hàng</OrderTitle>
          {orderId && (
            <DetailRow>
              <DetailIcon>
                <FaHashtag />
              </DetailIcon>
              <DetailLabel>Mã đơn hàng:</DetailLabel>
              <DetailValue style={{ color: '#f39c12', fontWeight: 'bold' }}>{orderId}</DetailValue>
            </DetailRow>
          )}
          <DetailRow>
            <DetailIcon>
              <FaHome />
            </DetailIcon>
            <DetailLabel>Tên KH:</DetailLabel>
            <DetailValue>{orderData.fullName}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailIcon>
              <FaPhone />
            </DetailIcon>
            <DetailLabel>SĐT:</DetailLabel>
            <DetailValue>{orderData.phone}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailIcon>
              <FaMapMarkerAlt />
            </DetailIcon>
            <DetailLabel>Địa chỉ:</DetailLabel>
            <DetailValue>{orderData.address}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailIcon>
              <FaCalendarAlt />
            </DetailIcon>
            <DetailLabel>Ngày nhận:</DetailLabel>
            <DetailValue>{new Date(orderData.deliveryDate).toLocaleDateString('vi-VN')}</DetailValue>
          </DetailRow>
          {orderData.email && (
            <DetailRow>
              <DetailIcon>
                <FaHome />
              </DetailIcon>
              <DetailLabel>Email:</DetailLabel>
              <DetailValue>{orderData.email}</DetailValue>
            </DetailRow>
          )}
        </OrderDetails>

        <ContactSection>
          <ContactTitle>Liên hệ với shop để xác nhận đơn hàng</ContactTitle>
          <ContactText>
            Liên hệ với shop qua:
          </ContactText>
          <SocialLinks>
            <SocialButton 
              href="https://zalo.me/0964393115" 
              target="_blank" 
              rel="noopener noreferrer"
              className="whatsapp"
            >
              <FaWhatsapp />
            </SocialButton>
            <SocialButton 
              href="https://facebook.com/theluvingifts" 
              target="_blank" 
              rel="noopener noreferrer"
              className="facebook"
            >
              <FaFacebook />
            </SocialButton>
            <SocialButton 
              href="https://instagram.com/the_luvin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="instagram"
            >
              <FaInstagram />
            </SocialButton>
          </SocialLinks>
          <ContactText>
            <strong>Zalo:</strong> 0964.393.115<br />
            <strong>Facebook:</strong> theluvingifts<br />
            <strong>Instagram:</strong> the_luvin
          </ContactText>
        </ContactSection>

        <ActionButtons>
          <ActionButton onClick={() => navigate('/')}>
            <FaHome />
            Về trang chủ
          </ActionButton>
          <ActionButton primary onClick={() => navigate('/customize')}>
            Đặt thêm sản phẩm
          </ActionButton>
        </ActionButtons>
      </SuccessContent>
    </SuccessContainer>
  );
};

export default Success;



import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaGift, FaPaintBrush, FaShieldAlt, FaRocket } from 'react-icons/fa';
import { products } from '../data/products';

const HomeContainer = styled.div`
  min-height: 100vh;
  color: white;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: #e74c3c;
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.1);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #f39c12;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  opacity: 0.9;
  line-height: 1.6;
`;

const ProductSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ProductTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const PriceList = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const PriceItem = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: bold;
`;

const Home = () => {
  const product = products[0];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle>Tranh Lego - Quà Tặng Cá Nhân Hóa</HeroTitle>
        <HeroSubtitle>
          Món quà ý nghĩa cho Anniversary, Tốt nghiệp, Sinh nhật... thể hiện cá tính riêng của bạn!
        </HeroSubtitle>
        <CTAButton to="/customize">Bắt Đầu Tùy Chỉnh</CTAButton>
      </HeroSection>

      <FeaturesSection>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <FaPaintBrush />
            </FeatureIcon>
            <FeatureTitle>Thiết kế background theo yêu cầu</FeatureTitle>
            <FeatureDescription>
              Tùy chỉnh nền theo ý thích của bạn để tạo ra tác phẩm độc đáo
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaRocket />
            </FeatureIcon>
            <FeatureTitle>Xử lý đơn nhanh</FeatureTitle>
            <FeatureDescription>
              Thời gian sản xuất chỉ 1-2 ngày, giao hàng nhanh chóng
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaShieldAlt />
            </FeatureIcon>
            <FeatureTitle>Bảo hành 1 đổi 1</FeatureTitle>
            <FeatureDescription>
              Chính sách bảo hành uy tín, đảm bảo chất lượng sản phẩm
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaGift />
            </FeatureIcon>
            <FeatureTitle>Quà tặng ý nghĩa</FeatureTitle>
            <FeatureDescription>
              Món quà hoàn hảo cho mọi dịp đặc biệt trong cuộc sống
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <ProductSection>
        <ProductCard>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>
          
          <PriceList>
            {product.versions.map(version => (
              <PriceItem key={version.id}>
                {version.name} - {version.price.toLocaleString('vi-VN')}₫
              </PriceItem>
            ))}
          </PriceList>

          <CTAButton to="/customize">Tạo Tranh Lego Theo Ý Bạn</CTAButton>
        </ProductCard>
      </ProductSection>
    </HomeContainer>
  );
};

export default Home;


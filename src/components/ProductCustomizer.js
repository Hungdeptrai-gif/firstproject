import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight, FaEye, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { 
  products, 
  backgrounds, 
  clothes, 
  faces, 
  hairstyles, 
  hats, 
  accessories, 
  pets 
} from '../data/products';

const CustomizerContainer = styled.div`
  min-height: 100vh;
  color: white;
  padding: 2rem;
`;

const CustomizerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CustomizationPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
`;

const Step = styled.div`
  text-align: center;
  opacity: ${props => props.active ? 1 : 0.5};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const StepTitle = styled.h2`
  margin-bottom: 1rem;
  color: #f39c12;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const OptionCard = styled.div`
  background: ${props => props.selected ? 'rgba(231, 76, 60, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.selected ? '#e74c3c' : 'transparent'};
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(231, 76, 60, 0.2);
  }
`;

const OptionName = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const OptionPrice = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const NavButton = styled.button`
  background: ${props => props.primary ? '#e74c3c' : 'rgba(255, 255, 255, 0.2)'};
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
    transform: translateY(-2px);
    background: ${props => props.primary ? '#c0392b' : 'rgba(255, 255, 255, 0.3)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const PreviewPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
`;

const PreviewTitle = styled.h3`
  margin-bottom: 1rem;
  color: #f39c12;
`;

const PreviewImage = styled.div`
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 15px;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
  position: relative;
  overflow: hidden;
`;

const PriceDisplay = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #f39c12;
`;

const AddToCartButton = styled.button`
  background: #27ae60;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  transition: all 0.3s ease;

  &:hover {
    background: #229954;
    transform: translateY(-2px);
  }
`;

const steps = [
  { id: 1, title: 'Chọn Version' },
  { id: 2, title: 'Chọn Background' },
  { id: 3, title: 'Áo & Quần' },
  { id: 4, title: 'Khuôn Mặt' },
  { id: 5, title: 'Tóc' },
  { id: 6, title: 'Mũ' },
  { id: 7, title: 'Phụ Kiện' },
  { id: 8, title: 'Thú Cưng' }
];

const ProductCustomizer = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [customization, setCustomization] = useState({
    version: null,
    background: null,
    clothes: null,
    face: null,
    hairstyle: null,
    hat: null,
    accessories: [],
    pets: []
  });

  const getCurrentOptions = () => {
    switch (currentStep) {
      case 1: return products[0].versions;
      case 2: return backgrounds;
      case 3: return clothes;
      case 4: return faces;
      case 5: return hairstyles;
      case 6: return hats;
      case 7: return accessories;
      case 8: return pets;
      default: return [];
    }
  };

  const getCurrentSelection = () => {
    switch (currentStep) {
      case 1: return customization.version;
      case 2: return customization.background;
      case 3: return customization.clothes;
      case 4: return customization.face;
      case 5: return customization.hairstyle;
      case 6: return customization.hat;
      case 7: return customization.accessories;
      case 8: return customization.pets;
      default: return null;
    }
  };

  const handleOptionSelect = (option) => {
    const newCustomization = { ...customization };
    
    switch (currentStep) {
      case 1:
        newCustomization.version = option;
        break;
      case 2:
        newCustomization.background = option;
        break;
      case 3:
        newCustomization.clothes = option;
        break;
      case 4:
        newCustomization.face = option;
        break;
      case 5:
        newCustomization.hairstyle = option;
        break;
      case 6:
        newCustomization.hat = option;
        break;
      case 7:
        const accessoryIndex = newCustomization.accessories.findIndex(a => a.id === option.id);
        if (accessoryIndex >= 0) {
          newCustomization.accessories.splice(accessoryIndex, 1);
        } else {
          newCustomization.accessories.push(option);
        }
        break;
      case 8:
        const petIndex = newCustomization.pets.findIndex(p => p.id === option.id);
        if (petIndex >= 0) {
          newCustomization.pets.splice(petIndex, 1);
        } else {
          newCustomization.pets.push(option);
        }
        break;
    }
    
    setCustomization(newCustomization);
  };

  const calculateTotalPrice = () => {
    let total = customization.version?.price || 0;
    total += customization.background?.price || 0;
    total += customization.clothes?.price || 0;
    total += customization.hairstyle?.price || 0;
    total += customization.hat?.price || 0;
    total += customization.accessories.reduce((sum, acc) => sum + acc.price, 0);
    total += customization.pets.reduce((sum, pet) => sum + pet.price, 0);
    return total;
  };

  const handleAddToCart = () => {
    const product = {
      id: Date.now(),
      name: 'Tranh Lego Tùy Chỉnh',
      price: calculateTotalPrice(),
      customization: customization,
      additionalPrice: calculateTotalPrice() - (customization.version?.price || 0)
    };
    
    addToCart(product);
    navigate('/cart');
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 1: return customization.version;
      case 2: return customization.background;
      case 3: return customization.clothes;
      case 4: return customization.face;
      case 5: return true; // Optional
      case 6: return true; // Optional
      case 7: return true; // Optional
      case 8: return true; // Optional
      default: return false;
    }
  };

  return (
    <CustomizerContainer>
      <CustomizerContent>
        <CustomizationPanel>
          <StepIndicator>
            {steps.map(step => (
              <Step key={step.id} active={currentStep === step.id}>
                {step.title}
              </Step>
            ))}
          </StepIndicator>

          <StepTitle>{steps[currentStep - 1]?.title}</StepTitle>

          <OptionGrid>
            {getCurrentOptions().map(option => {
              const isSelected = currentStep <= 6 
                ? getCurrentSelection()?.id === option.id
                : getCurrentSelection()?.some(item => item.id === option.id);
              
              return (
                <OptionCard
                  key={option.id}
                  selected={isSelected}
                  onClick={() => handleOptionSelect(option)}
                >
                  <OptionName>{option.name}</OptionName>
                  <OptionPrice>
                    {option.price > 0 ? `+${option.price.toLocaleString('vi-VN')}₫` : 'Miễn phí'}
                  </OptionPrice>
                </OptionCard>
              );
            })}
          </OptionGrid>

          <NavigationButtons>
            <NavButton
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              <FaArrowLeft />
              Quay lại
            </NavButton>
            
            {currentStep < 8 ? (
              <NavButton
                primary
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!isStepComplete(currentStep)}
              >
                Tiếp theo
                <FaArrowRight />
              </NavButton>
            ) : (
              <AddToCartButton onClick={handleAddToCart}>
                <FaShoppingCart />
                Thêm vào giỏ hàng
              </AddToCartButton>
            )}
          </NavigationButtons>
        </CustomizationPanel>

        <PreviewPanel>
          <PreviewTitle>Preview sản phẩm</PreviewTitle>
          <PreviewImage>
            <FaEye />
          </PreviewImage>
          <PriceDisplay>
            Tổng: {calculateTotalPrice().toLocaleString('vi-VN')}₫
          </PriceDisplay>
        </PreviewPanel>
      </CustomizerContent>
    </CustomizerContainer>
  );
};

export default ProductCustomizer;


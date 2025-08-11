import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaUser, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const OrderContainer = styled.div`
  min-height: 100vh;
  color: white;
  padding: 2rem;
`;

const OrderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const OrderHeader = styled.div`
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

const OrderTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const OrderForm = styled.form`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #f39c12;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: #f39c12;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: #f39c12;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const OrderSummary = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const SummaryTitle = styled.h3`
  color: #f39c12;
  margin-bottom: 1rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
    font-weight: bold;
    font-size: 1.2rem;
    color: #f39c12;
  }
`;

const SubmitButton = styled.button`
  background: #27ae60;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  width: 100%;
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

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const OrderFormComponent = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    deliveryDate: '',
    email: '',
    notes: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ';
    }

    if (!formData.deliveryDate) {
      newErrors.deliveryDate = 'Vui lòng chọn ngày nhận hàng';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Vui lòng đồng ý với chính sách bảo hành & điều khoản';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError('');
      
      try {
        const orderData = {
          customerName: formData.fullName,
          phone: formData.phone,
          email: formData.email || '',
          address: formData.address,
          deliveryDate: formData.deliveryDate,
          notes: formData.notes || '',
          items: items,
          totalPrice: getTotalPrice()
        };

        const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        
        const response = await fetch(`${API_BASE_URL}/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        const result = await response.json();
        
        if (result.success) {
          // Clear cart and redirect to success page
          clearCart();
          navigate('/success', { 
            state: { 
              orderData: formData,
              orderId: result.orderId
            }
          });
        } else {
          setSubmitError(result.error || 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
        }
              } catch (error) {
          console.error('Error submitting order:', error);
          if (error.name === 'TypeError' && error.message.includes('fetch')) {
            setSubmitError('Không thể kết nối đến máy chủ. Vui lòng đảm bảo server đang chạy và thử lại.');
          } else {
            setSubmitError('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
          }
        } finally {
          setIsSubmitting(false);
        }
    }
  };

  if (items.length === 0) {
    return (
      <OrderContainer>
        <OrderContent>
          <OrderHeader>
            <BackButton onClick={() => navigate('/cart')}>
              <FaArrowLeft />
              Quay lại giỏ hàng
            </BackButton>
            <OrderTitle>Đặt hàng</OrderTitle>
          </OrderHeader>
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p>Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi đặt hàng.</p>
            <BackButton onClick={() => navigate('/customize')}>
              Bắt đầu mua sắm
            </BackButton>
          </div>
        </OrderContent>
      </OrderContainer>
    );
  }

  return (
    <OrderContainer>
      <OrderContent>
        <OrderHeader>
          <BackButton onClick={() => navigate('/cart')}>
            <FaArrowLeft />
            Quay lại giỏ hàng
          </BackButton>
          <OrderTitle>Thông tin đặt hàng</OrderTitle>
        </OrderHeader>

        <OrderForm onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>
              <FaUser />
              Thông tin khách hàng
            </SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>Họ và tên *</Label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Vui lòng nhập họ tên"
                />
                {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Số điện thoại *</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Vui lòng nhập số điện thoại"
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </FormGroup>
            </FormGrid>

            <FormGroup>
              <Label>Địa chỉ nhận hàng *</Label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Vui lòng nhập địa chỉ"
              />
              {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
            </FormGroup>

            <FormGrid>
              <FormGroup>
                <Label>Ngày nhận hàng *</Label>
                <Input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.deliveryDate && <ErrorMessage>{errors.deliveryDate}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Email (nếu có)</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email (không bắt buộc)"
                />
              </FormGroup>
            </FormGrid>

            <FormGroup>
              <Label>Ghi chú</Label>
              <TextArea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Ghi chú cho đơn hàng (không bắt buộc)"
              />
            </FormGroup>

            <CheckboxGroup>
              <Checkbox
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
              />
              <CheckboxLabel>
                Tôi đồng ý với chính sách bảo hành & điều khoản của the luvin
              </CheckboxLabel>
            </CheckboxGroup>
            {errors.agreeToTerms && <ErrorMessage>{errors.agreeToTerms}</ErrorMessage>}
          </FormSection>
        </OrderForm>

        <OrderSummary>
          <SummaryTitle>ĐƠN HÀNG CỦA BẠN</SummaryTitle>
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
        </OrderSummary>

        {submitError && (
          <ErrorMessage style={{ marginBottom: '1rem', textAlign: 'center' }}>
            {submitError}
          </ErrorMessage>
        )}
        <SubmitButton 
          type="submit" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng ngay'}
        </SubmitButton>
      </OrderContent>
    </OrderContainer>
  );
};

export default OrderFormComponent;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEye, FaEdit, FaCheck, FaTimes, FaSync } from 'react-icons/fa';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  color: white;
  margin: 0;
  font-size: 2.5rem;
`;

const RefreshButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  text-align: center;
  color: white;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const OrdersTable = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  font-weight: bold;
  color: white;
  font-size: 0.9rem;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  align-items: center;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  background: ${props => {
    switch (props.status) {
      case 'New': return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'Processing': return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'Shipped': return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      case 'Delivered': return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
      case 'Cancelled': return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
      default: return 'rgba(255, 255, 255, 0.2)';
    }
  }};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background 0.2s;
  margin: 0 2px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;

  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  &.secondary {
    background: #f0f0f0;
    color: #333;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 40px;
  color: white;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  background: rgba(255, 0, 0, 0.1);
  color: #ff6b6b;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 0, 0, 0.3);
`;

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState({ status: '', notes: '' });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/orders`);
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (orderId, updates) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();
      
      if (data.success) {
        fetchOrders(); // Refresh the list
        setShowModal(false);
        setSelectedOrder(null);
      } else {
        setError('Failed to update order');
      }
    } catch (err) {
      setError('Error updating order');
    }
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setEditForm({ status: order.status, notes: order.notes || '' });
    setShowModal(true);
  };

  const handleSaveOrder = () => {
    if (selectedOrder) {
      updateOrder(selectedOrder.orderId, editForm);
    }
  };

  const getStats = () => {
    const total = orders.length;
    const newOrders = orders.filter(order => order.status === 'New').length;
    const processing = orders.filter(order => order.status === 'Processing').length;
    const delivered = orders.filter(order => order.status === 'Delivered').length;

    return { total, newOrders, processing, delivered };
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const stats = getStats();

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingSpinner>Loading orders...</LoadingSpinner>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>Order Management Dashboard</Title>
        <RefreshButton onClick={fetchOrders}>
          <FaSync /> Refresh Orders
        </RefreshButton>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <StatsGrid>
        <StatCard>
          <StatNumber>{stats.total}</StatNumber>
          <StatLabel>Total Orders</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.newOrders}</StatNumber>
          <StatLabel>New Orders</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.processing}</StatNumber>
          <StatLabel>Processing</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.delivered}</StatNumber>
          <StatLabel>Delivered</StatLabel>
        </StatCard>
      </StatsGrid>

      <OrdersTable>
        <TableHeader>
          <div>Order ID</div>
          <div>Customer</div>
          <div>Phone</div>
          <div>Total</div>
          <div>Status</div>
          <div>Date</div>
          <div>Actions</div>
        </TableHeader>

        {orders.map((order) => (
          <TableRow key={order.id}>
            <div>{order.orderId}</div>
            <div>{order.customerName}</div>
            <div>{order.phone}</div>
            <div>${order.totalPrice}</div>
            <div>
              <StatusBadge status={order.status}>{order.status}</StatusBadge>
            </div>
            <div>{order.date}</div>
            <div>
              <ActionButton onClick={() => handleEditOrder(order)} title="Edit Order">
                <FaEdit />
              </ActionButton>
            </div>
          </TableRow>
        ))}
      </OrdersTable>

      {showModal && selectedOrder && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Edit Order: {selectedOrder.orderId}</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
            </ModalHeader>

            <FormGroup>
              <Label>Customer Name</Label>
              <Input value={selectedOrder.customerName} disabled />
            </FormGroup>

            <FormGroup>
              <Label>Phone</Label>
              <Input value={selectedOrder.phone} disabled />
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input value={selectedOrder.email} disabled />
            </FormGroup>

            <FormGroup>
              <Label>Address</Label>
              <TextArea value={selectedOrder.address} disabled />
            </FormGroup>

            <FormGroup>
              <Label>Customization Details</Label>
              <TextArea value={selectedOrder.customizationDetails} disabled />
            </FormGroup>

            <FormGroup>
              <Label>Status</Label>
              <Select
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
              >
                <option value="New">New</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Notes</Label>
              <TextArea
                value={editForm.notes}
                onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                placeholder="Add notes about this order..."
              />
            </FormGroup>

            <ButtonGroup>
              <Button className="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button className="primary" onClick={handleSaveOrder}>
                Save Changes
              </Button>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </DashboardContainer>
  );
}

export default AdminDashboard;

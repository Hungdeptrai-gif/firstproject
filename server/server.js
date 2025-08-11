const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Google Sheets configuration
const auth = new google.auth.GoogleAuth({
  keyFile: './credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Spreadsheet ID - you'll need to create this and update the ID
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// Debug: Check if environment variables are loaded
console.log('Environment variables loaded:');
console.log('GOOGLE_SHEET_ID:', SPREADSHEET_ID);
console.log('PORT:', PORT);

// Initialize spreadsheet with headers
async function initializeSpreadsheet() {
  try {
    const headers = [
      'Order ID',
      'Date',
      'Customer Name',
      'Phone',
      'Email',
      'Address',
      'Product Type',
      'Customization Details',
      'Total Price',
      'Status',
      'Notes'
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A1:K1',
      valueInputOption: 'RAW',
      resource: {
        values: [headers]
      }
    });

    console.log('Spreadsheet initialized with headers');
  } catch (error) {
    console.error('Error initializing spreadsheet:', error);
  }
}

// Add order to Google Sheets
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    
    // Generate order ID
    const orderId = `ORD-${Date.now()}`;
    const currentDate = new Date().toLocaleString('vi-VN');
    
    // Format customization details
    const customizationDetails = formatCustomizationDetails(orderData.items);
    
    // Prepare row data
    const rowData = [
      orderId,
      currentDate,
      orderData.customerName,
      orderData.phone,
      orderData.email,
      orderData.address,
      'Lego Art Custom',
      customizationDetails,
      orderData.totalPrice,
      'New',
      orderData.notes || ''
    ];

    // Append to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:K',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [rowData]
      }
    });

    res.json({ 
      success: true, 
      orderId: orderId,
      message: 'Order saved successfully' 
    });

  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save order' 
    });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A2:K',
    });

    const orders = response.data.values || [];
    const formattedOrders = orders.map((row, index) => ({
      id: index + 1,
      orderId: row[0],
      date: row[1],
      customerName: row[2],
      phone: row[3],
      email: row[4],
      address: row[5],
      productType: row[6],
      customizationDetails: row[7],
      totalPrice: row[8],
      status: row[9],
      notes: row[10]
    }));

    res.json({ success: true, orders: formattedOrders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Return empty orders array instead of error for better UX
    res.json({ success: true, orders: [] });
  }
});

// Update order status
app.put('/api/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, notes } = req.body;

    // Find the row with the order ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:K',
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => row[0] === orderId);

    if (rowIndex === -1) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    // Update status and notes
    const updates = [];
    if (status) {
      updates.push({
        range: `Sheet1!J${rowIndex + 1}`,
        values: [[status]]
      });
    }
    if (notes !== undefined) {
      updates.push({
        range: `Sheet1!K${rowIndex + 1}`,
        values: [[notes]]
      });
    }

    if (updates.length > 0) {
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        resource: {
          valueInputOption: 'RAW',
          data: updates
        }
      });
    }

    res.json({ success: true, message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ success: false, error: 'Failed to update order' });
  }
});

// Helper function to format customization details
function formatCustomizationDetails(items) {
  if (!items || items.length === 0) return 'No items';
  
  return items.map(item => {
    const details = [];
    if (item.version) details.push(`Version: ${item.version}`);
    if (item.background) details.push(`Background: ${item.background}`);
    if (item.clothes) details.push(`Clothes: ${item.clothes}`);
    if (item.face) details.push(`Face: ${item.face}`);
    if (item.hairstyle) details.push(`Hairstyle: ${item.hairstyle}`);
    if (item.hat) details.push(`Hat: ${item.hat}`);
    if (item.accessories) details.push(`Accessories: ${item.accessories}`);
    if (item.pet) details.push(`Pet: ${item.pet}`);
    if (item.shipping) details.push(`Shipping: ${item.shipping}`);
    
    return `Qty: ${item.quantity} - ${details.join(', ')}`;
  }).join('; ');
}

// Initialize spreadsheet on startup (non-blocking)
initializeSpreadsheet().catch(error => {
  console.log('Spreadsheet initialization failed, but server will continue running');
  console.log('You can still use the application, but orders won\'t be saved to Google Sheets');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
});

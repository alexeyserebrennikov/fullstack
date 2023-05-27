const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await sequelize.query('SELECT * FROM Orders', {
      type: QueryTypes.SELECT
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { user_id, order_date, total_amount, status } = req.body;
    await sequelize.query(
      'INSERT INTO Orders (user_id, order_date, total_amount, status) VALUES (?, ?, ?, ?)',
      {
        replacements: [user_id, order_date, total_amount, status],
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json({ message: 'Order created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await sequelize.query('SELECT * FROM Orders WHERE order_id = ?', {
      replacements: [id],
      type: QueryTypes.SELECT
    });
    if (orders.length === 0) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.json(orders[0]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, order_date, total_amount, status } = req.body;
    const result = await sequelize.query(
      'UPDATE Orders SET user_id = ?, order_date = ?, total_amount = ?, status = ? WHERE order_id = ?',
      {
        replacements: [user_id, order_date, total_amount, status, id],
        type: QueryTypes.UPDATE
      }
    );
    if (result[1] === 0) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.json({ message: 'Order updated' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sequelize.query('DELETE FROM Orders WHERE order_id = ?', {
      replacements: [id],
      type: QueryTypes.DELETE
    });
    if (result[1] === 0) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.json({ message: 'Order deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

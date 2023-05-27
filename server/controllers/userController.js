const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await sequelize.query('SELECT * FROM Users', {
      type: QueryTypes.SELECT
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, registration_date, age, country } = req.body;
    await sequelize.query(
      'INSERT INTO Users (username, email, registration_date, age, country) VALUES (?, ?, ?, ?, ?)',
      {
        replacements: [username, email, registration_date, age, country],
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await sequelize.query('SELECT * FROM Users WHERE user_id = ?', {
      replacements: [id],
      type: QueryTypes.SELECT
    });
    if (users.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(users[0]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, registration_date, age, country } = req.body;
    const result = await sequelize.query(
      'UPDATE Users SET username = ?, email = ?, registration_date = ?, age = ?, country = ? WHERE user_id = ?',
      {
        replacements: [username, email, registration_date, age, country, id],
        type: QueryTypes.UPDATE
      }
    );
    if (result[1] === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User updated' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sequelize.query('DELETE FROM Users WHERE user_id = ?', {
      replacements: [id],
      type: QueryTypes.DELETE
    });
    if (result[1] === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

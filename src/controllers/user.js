require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error({ message: 'JWT_SECRET undefined' });
}

const userService = require('../services/user');

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const result = await userService.create({ displayName, email, password, image });

    if (result.error) {
      return res.status(result.error.code).json({ message: result.error.message });
    }

    const token = jwt.sign({ email }, JWT_SECRET);
    
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  create,
};

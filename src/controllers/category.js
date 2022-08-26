const categoryService = require('../services/category');

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  const result = await categoryService.create(name);

  return res.status(201).json(result);
};

const getAll = async (req, res) => {
  const result = await categoryService.getAll();

  return res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
};

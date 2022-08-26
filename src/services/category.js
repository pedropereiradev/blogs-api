const { Category } = require('../database/models');

const create = async (name) => Category.create({ name });

module.exports = {
  create,
};

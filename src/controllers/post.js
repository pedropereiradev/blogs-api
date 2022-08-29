const postService = require('../services/post');

const create = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { userEmail } = req;

    const result = await postService.create({ title, content, categoryIds, userEmail });

    if (result.error) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAll = async (req, res) => {
  const result = await postService.getAll();

  return res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
};

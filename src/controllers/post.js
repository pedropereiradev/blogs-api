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

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await postService.getById(id);

  if (!result) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(result);
};

const update = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const { userEmail } = req;

    const result = await postService.update({ title, content, id, userEmail });

    if (result.error) {
      return res.status(result.error.code).json({ message: result.error.message });
    }

    return res.status(200).json(result);
  } catch (error) {
     return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const { userEmail } = req;

    const result = await postService.destroy({ id, userEmail });

    if (result.error) {
      return res.status(result.error.code).json({ message: result.error.message });
    }

    return res.status(204).end();
  } catch (error) {
     return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy,
};

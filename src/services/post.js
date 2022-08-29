const Sequelize = require('sequelize');
const config = require('../database/config/config');
const { BlogPost, Category, User, PostCategory } = require('../database/models');

const sequelize = new Sequelize(config.development);

const getUserId = async (email) => {
  const { dataValues } = await User.findOne({ where: { email } });
  
  return dataValues.id;
};

const validateCategory = async (categories, t) => {
  const result = await Category.findAll({ where: { id: categories }, transaction: t });

  if (result.length !== categories.length) {
    throw new Error();
  }

  return true;
};

const createPostCategory = async ({ postId, categories, t }) => {
  const data = [];

  categories.forEach((category) => data.push({ postId, categoryId: category }));
  
  await PostCategory.bulkCreate(
    data,
    { transaction: t },
  );
};

const create = async ({ title, content, categoryIds, userEmail }) => {
  const t = await sequelize.transaction();

  try {
    await validateCategory(categoryIds);

    const userId = await getUserId(userEmail);

    const createDate = new Date();

    const blogPostResult = await BlogPost.create(
      { title, content, userId, published: createDate, updated: createDate },
      { transaction: t },
    );

    await createPostCategory({ postId: blogPostResult.dataValues.id, categories: categoryIds, t });

    await t.commit();
    
    return blogPostResult;
  } catch (error) {
    await t.rollback();

    console.log(error.message);

    return { error: { code: 404, message: '"categoryIds" not found' } };
  }
};

const getAll = async () => BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password'],
        },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
});
  
const getById = async (id) => BlogPost.findOne({
  where: { id },
  include: [
    {
      model: User,
      as: 'user',
      attributes: {
        exclude: ['password'],
      },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
  ],
});

const validatePostOwner = async (email, id) => {
  const userId = await getUserId(email);

  const post = await getById(id);

  if (post.dataValues.userId !== userId) {
    return false;
  }

  return true;
};

const update = async ({ title, content, id, userEmail }) => {
  const isPostFromUser = await validatePostOwner(userEmail, id);
  
  if (!isPostFromUser) {
    return { error: { code: 401, message: 'Unauthorized user' } };
  }

  const updated = new Date();

  await BlogPost.update(
    { title, content, updated },
    {
      where: {
        id,
      },
    },
  );

  const updatedPost = await getById(id);

  return updatedPost;
};

const destroy = async ({ id, userEmail }) => {
  const isPostExists = await getById(id);
  
  if (!isPostExists) {
    return { error: { code: 404, message: 'Post does not exist' } };
  }
  
  const isPostFromUser = await validatePostOwner(userEmail, id);
  
  if (!isPostFromUser) {
    return { error: { code: 401, message: 'Unauthorized user' } };
  }

  await BlogPost.destroy({
    where: {
      id,
    },
  });

  return {};
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy,
};

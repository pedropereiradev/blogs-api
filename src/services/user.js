const { User } = require('../database/models');

const validateUser = async (email) => User.findOne({
  where: {
    email,
  },
});

const getUser = async ({ email, password }) => {
  const result = await User.findOne({
    where: {
      email,
      password,
    },
  });

  if (!result) {
    return { error: { code: 400, message: 'Invalid fields' } };
  }

  return true;
};

const create = async ({ displayName, email, password, image }) => {
  const isEmailAlreadyInUse = await validateUser(email);

  if (isEmailAlreadyInUse) {
    return { error: { code: 409, message: 'User already registered' } };
  }

  await User.create({ displayName, email, password, image });

  return {};
};

module.exports = {
  getUser,
  create,
};
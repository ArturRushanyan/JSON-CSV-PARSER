const prisma = require("../../configs/prismaInstance");

const getAccountByEmail = async (email) => {
  return prisma.accounts.findFirst({
    omit: {
      createdAt: true,
      updatedAt: true,
    },
    where: {
      email,
    },
  });
};

module.exports = {
  getAccountByEmail,
};

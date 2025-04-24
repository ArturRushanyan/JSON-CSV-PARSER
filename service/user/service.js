const prisma = require("../../configs/prismaInstance");

const getUserByApiKey = async (apiKey) => {
  return prisma.user.findUnique({
    where: {
      apiKey,
    },
    include: {
      subscriptionLimits: true,
      userSecrets: true,
    },
  });
};

const incrementUserRequestsCount = async (userId) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      requestCount: {
        increment: 1,
      },
    },
  });
};

module.exports = {
  getUserByApiKey,
  incrementUserRequestsCount,
};

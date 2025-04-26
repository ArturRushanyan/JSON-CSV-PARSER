const prisma = require("../../configs/prismaInstance");
const { v4: uuidv4 } = require("uuid");

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

const registerNewUser = async (data) => {
  try {
    let user;
    await prisma.$transaction(async (tx) => {
      const userSecret = await tx.userSecrets.create({
        data: {},
      });

      user = await tx.user.create({
        data: {
          email: data.email,
          apiKey: uuidv4(),
          requestCount: 0,
          allowedIps: [],
          subscriptionLimits: {
            connect: {
              id: data.subscriptionId,
            },
          },
          userSecrets: {
            connect: {
              id: userSecret.id,
            },
          },
        },
      });
    });

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserByApiKey,
  incrementUserRequestsCount,
  registerNewUser,
};

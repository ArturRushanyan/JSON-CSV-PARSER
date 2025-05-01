const prisma = require("../../configs/prismaInstance");

const getSubscriptionById = async (id) => {
  return prisma.subscriptionLimits.findFirst({
    where: { id },
  });
};

module.exports = {
  getSubscriptionById,
};

import { auth } from "@clerk/nextjs";
import prismaDB from "./db";

export const MAX_FREE_COUNTS = 10;

export const incrementApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismaDB.apiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userApiLimit) {
    await prismaDB.apiLimit.update({
      where: { userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prismaDB.apiLimit.create({
      data: { userId, count: 1 },
    });
  }
};

export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismaDB.apiLimit.findUnique({
    where: { userId },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else return false;
};

export const getApiLimitCount = async () => {
  const { userId } = auth();
  if (!userId) {
    return 0;
  }

  const userApiLimit = await prismaDB.apiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userApiLimit) {
    return 0;
  }
  return userApiLimit.count;
};

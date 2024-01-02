import { auth } from "@clerk/nextjs";
import prismaDB from "./db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }
  const userSub = await prismaDB.userSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeCustomerId: true,
      stripePriceId: true,
      stripeSubscriptionEnd: true,
      stripeSubscriptionId: true,
    },
  });

  if (!userSub) {
    return false;
  }

  const isValid =
    userSub.stripePriceId &&
    userSub.stripeSubscriptionEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};

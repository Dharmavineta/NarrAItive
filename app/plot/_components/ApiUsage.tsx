import {
  MAX_FREE_COUNTS,
  checkApiLimit,
  getApiLimitCount,
} from "@/lib/api-limit";
import React from "react";
import { Button } from "@/components/ui/button";
import SubscriptionButton from "@/app/settings/_components/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";
import Link from "next/link";
import { Settings } from "lucide-react";

const ApiUsage = async () => {
  const isApiLimit = await checkApiLimit();

  const isPro = await checkSubscription();

  const apiCount = await getApiLimitCount();

  return (
    <div className="flex items-center gap-x-5  border-b py-5 justify-between px-10">
      <div className="flex gap-x-5 items-center">
        <SubscriptionButton isPro={isPro} />

        <p className="font-semibold text-xl capitalize">
          {isPro
            ? "You're a pro user"
            : "you&apos;ve {MAX_FREE_COUNTS - apiCount} free credits remaining"}
        </p>
      </div>
      <Button asChild variant={"outline"}>
        <Link href="/settings">
          <Settings className="w-4 h-4 mr-2" />
          Account
        </Link>
      </Button>
    </div>
  );
};

export default ApiUsage;

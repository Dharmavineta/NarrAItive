import { Button } from "@/components/ui/button";
import { checkSubscription } from "@/lib/subscription";
import { Settings2, SettingsIcon } from "lucide-react";
import React from "react";
import SubscriptionButton from "./_components/SubscriptionButton";

const Settings = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <div className="px-10 py-5 flex gap-x-2 items-center">
        <div className="bg-sky-100 dark:bg-slate-800 dark:text-sky-500 p-2 rounded-full w-12 flex items-center justify-center h-12">
          <SettingsIcon className="w-7 h-7" />
        </div>
        <h1 className="font-bold text-xl">Settings</h1>
      </div>
      <div className="px-10 text-muted-foreground">
        <p className="font-bold">
          {isPro
            ? "You're currently on a pro plan"
            : "You are currently on a free plan"}
        </p>
      </div>
      <div className="px-10 py-5">
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default Settings;

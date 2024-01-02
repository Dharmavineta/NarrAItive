"use client";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import React, { FC } from "react";
import axios from "axios";
import { toast } from "sonner";

type props = {
  isPro: boolean;
};

const onSubscribe = async () => {
  try {
    const response = await axios.get("/api/stripe");
    window.location.href = response.data.url;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
const SubscriptionButton: FC<props> = ({ isPro }) => {
  return (
    <Button
      onClick={onSubscribe}
      variant={"outline"}
      className="flex items-center"
    >
      {isPro ? "Manage your subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2" />}
    </Button>
  );
};

export default SubscriptionButton;

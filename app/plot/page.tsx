import React from "react";
import ApiUsage from "./_components/ApiUsage";
import ChatWIndow from "./_components/ChatWIndow";
import { getApiLimitCount } from "@/lib/api-limit";

const Plot = async () => {
  const count = await getApiLimitCount();

  return (
    <div className="w-full h-full">
      <ApiUsage />
      <ChatWIndow />
    </div>
  );
};

export default Plot;

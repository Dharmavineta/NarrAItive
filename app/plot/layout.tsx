import Navbar from "@/components/ui-components/Navbar";
import React, { FC } from "react";
import PremiumDialog from "@/components/ui-components/pro-dialog";

type props = {
  children: React.ReactNode;
};
const layout: FC<props> = ({ children }) => {
  return (
    <div className="h-full">
      <Navbar />
      <PremiumDialog />
      <main className="flex py-16 h-full">{children}</main>
    </div>
  );
};

export default layout;

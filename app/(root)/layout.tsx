import Navbar from "@/components/ui-components/Navbar";
import React, { FC } from "react";

type props = {
  children: React.ReactNode;
};

const layout: FC<props> = ({ children }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="pt-16 h-full">{children}</main>
    </div>
  );
};

export default layout;

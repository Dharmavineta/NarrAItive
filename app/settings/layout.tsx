import Navbar from "@/components/ui-components/Navbar";
import React, { FC } from "react";
type props = {
  children: React.ReactNode;
};

const layout: FC<props> = ({ children }) => {
  return (
    <div>
      <Navbar />

      <div className="py-16">{children}</div>
    </div>
  );
};

export default layout;

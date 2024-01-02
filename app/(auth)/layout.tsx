import React, { FC } from "react";

type props = {
  children: React.ReactNode;
};
const layout: FC<props> = ({ children }) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      {children}
    </div>
  );
};

export default layout;

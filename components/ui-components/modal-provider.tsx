"use client";
import React, { useEffect, useState } from "react";
import PremiumDialog from "./pro-dialog";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <PremiumDialog />
    </div>
  );
};

export default ModalProvider;

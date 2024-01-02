"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { store } from "@/store/store";
import { Button } from "../ui/button";
import axios from "axios";

const PremiumDialog = () => {
  const [isOpen, onOpen, onClose] = store((state) => [
    state.isOpen,
    state.onOpen,
    state.onClose,
  ]);
  const [loading, setLoading] = useState(false);
  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      setLoading(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade To Premium</DialogTitle>
        </DialogHeader>
        <div className="font-semibold text-muted-foreground">
          You&apos;ve exhausted your free trial, please upgrade to premium to
          continue using our services
        </div>
        <Button disabled={loading} className="mt-5" onClick={onSubscribe}>
          Upgrade to Premium
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumDialog;

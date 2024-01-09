"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import PlotMessages from "./PlotMessages";
import { useRouter } from "next/navigation";
import { store } from "@/store/store";
import { toast } from "sonner";
import axios from "axios";

const ChatWIndow = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [res, setRes] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const onOpen = store((state) => state.onOpen);
  const formSchema = z.object({
    prompt: z.string().min(3, { message: "Please input a valid query" }),
  });

  type formSchemaType = z.infer<typeof formSchema>;

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  // const { messages, input, handleInputChange, handleSubmit } = useChat({
  //   api: "api/plot-ai",
  //   onError: (error) => {
  //     console.log(error.message);
  //     if (error.message === "403") {
  //       onOpen();
  //     }
  //   },
  //   onResponse: () => {
  //     router.refresh();
  //   },
  // });
  const generateId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (input === "" || input.length <= 1) {
      return toast.error("Please input a plot");
    }
    const userCommonId = generateId();
    const aiCommonId = generateId();
    setRes([...res, { id: userCommonId, role: "user", content: input }]);

    try {
      setLoading(true);
      const response = await axios.post("/api/plot-ai", { prompt: input });

      if (response.status === 200) {
        setRes([
          ...res,
          { id: userCommonId, role: "user", content: input },
          {
            id: aiCommonId,
            role: "ai",
            content: response?.data?.kwargs?.content,
          },
        ]);
        router.refresh();
        setInput("");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.status === 403) {
        onOpen();
        toast.error("Please upgrade to premium");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 h-28 w-full flex justify-center border-t items-center bg-white dark:bg-slate-800 ">
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col md:flex-row md:gap-x-3 px-10 max-w-5xl w-full gap-y-5 md:gap-y-0"
        >
          <Input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Enter your plot here..."
            className=" dark:border-white dark:placeholder:text-gray-200"
          />
          <Button type="submit">Generate</Button>
        </form>
      </div>
      <div className="max-w-5xl mx-auto px-10 pb-36">
        <PlotMessages messages={res} loading={loading} />
      </div>
    </>
  );
};

export default ChatWIndow;

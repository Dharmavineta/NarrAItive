import { useUser } from "@clerk/nextjs";
import { Message } from "ai/react";
import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type props = {
  messages: Message[];
  loading: boolean;
};

const PlotMessages: FC<props> = ({ messages, loading }) => {
  const { user } = useUser();
  return (
    <div className="space-y-4 mt-5 ">
      {messages.map((m) => (
        <div key={m.id} className="">
          <div
            className={`flex items-center gap-x-2 w-fit ${
              m.role === "user" ? "ml-auto" : ""
            }`}
          >
            <div
              className={`rounded-full h-10 w-10 flex items-center justify-center text-white ${
                m.role === "user"
                  ? "bg-sky-800"
                  : "bg-neutral-950 dark:bg-slate-800"
              }`}
            >
              {m.role === "user" ? user?.fullName?.substring(0, 1) : "AI"}
            </div>
            <div
              className={`p-4 my-2 rounded-lg flex items-center justify-center w-fit rounded-tr-2xl rounded-bl-2xl ${
                m.role === "user"
                  ? "bg-yellow-100 dark:bg-cyan-950"
                  : "bg-gray-100 dark:bg-slate-900 "
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      className="text-blue-500 underline"
                    />
                  ),
                  pre: ({ node, ...props }) => (
                    <div className="overflow-auto w-full my-2 rounded-lg">
                      <pre {...props} />
                    </div>
                  ),
                }}
                className={"text-sm leading-7 overflow-hidden dark:text-white"}
              >
                {m.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlotMessages;

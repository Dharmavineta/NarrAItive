import { Button } from "@/components/ui/button";
import React from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="w-full px-10 h-[90%] flex items-center justify-center">
      <div className=" w-full  justify-center flex flex-col items-center space-y-8">
        <div className="flex flex-col items-center justify-center gap-y-5">
          {" "}
          <h1 className="text-4xl lg:text-6xl font-semibold">
            Narr
            <span className="font-bold lg:text-7xl text-5xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-sky-500">
              AI
            </span>
            tive
          </h1>
          <p className="text-center max-w-xl lg:max-w-2xl font-semibold lg:text-xl">
            Whispering a plot – a cryptic clue, a fantastical setting, a
            character&apos;s heartbeat – and our AI conjures an entire universe
            around it.
          </p>
        </div>

        <Button size={"lg"} className="">
          <Link href={"/plot"} className="flex items-center">
            Start Plotting <Sparkles className="w-4 h-4 ml-2" />{" "}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;

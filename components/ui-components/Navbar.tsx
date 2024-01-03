import React, { Suspense } from "react";
import { ModeToggle } from "./dark-mode-toggle";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

const LazyLoginButton = dynamic(() => import("./LoginButton"), { ssr: false });

const Navbar = () => {
  return (
    <div className="fixed bg-white dark:bg-slate-800 border-b w-full flex top-0 left-0 h-16 items-center justify-between px-11 lg:px-32">
      <div className="flex gap-x-5 items-center">
        <Link href={"/"} className="flex items-center gap-x-2">
          <Image src={"/logo.svg"} alt="/" width={25} height={25} />
          <p className="text-md">
            Narr
            <span className="bg-clip-text text-lg font-bold text-transparent bg-gradient-to-bl from-rose-400 via-sky-400 to-orange-400">
              AI
            </span>
            tive
          </p>
        </Link>
      </div>
      <div className="flex items-center space-x-5">
        <ModeToggle />
        {/* <Suspense fallback={<p>Loading...</p>}> */}
        <LazyLoginButton />
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default Navbar;

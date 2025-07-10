"use client"
import Link from 'next/link';
import React from 'react';
import { michroma } from '../layout';
import {signOut} from "next-auth/react";
import { usePathname } from 'next/navigation';


const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="w-full text-white flex items-center justify-between px-6 md:px-14 py-4 backdrop-blur-md shadow-lg">
      <h1 className={`${michroma.className} text-3xl md:text-4xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text animate-pulse`}>
        PinDrop
      </h1>

      <div className="flex items-center gap-6 md:gap-10">
         <Link
        href={"/"}
        className={`text-lg md:text-xl transition duration-200 hover:underline underline-offset-4 hover:scale-105 font-semibold ${
          pathname === "/" ? "text-cyan-400" : "text-white/90"
        }`}
      >
        Dashboard
      </Link>

      <Link
        href={"/profile"}
        className={`text-lg md:text-xl transition duration-200 hover:underline underline-offset-4 hover:scale-105 font-semibold ${
          pathname === "/profile" ? "text-cyan-400" : "text-white/90"
        }`}
      >
        Profile
        </Link>
      <Link
        href={"/settings"}
        className={`text-lg md:text-xl transition duration-200 hover:underline underline-offset-4 hover:scale-105 font-semibold ${
          pathname === "/settings" ? "text-cyan-400" : "text-white/90"
        }`}
      >
        Settings
        </Link>

        <button onClick={signOut} className="bg-red-600 hover:bg-red-700 transition duration-200 px-5 py-2 md:px-6 md:py-2.5 rounded-xl text-sm md:text-md font-bold shadow-md hover:scale-105">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

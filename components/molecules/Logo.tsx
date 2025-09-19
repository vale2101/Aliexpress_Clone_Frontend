"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link 
      href="/"
      className="text-lg sm:text-xl lg:text-2xl font-bold flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer block p-1 sm:p-2 -m-1 sm:-m-2"
    >
      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-sm flex items-center justify-center mr-1">
        <span className="text-yellow-800 text-xs sm:text-sm font-bold">★</span>
      </div>
      <span className="text-black select-none">AliExpress</span>
    </Link>
  )
}

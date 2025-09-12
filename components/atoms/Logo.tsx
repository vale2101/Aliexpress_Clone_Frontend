"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link 
      href="/"
      className="text-2xl font-bold flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer block p-2 -m-2"
    >
      <div className="w-6 h-6 bg-yellow-400 rounded-sm flex items-center justify-center mr-1">
        <span className="text-yellow-800 text-sm font-bold">★</span>
      </div>
      <span className="text-black select-none">AliExpress</span>
    </Link>
  )
}

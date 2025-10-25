"use client";

import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center hover:opacity-80 transition-opacity cursor-pointer block p-1 sm:p-2 -m-1 sm:-m-2"
    >
      <div className="relative w-40 h-10 sm:w-48 sm:h-12 lg:w-56 lg:h-14">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ25hS7fcv2sf2qizE-5_cSLHxJjvr2te4c0g&s"
          alt="AliExpress Logo"
          fill
          className="object-contain"
        />
      </div>
    </Link>
  );
}
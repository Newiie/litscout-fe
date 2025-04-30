import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="w-full bg-[#181818] px-8 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
      <div className="text-2xl flex gap-2 items-center font-bold text-[#F2994A] tracking-tight">
        <div className="inline-block bg-[#F2994A] rounded-[4px]">
          <Image
            src="/LS_LOGO.png"
            alt="Litscout"
            width={40}
            height={40}
            className="inline-block"
          />
        </div>
        Litscout
      </div>
      <div className="flex gap-6 items-center">
        <Link
          href="/about"
          className="text-white hover:text-[#F2994A] font-medium transition-colors"
        >
          About
        </Link>
        <Link
          href="/login"
          className="text-white hover:text-[#F2994A] font-medium transition-colors"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

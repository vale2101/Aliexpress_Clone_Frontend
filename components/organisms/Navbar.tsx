import React from "react";
import Logo from "../atoms/Logo";
import SearchBar from "../molecules/SearchBar";
import IconGroup from "../molecules/IconGroup";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 flex items-center gap-6 h-16">
        <Logo />
        {/* el buscador centrado */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>
        </div>
        <IconGroup />
      </div>
    </nav>
  );
};
export default Navbar;

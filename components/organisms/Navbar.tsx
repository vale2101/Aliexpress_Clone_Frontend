import React from "react";
import Logo from "../molecules/Logo";
import SearchBar from "../molecules/SearchBar";
import IconGroup from "./IconGroup";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-full mx-auto px-2 sm:px-4 flex items-center gap-2 sm:gap-4 lg:gap-6 h-14 sm:h-16">
        <div className="flex-shrink-0">
          <Logo />
        </div>
        
        <div className="flex-1 flex justify-center max-w-sm sm:max-w-lg lg:max-w-4xl xl:max-w-5xl mx-2">
          <SearchBar className="w-full" />
        </div>
        
        <div className="flex-shrink-0">
          <IconGroup />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

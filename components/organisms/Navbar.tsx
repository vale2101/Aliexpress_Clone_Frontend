import React from "react";
import Logo from "../atoms/Logo";
import SearchBar from "../molecules/SearchBar";
import IconGroup from "../molecules/IconGroup";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 shadow-md bg-white">
      <div className="flex items-center gap-6">
        <Logo />
        <SearchBar />
      </div>
      <IconGroup />
    </nav>
  );
};

export default Navbar;

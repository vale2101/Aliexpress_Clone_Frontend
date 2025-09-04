import React from "react";
import Logo from "../atoms/Logo";
import SearchBar from "../molecules/SearchBar";
import IconGroup from "../molecules/IconGroup";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white">
      <div className="container-xl flex items-center gap-6 h-16">
        <Logo />
        {/* el buscador ahora ocupa todo el espacio central */}
        <div className="flex-1">
          <SearchBar />
        </div>
        <IconGroup />
      </div>
    </nav>
  );
};
export default Navbar;

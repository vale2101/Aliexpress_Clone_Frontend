import React from "react";

type NavItemProps = {
  label: string;
  href?: string;
};

const NavItem: React.FC<NavItemProps> = ({ label, href = "#" }) => {
  return (
    <a href={href} className="text-sm hover:text-orange-500 transition">
      {label}
    </a>
  );
};

export default NavItem;

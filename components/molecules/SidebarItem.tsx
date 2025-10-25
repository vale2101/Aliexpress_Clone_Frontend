import React from "react";
import Link from "next/link";
import Text from "../atoms/Typography";

type SidebarItemProps = {
  label: string;
  href?: string | null;
  active?: boolean;
  onClick?: () => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ label, href, active = false, onClick }) => {
  const className = `px-4 py-2 text-sm ${
    active ? "text-black border-l-4 border-orange-500 font-medium bg-neutral-100" : "text-neutral-600 hover:bg-neutral-50"
  }`;

  if (href) {
    return (
      <Link href={href} className={`block ${className}`}>
        <Text variant="body">{label}</Text>
      </Link>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${className} ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <Text variant="body">{label}</Text>
    </div>
  );
};

export default SidebarItem;

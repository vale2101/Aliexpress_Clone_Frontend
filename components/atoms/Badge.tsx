import React from "react";

type BadgeProps = {
  text: string;
};

const Badge: React.FC<BadgeProps> = ({ text }) => {
  return (
    <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full">
      {text}
    </span>
  );
};

export default Badge;

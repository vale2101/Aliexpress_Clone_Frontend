import React from "react";

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
};

const Avatar: React.FC<AvatarProps> = ({ src, alt = "avatar", size = "md" }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  };

  if (!src) {
    return (
      <div className={`rounded-full ${sizes[size]} border border-neutral-200 bg-gray-200 flex items-center justify-center`}>
        <span className="text-xs text-gray-500 font-medium">No Photo</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover ${sizes[size]} border border-neutral-200`}
    />
  );
};

export default Avatar;

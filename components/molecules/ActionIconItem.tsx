import React from "react";
import Icon from "../atoms/Icon";
import Text from "../atoms/Typography";
import { LucideIcon } from "lucide-react";

type ActionIconItemProps = {
  icon: LucideIcon;
  label: string;
};

const ActionIconItem: React.FC<ActionIconItemProps> = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer hover:opacity-80">
      <Icon icon={icon} size="lg" />
      <Text variant="small" className="mt-1">{label}</Text>
    </div>
  );
};

export default ActionIconItem;

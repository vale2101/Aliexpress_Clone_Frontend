import React from "react";
import Text from "../atoms/Typography";
import Button from "../atoms/Button";

type SectionHeaderProps = {
  title: string;
  showAction?: boolean;
  actionText?: string;
  onActionClick?: () => void;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  showAction = false, 
  actionText = "Ver todo", 
  onActionClick 
}) => {
  return (
    <div className="flex justify-between items-center mb-3">
      <Text variant="subtitle">{title}</Text>
      {showAction && (
        <Button variant="ghost" className="text-sm text-neutral-500" onClick={onActionClick}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default SectionHeader;

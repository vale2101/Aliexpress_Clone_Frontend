import React from "react";
import Text from "../atoms/Typography";
import Icon from "../atoms/Icon";
import { FileCheck, DollarSign } from "lucide-react";

const AccountActions: React.FC = () => {
  const actions = [
    { icon: FileCheck, label: "Apelaciones" },
    { icon: DollarSign, label: "Reembolsos y devoluciones" }
  ];

  return (
    <div className="bg-white p-6 rounded-lg mb-6">
      {actions.map((action, index) => (
        <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <Icon icon={action.icon} size="md" className="text-gray-600" />
            <Text variant="body">{action.label}</Text>
          </div>
          <span className="text-gray-400">→</span>
        </div>
      ))}
    </div>
  );
};

export default AccountActions;

import React from "react";
import Avatar from "../atoms/Avatar";
import Text from "../atoms/Typography";
import ActionIconItem from "./ActionIconItem";
import { Heart, Clock, Ticket, CreditCard } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const UserInfoCard: React.FC = () => {
  const { user } = useAuth();
  
  const actions = [
    { icon: Heart, label: "Lista de deseos" },
    { icon: Clock, label: "Visitas" },
    { icon: Ticket, label: "Cupones" },
    { icon: CreditCard, label: "Créditos de compra" }
  ];

  const userName = user ? `${user.nombre} ${user.apellido}` : "Usuario";
  const userEmail = user?.email || "";

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex items-center gap-4 mb-6">
        <Avatar size="lg" />
        <div>
          <Text variant="subtitle" className="font-bold">{userName}</Text>
          <Text variant="small" className="text-gray-500">{userEmail}</Text>
        </div>
      </div>
      <div className="flex justify-between">
        {actions.map((action, index) => (
          <ActionIconItem key={index} icon={action.icon} label={action.label} />
        ))}
      </div>
    </div>
  );
};

export default UserInfoCard;


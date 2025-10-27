import React from "react";
import Text from "../atoms/Typography";
import { Shield, Lock, ShieldCheck, Check } from "lucide-react";

const SecurityTrust: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-2xl font-bold text-yellow-400">Ali</div>
        <div className="text-2xl font-bold text-white">Express</div>
        <Check className="w-5 h-5 text-green-600" />
      </div>
      <Text variant="body" className="text-sm text-gray-600">
        AliExpress mantiene seguros tu información y tu pago
      </Text>
      <div className="flex gap-2 mt-3">
        <ShieldCheck className="w-5 h-5 text-gray-600" />
        <Lock className="w-5 h-5 text-gray-600" />
        <Shield className="w-5 h-5 text-gray-600" />
      </div>
    </div>
  );
};

export default SecurityTrust;


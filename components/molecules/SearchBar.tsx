import  Input  from "../atoms/Input";
import { Search } from "lucide-react";

export default function SearchBar({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center border rounded-full w-full overflow-hidden ${className}`}>
      <Input placeholder="gafas ia inteligentes xiaomi" className="border-none flex-1 h-11" />
      <button className="bg-black text-white px-4 py-2 flex items-center h-11">
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}

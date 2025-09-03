import  Input  from "../atoms/Input"
import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="flex items-center border rounded-full w-[500px] overflow-hidden">
      <Input placeholder="gafas ia inteligentes xiaomi" className="border-none flex-1" />
      <button className="bg-black text-white px-4 py-2 flex items-center">
        <Search className="w-5 h-5" />
      </button>
    </div>
  )
}

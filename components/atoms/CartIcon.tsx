import { ShoppingCart } from "lucide-react"

export default function CartIcon({ count }: { count: number }) {
  return (
    <div className="relative">
      <ShoppingCart className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  )
}

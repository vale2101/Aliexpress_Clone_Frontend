import { Link } from "react-router-dom"

export default function TextLink({ text, href }: { text: string; href: string }) {
  return (
    <Link to={href} className="hover:underline text-sm text-gray-700">
      {text}
    </Link>
  )
}

export default function FlagIcon({ country }: { country: "CO" | "ES" }) {
  return (
    <span className="text-xl">
      {country === "CO" ? "🇨🇴" : "🇪🇸"}
    </span>
  )
}

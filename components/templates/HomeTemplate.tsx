import NavBar from "../organisms/Navbar"

export default function HomeTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      <main className="p-6">{children}</main>
    </div>
  )
}

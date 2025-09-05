import NavBar from "../organisms/Navbar"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main>{children}</main>
    </div>
  )
}

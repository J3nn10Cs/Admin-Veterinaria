import { Outlet } from "react-router-dom"
export const AuthLoyaut = () => {
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-6">
        <Outlet/>
      </main>
    </>
  )
}

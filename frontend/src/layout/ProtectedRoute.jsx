import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

const ProtectedRoute = () => {
  //extraer auth -> informacion anteriormente registrada
  const {auth, loading} = useAuth()

  if(loading) return 'Cargando' 
  return (
    <>
      <Header/>
      {/* /* Si auth tiene algo muentra el outlet */}
      
      {auth?._id ? (
        <main className="container mx-auto mt-10">
          <Outlet/>
        </main>
      ) : <Navigate to="/"/> }

      <Footer/>
    </>
    
  )
}

export default ProtectedRoute
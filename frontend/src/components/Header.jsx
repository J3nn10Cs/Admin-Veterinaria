import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export const Header = () => {

  const {logOut} = useAuth()
  return (
    <>
      <header className="py-10 bg-blue-400">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
          <h1 className="font-bold text-center text-2xl text-indigo-200">Administrador de pacientes de {''}
            <span className="text-white font-bold">Veterinaria</span>
          </h1>

          <nav className="flex gap-6"> 
            <Link to="/admin" className="text-white text-xl font-bold"> Pacientes </Link>
            <Link to="/admin" className="text-white text-xl font-bold"> Perfil </Link>

            <button
              type="button"
              onClick={logOut}
            >
              <i className="fa-solid fa-right-from-bracket fa-xl text-white"></i>
            </button>
          </nav>
        </div>
      </header>
    </>
  )
}

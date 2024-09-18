import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useState } from "react"

export const Header = () => {
  const [showForm, setShowForm] = useState(false)
  const {logOut} = useAuth()
  return (
    <>
      <header className="py-10 bg-blue-400">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
          <h1 className="font-bold text-center text-2xl text-indigo-200">Administrador de pacientes de {''}
            <span className="text-white font-bold">Veterinaria</span>
          </h1>

          <button
            onClick={() => setShowForm(!showForm)}
            className=""
          >
            {showForm ? (<i className="fa-solid fa-xmark bg-blue-400 rounded-full mb-4 text-white p-2 mt-3 lg:hidden"></i>
          ) : (<i className="fa-solid fa-bars lg:hidden bg-blue-400 rounded-full text-white p-2 mb-0"></i>)}
          </button>

          <nav className={`${showForm ? 'flex flex-col items-center gap-3' : 'hidden' } flex gap-6 lg:flex-row lg:flex `}> 
            <Link to="/admin" className="text-white text-xl font-bold"> Pacientes </Link>
            <Link to="/profile" className="text-white text-xl font-bold"> Perfil </Link>

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

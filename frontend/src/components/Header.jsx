import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useEffect, useState } from "react"

export const Header = () => {
  const [showForm, setShowForm] = useState(false)
  const [monn, setMoon] = useState(false)
  const {logOut} = useAuth()

  useEffect(() => {
    if(monn){
      document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.remove('dark');
    }

  },[monn])
  return (
    <>
      <header className="py-10 bg-blue-400">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
          
            <Link
              to="/admin"
            >
              <h1 className="font-bold text-center text-2xl text-indigo-200">Administrador de pacientes de {''}
                <span className="text-white font-bold ">Veterinaria</span>
              </h1>
            </Link>
          

          <button
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? (
              <i className="fa-solid fa-xmark bg-blue-400 rounded-full mb-4 text-white p-2 mt-3 lg:hidden dark:text-black"></i>
            ):(
              <i className="fa-solid fa-bars lg:hidden bg-blue-400 rounded-full text-white p-2 mb-0 dark:text-black"></i>
              )}
          </button>

          <nav className={`${showForm ? 'flex flex-col items-center gap-3' : 'hidden' } flex gap-6 lg:flex-row lg:flex `}> 

              {/* pacientes */}
            <Link to="/admin" className="text-white text-xl font-bold dark:text-gray-600"> Pacientes </Link>

              {/* THEMA */}
            <button
              onClick={() => setMoon(!monn)}
            >
              {monn ? (
                <i className="fa-solid fa-sun fa-lg text-white dark:text-gray-600"></i>
              ):(
                <i className="fa-solid fa-moon fa-lg text-white"></i>
              )}
            </button>

              {/* perfil */}
            <Link to="/admin/profile" className="text-white text-xl font-bold dark:text-gray-600"> Perfil </Link>

              {/* cerrar sesion */}
            <button
              type="button"
              onClick={logOut}
            >
              <i className="fa-solid fa-right-from-bracket fa-xl text-white dark:text-gray-600"></i>
            </button>

          </nav>
        </div>
      </header>
    </>
  )
}

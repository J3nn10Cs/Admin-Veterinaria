import { Link } from "react-router-dom"
import { Title } from "../components/Title"
export const Register = () => {
  return (
    <>
      <Title/>

      <div className="mt-20 md:mt-2 shadow-lg px-5 py-10 rounded-lg bg-white">
        <form action="">
          <div className="my-5">
            <label htmlFor=""
              className=" text-gray-600 block text-xl font-bold"
            >
              Name
            </label>
            <input
              type="text"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Your name"
            />
          </div>
          <div className="my-5">
            <label htmlFor=""
              className=" text-gray-600 block text-xl font-bold"
            >
              Email
            </label>
            <input
              type="email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Your email"
            />
          </div>
          <div className="my-5">
            <label htmlFor=""
              className=" text-gray-600 block text-xl font-bold"
            >
              Paassword
            </label>
            <input
              type="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Your password"
            />
          </div>  
          <div className="my-5">
            <label htmlFor=""
              className=" text-gray-600 block text-xl font-bold"
            >
              Repeat password
            </label>
            <input
              type="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Repeat your password"
            />
          </div>  

          <input type="submit" value="Iniciar Sesión"
            className="bg-indigo-600 w-full rounded-xl text-white font-extrabold py-3 px-10 mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav 
          className="mt-6 lg:flex lg:justify-between"
        >
          <Link 
            className="block text-center my-5 text-gray-500"
            to="/">Ya tienes una cuenta? Inicia sesión
          </Link>
          <Link 
            className="block text-center my-5 text-gray-500"
            to="/forget-password">Olvide mi contraseña
          </Link>
        </nav>
      </div>
    </>
  )
}

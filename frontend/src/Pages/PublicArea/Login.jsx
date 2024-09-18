import { Link, useNavigate } from "react-router-dom"
import { Title } from "../../components/Title"
import { useState } from "react"
import { Alerta } from "../../components/Alerta"
import clientAxios from "../../config/axios"
import useAuth from "../../hooks/useAuth"
export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})

  const {setAuth} = useAuth();

  //redireccionar al usuaerio
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if([email,password].includes('')){
      setAlert({msg: 'Todos los campos son obligatorios', type: true})
      return
    }

    //evaluar si el usuario existe
    try {
      //le pasamos el email y pass
      const {data} = await clientAxios.post('/veterinaries/login', {email,password})
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/admin')
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        type: true
      })
    }
  }
  const {msg} = alert
  return (
    <>
      <Title/>

      <div className="mt-20 md:mt-3 shadow-lg px-5 py-10 rounded-3xl bg-white">
        {msg && <Alerta
          alerts={alert}
        />}
        <form
          onSubmit={handleSubmit}
        >
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
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label htmlFor=""
              className=" text-gray-600 block text-xl font-bold"
            >
                Password
            </label>
            <input 
              type="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
            to="/register">No tienes una cuenta? Registrate
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

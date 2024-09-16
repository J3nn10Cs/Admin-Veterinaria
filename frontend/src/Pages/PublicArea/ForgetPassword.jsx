import { Title } from "../../components/Title"
import { Link } from "react-router-dom"
import { Alerta } from "../../components/Alerta"
// import clientAxios from "../config/axios"
import { useState } from "react"
import clientAxios from "../../config/axios"

export const ForgetPassword = () => {
  const [email,setEmail] = useState('')
  const [alerts,setAlerts] = useState({})

  const handleSubmit = async (e) => {
    //prevenir accion por default
    e.preventDefault();
    if(email === ''){
      setAlerts({msg:'El campo email es obligatorio', type:true})
      return
    }

    try {
        const {data} = await clientAxios.post('/veterinaries/forget-password', {email})
        console.log(data);
        setAlerts({msg: data.msg})
    } catch (error) {
        //si en caso el usuario no existe
        setAlerts({
          msg: error.response.data.msg,
          type: true
        })
    }
  }
  const {msg} = alerts
  return (
    <>
      <Title />

      <div className="mt-20 md:mt-2 shadow-lg px-5 py-10 rounded-3xl bg-white">
        {msg && <Alerta
          alerts={alerts}
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

          <input type="submit" value="Enviar mensaje"
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
            to="/register">No tienes una cuenta? Registrate
          </Link>
        </nav>

      </div>
    </>
  )
}

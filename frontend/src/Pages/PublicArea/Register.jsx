import { Link } from "react-router-dom"
import { Title } from "../../components/Title"
import { useState } from "react"
import clientAxios from "../../config/axios"
import { Alerta } from "../../components/Alerta"

export const Register = () => {
  const [name, SetName] = useState('')
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [repeatPassword, SetRepeatPassword] = useState('')
  const [alerts, setAlerts] = useState({})

  //Funcion
  const handleSubmit = async (e) => {
    e.preventDefault();
    if([name,email,password,repeatPassword].includes('')){
      setAlerts({msg: 'Hay campos vacíos', type: true});

      //luego de 3 segundos se elimina la alerta  
      setTimeout(() => {
        setAlerts({})
      }, 3000);
      return
    }

    //evaluar password
    if(password !== repeatPassword){
      setAlerts({msg: 'Los pass no son iguales', type: true});
      //luego de 3 segundos se elimina la alerta  
      setTimeout(() => {
        setAlerts({})
      }, 3000);
      return
    }

    //cant pass
    if(password.length < 6){
      setAlerts({msg: 'El pass es muy corto', type: true});
      //luego de 3 segundos se elimina la alerta  
      setTimeout(() => {
        setAlerts({})
      }, 3000);
      return
    }
    setAlerts({})

    //crear el usuario en la API
    try {
      const url = `/veterinaries`
       await clientAxios.post(url, {name,email,password})
      setAlerts({msg:'Creado correctamente, revisa tu email', type: false})
      //luego de 3 segundos se elimina la alerta  
      setTimeout(() => {
        setAlerts({})
      }, 3000);
    } catch (error) {
      setAlerts({
        msg: error.response.data.msg,
        type: true
      });
      //luego de 3 segundos se elimina la alerta  
      setTimeout(() => {
        setAlerts({})
      }, 3000);
    }
  }
  const {msg} = alerts
  return (
    <>
      <Title/>

      <div className="mt-20 md:mt-2 shadow-lg px-5 py-10 rounded-3xl bg-white dark:bg-slate-900">
        {msg && <Alerta
          alerts={alerts}
        />}
        <form action=""
          onSubmit={handleSubmit}  
        >
          <div className="my-5">
            <label htmlFor=""
              className=" text-gray-600 block text-xl font-bold dark:text-slate-300"
            >
              Name
            </label>
            <input
              type="text"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl dark:bg-slate-700 dark:text-white"
              placeholder="Your name"
              value={name}
              onChange={e => SetName(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label htmlFor=""
              className=" text-gray-600 block text-xl font-bold dark:text-slate-300"
            >
              Email
            </label>
            <input
              type="email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl dark:bg-slate-700 dark:text-white"
              placeholder="Your email"
              value={email}
              onChange={e => SetEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label htmlFor=""
              className=" text-gray-600 block text-xl font-bold dark:text-slate-300"
            >
              Paassword
            </label>
            <input
              type="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl dark:bg-slate-700 dark:text-white"
              placeholder="Your password"
              value={password}
              onChange={e => SetPassword(e.target.value)}
            />
          </div>  
          <div className="my-5">
            <label htmlFor=""
              className=" text-gray-600 block text-xl font-bold dark:text-slate-300"
            >
              Repeat password
            </label>
            <input
              type="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl dark:bg-slate-700 dark:text-white"
              placeholder="Repeat your password"
              value={repeatPassword}
              onChange={e => SetRepeatPassword(e.target.value)}
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
            className="block text-center my-5 text-gray-500 font-bold dark:text-white"
            to="/">Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link 
            className="block text-center my-5 text-gray-500 font-bold dark:text-white"
            to="/forget-password">Olvide mi contraseña
          </Link>
        </nav>
      </div>
    </>
  )
}

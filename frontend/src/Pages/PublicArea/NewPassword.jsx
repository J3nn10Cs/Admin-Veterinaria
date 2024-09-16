import { Title } from "../../components/Title"
import { useState, useEffect} from "react"
import clientAxios from "../../config/axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Alerta } from "../../components/Alerta"

export const NewPassword = () => {
  const [password,setPassword] = useState('')
  const [alerts,setAlerts] = useState({})
  const [tokenvalid, setTokenValid] = useState(false)
  const [passwordModified, setPasswordModified] = useState(false)
  const params = useParams();
  console.log(params);
  //traer solo el token
  const {token} = params;
  useEffect(() => {
      const confirmToken = async () => {
        try {
          await clientAxios(`/veterinaries/forget-password/${token}`)
          setAlerts({
            msg:'Ingresa el nuevo password'
          })
          setTokenValid(true)
        } catch (error) {
          setAlerts({
            msg: 'Hubo un error en el enlace',
            type: true
          })
        }
      } 
      confirmToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password.length < 6){
      setAlerts({msg:'El password debe ser minimo de 6 caracteres', type: true})
      return
    }

    try {
      const url = `/veterinaries/forget-password/${token}`
      const {data} = await clientAxios.post(url,{
        password
      })
      console.log(data);
      setPasswordModified(true)
      setAlerts({
        msg: data.msg
      })
    } catch (error) {
      setAlerts({msg: error.response.data.msg, type: true})
    }
  }

  const {msg} = alerts
  return (
    <>
      <Title/>
      <div className="mt-20 md:mt-2 shadow-lg px-5 py-10 rounded-3xl bg-white">
        {msg &&< Alerta
          alerts={alerts}
        />}
        {/* si el token es valido podran ingresar el nuevo pass */}
        {tokenvalid &&(
          <>
          <form
            onSubmit={handleSubmit}
          >
            <div className="my-5">
              <label htmlFor=""
                className=" text-gray-600 block text-xl font-bold"
              >
                New Password
              </label>
              <input
                type="password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
  
            <input type="submit" value="Save password"
              className="bg-indigo-600 w-full rounded-xl text-white font-extrabold py-3 px-10 mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
          </form>
          </>
        )}
        
        {/* si el password es modificado se muestra el enlacea iniciar sesión */}
        {passwordModified && <Link 
            className="block text-center my-5 text-gray-500"
            to="/">Inicia Sesión
          </Link>}

      </div>
    </>
  )
}

import { Title } from "../../components/Title"
import { Alerta } from "../../components/Alerta"
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import clientAxios from "../../config/axios"
export const ConfirmAccount = () => {

  const [alerts,setAlerts] = useState({})
  const [loading,setLoading] = useState(true)
  const [confirmedAccount, setConfirmedAccount] = useState(false)
  const params = useParams();
  const {token} = params
  
  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/veterinaries/confirm/${token}`
        const {data} = await clientAxios(url);
        //la cuenta pasa a ser confirmada
        setConfirmedAccount(true);
        setAlerts({
          msg: data.msg,
        })
      } catch (error) {
        //para obtener el error del backend
        setAlerts({
          msg: error.response.data.msg,
          type: true
        })
      }
      setLoading(false)
    }
    confirmAccount()
  }, [])

  return (
    <>
      <Title />
      <div className="mt-20 md:mt-2 shadow-lg px-5 py-10 rounded-3xl bg-white">
        {/* /mientras sea diferente a cargando mandar alerta */}
        {!loading && <Alerta
          alerts={alerts}
        />}
          {/* si la cuenta está confirmada */}
        {confirmedAccount && (
          <Link 
            className="block text-center my-5 text-gray-500"
            to="/">Iniciar sesión
          </Link>
        )}
      </div>
    </>
  )
}

import { useEffect, useState } from "react"
import { Alerta } from "../../components/Alerta"
import useAuth from "../../hooks/useAuth"
import { Link } from "react-router-dom"

export const EditProfile = () => {
  //inicia como objeto vacío
  const [profile,setProfile] = useState({})
  //obtener informacion del state
  const {auth, updateProfile} = useAuth()

  //cargar la infornacion
  useEffect(() => {
    setProfile(auth)
  },[auth])

  const [alert,setAlert] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email} = profile
    if([email,name].includes('')){
      setAlert({msg:'Nombre e email son obligatorios', type: true})
      //luego de 3 segundos se elimina la alerta  
      setTimeout(() => {
        setAlert({})
      }, 3000);
      
      return
    }

    //actualizamos y pasamos perfil -> bloqueamos el codigo hasta tener una respuesta
    const result = await updateProfile(profile)
    setAlert(result)
  }

  const {msg} = alert
  return (
    <>
      <h2 className="text-center text-4xl font-bold dark:text-white">Edita tu perfil</h2>

      <p className="text-center mt-3 mb-6 font-bold text-lg dark:text-white">Modifica tu {''} <span className="text-blue-500">informacion aqui</span></p>

      <div className="flex justify-center">
        <div className="w-full bg-white shadow rounded-xl p-5 md:w-1/2 dark:bg-slate-900">
        {msg && <Alerta
          alerts={alert}
        />}
          <form>
            <div className="my-3">
              <label 
                className="font-bold text-gray-500 dark:text-gray-300"
              >Name</label>
              <input 
                type="text"
                placeholder="Your name"
                className="border w-full bg-gray-100 p-4 rounded-lg mt-2 dark:bg-slate-700 dark:text-white"
                name="name"
                //tarer el nombre del objeto
                value={profile.name || ''}
                //reescribe en el campo
                onChange={e => setProfile({
                  //copia del perfil
                  ...profile,
                  //
                  [e.target.name] : e.target.value
                })}
              />
            </div>
            <div className="my-3">
              <label 
                className="font-bold text-gray-500 dark:text-gray-300"
              >Sitio Web</label>
              <input 
                type="text"
                placeholder="Your sitio web"
                className="border w-full bg-gray-100 p-4 rounded-lg mt-2 dark:bg-slate-700 dark:text-white"
                name="web"
                value={profile.web || ''}
                onChange={e => setProfile({
                  //traemoes el copia del objeto
                  ...profile,
                  [e.target.name] : e.target.value
                })}
              />
            </div>
            <div className="my-3">
              <label 
                className="font-bold text-gray-500 dark:text-gray-300"
              >Phone</label>
              <input 
                type="number"
                placeholder="Your phone"
                className="border w-full bg-gray-100 p-4 rounded-lg mt-2 dark:bg-slate-700 dark:text-white"
                name="phone"
                value={profile.phone || ''}
                onChange={e => setProfile({
                  //copia del objeto
                  ...profile,
                  //
                  [e.target.name] : e.target.value
                })}
              />
            </div>
            <div className="my-3">
              <label 
                className="font-bold text-gray-500 dark:text-gray-300"
              >email</label>
              <input 
                type="email"
                placeholder="Your email"
                name="email"
                className="border w-full bg-gray-100 p-4 rounded-lg mt-2 dark:bg-slate-700 dark:text-white"
                value={profile.email || ''}
                onChange={e => setProfile({
                  //copia del perfil
                  ...profile,
                  //
                  [e.target.name] : e.target.value
                })}
              />
            </div>

            <div className="flex gap-2">
              <button 
                type="submit"
                className="bg-blue-500 text-white rounded-lg text-center mt-2 py-3 w-full hover:bg-blue-700 font-bold"
                onClick={handleSubmit}
              >
                Guardar cambios 
                <i className="fa-solid fa-floppy-disk fa-xl mx-2"></i>

              </button>

              <Link 
                to="/admin/change-password"
                className="bg-red-500 text-white rounded-lg text-center mt-2 py-3 w-full hover:bg-red-700 font-bold"
              >
                  Cambiar contraseña
                <i className="fa-solid fa-pen fa-xl mx-2"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

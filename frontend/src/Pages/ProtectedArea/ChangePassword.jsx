import { useState } from "react";
import { Alerta } from "../../components/Alerta";
import useAuth from "../../hooks/useAuth"

export const ChangePassword = () => {
  //extraemos savepass de useauth
  const {savePassword} = useAuth()

  const [alert,setAlert] = useState({})
  const [password,setPassword] = useState({
    //lo iniciamos con vacio
    password: '',
    passwordnew: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    //si al menos un campo está vacio retorna true -> some
    if(Object.values(password).some(fiels => fiels === '')){
      setAlert({
        msg:'Todos los campos son obligatorios',
        type: true
      })
      return
    }
    
    if(password.passwordnew.length < 6){
      setAlert({
        msg:'El password debe tener minimo 6 caracteres',
        type: true
      })
      return
    }

    //retorna alguna respuesta
    const result = await savePassword(password)
    setAlert(result)
  }
  
  const {msg} = alert
  return (
    <>
      <h2 className="text-center text-4xl font-bold dark:text-white">Cambia tu contraseña</h2>

      <p className="text-center mt-3 mb-6 font-bold text-lg dark:text-white">Modifica tu {''} <span className="text-blue-500">password</span></p>

      <div className="flex justify-center">
        <div className="bg-white w-full shadow rounded-xl p-5 md:w-1/2 dark:bg-slate-900">
        {msg && <Alerta
          alerts={alert}
        />}
          <form>
            <div className="my-3">
              <label 
                htmlFor="password"
                className="font-bold text-gray-500 dark:text-gray-300"
              >
                Password actual
              </label>
              <input 
                type="password"
                className="border bg-gray-100 rounded-lg p-3 w-full mt-2 dark:bg-slate-700 dark:text-white"
                name="password"
                placeholder="Your password"
                onChange={e => setPassword({
                  // copia de lo que hay en el state
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>  
            <div className="my-3">
              <label 
                htmlFor="password_new"
                className="font-bold text-gray-500 dark:text-gray-300"
              >
                Password nuevo
              </label>
              <input 
                type="password"
                className="border bg-gray-100 rounded-lg p-3 w-full mt-2 dark:bg-slate-700 dark:text-white"
                name="passwordnew"
                placeholder="Your new password"
                onChange={e => setPassword({
                  // copia de lo que hay en el state
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>
              <button 
                type="submit"
                className="bg-blue-500 text-white rounded-lg text-center mt-2 py-3 w-full hover:bg-blue-700 font-bold"
                onClick={handleSubmit}
              >
                Actualizar password 
                <i className="fa-solid fa-circle-down fa-xl mx-2"></i>

              </button>
          </form>
        </div>
      </div>
    </>
  )
}

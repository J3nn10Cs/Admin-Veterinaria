import { useState } from "react";
import { Alerta } from "../../components/Alerta";
export const ChangePassword = () => {
  const [alert,setAlert] = useState({})
  const [password,setPassword] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('cambiando contraseña');
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
                value={password}
                onChange={e => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>
            <div className="my-3">
              <label 
                htmlFor="password-new"
                className="font-bold text-gray-500 dark:text-gray-300"
              >
                Password nuevo
              </label>
              <input 
                type="password"
                className="border bg-gray-100 rounded-lg p-3 w-full mt-2 dark:bg-slate-700 dark:text-white"
                name="password-new"
                placeholder="Your new password"
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

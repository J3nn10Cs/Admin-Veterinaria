import { useState } from "react"
import { Alerta } from "../../components/Alerta"

export const EditProfile = () => {
  const [name,setName] = useState('')
  const [web,setWeb] = useState('')
  const [phone,setPhone] = useState('')
  const [email,setEmail] = useState('')

  const [alert,setAlert] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if([name,web,phone,email].includes('')){
      setAlert({msg:'Todos los campos son obligatorios', type: true})
      return
    }


  }

  const {msg} = alert
  return (
    <>
      <h2 className="text-center text-4xl font-bold">Edita tu perfil</h2>

      <p className="text-center mt-3 mb-6 font-bold text-lg">Modifica tu {''} <span className="text-blue-500">informacion aqui</span></p>

      <div className="flex justify-center">
        <div className="w-full bg-white shadow rounded-xl p-5 md:w-1/2">
        {msg && <Alerta
          alerts={alert}
        />}
          <form>
            <div className="my-3">
              <label 
                className="font-bold text-gray-500"
              >Name</label>
              <input 
                type="text"
                placeholder="Your name"
                className="border w-full bg-gray-100 p-4 rounded-lg mt-2"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="my-3">
              <label 
                className="font-bold text-gray-500"
              >Sitio Web</label>
              <input 
                type="text"
                placeholder="Your sitio web"
                className="border w-full bg-gray-100 p-4 rounded-lg mt-2"
                value={web}
                onChange={e => setWeb(e.target.value)}
              />
            </div>
            <div className="my-3">
              <label 
                className="font-bold text-gray-500"
              >Phone</label>
              <input 
                type="number"
                placeholder="Your phone"
                className="border w-full bg-gray-100 p-4 rounded-lg mt-2"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div className="my-3">
              <label 
                className="font-bold text-gray-500"
              >email</label>
              <input 
                type="email"
                placeholder="Your email"
                className="border w-full bg-gray-100 p-4 rounded-lg mt-2"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="bg-blue-500 text-white rounded-lg text-center mt-2 py-3 w-full hover:bg-blue-700"
              onClick={handleSubmit}
            >
              <i className="fa-solid fa-floppy-disk fa-xl"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

import { useEffect, useState } from "react"
import { Alerta } from "./Alerta"
import usePatients from "../hooks/usePatients"

const Form = () => {
  const [name, setName] = useState('')
  const [proprietor,setPropietor] = useState('')
  const [email,setEmail] = useState('')
  const [date,setDate] = useState('')
  const [symptoms,setSymtoms] = useState('')
  const [id, setId] = useState(null)

  const [alert, setAlert] = useState({})

  //Provider
  const {savePatient, patient} = usePatients()
  
  useEffect(() => {
    //revisar las propiedades del objeto
    if(patient?.name){
      setName(patient.name)
      setPropietor(patient.proprietor)
      setDate(patient.date)
      setEmail(patient.email)
      setSymtoms(patient.symptoms)
      setId(patient._id)
    }
  }, [patient])

  //función
  const handleSubmit = e => {
    e.preventDefault();

    if([name,proprietor,email,date,symptoms].includes('')){
      setAlert({
        msg: 'Todos los campos son obligatorios', 
        type:true
      })

      //luego de 3 segundos se elimina la alerta  
      setTimeout(() => {
        setAlert({})
      }, 3000);
      return
    }

    //llamamos a la funcion
    savePatient({name,proprietor,email,date,symptoms, id}) 

    setAlert({msg: 'Guardado correctamente'})
    setName('')
    setPropietor('')
    setEmail('')
    setDate('')
    setId('')
    setSymtoms('')
  }

  //extraer el mensaje
  const {msg} = alert
  
  return (
    <>

      <h2 className="text-center text-blue-600 font-black text-3xl">
        Administra tus pacientes
      </h2>
      <p className="text-xl mt-5 text-center mb-10 dark:text-white">
        Añade tus pacientes y {''} <span className="text-blue-700 font-bold">Administralos</span>
      </p>

      {msg && <Alerta
        alerts={alert}
      />}
      <form
        className="bg-white py-10 px-5 rounded-xl mb-10 lg:mb-0 shadow-md dark:bg-slate-900"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label 
            htmlFor="name"
            className="text-gray-700 font-bold dark:text-gray-300"
          >Nombre de la mascota :</label>
          <input 
            type="text"
            id="name"
            placeholder="Name pet"
            className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md dark:bg-slate-700 dark:text-white"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label 
            htmlFor="propietor"
            className="text-gray-700 font-bold dark:text-gray-300"
          >Nombre del propietario:</label>
          <input 
            type="text"
            id="propietor"
            placeholder="Propietario nombre"
            className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md dark:bg-slate-700 dark:text-white"
            value={proprietor}
            onChange={e => setPropietor(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label 
            htmlFor="email"
            className="text-gray-700 font-bold dark:text-gray-300"
          >Propietario Email :</label>
          <input 
            type="text"
            id="email"
            placeholder="Email propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md dark:bg-slate-700 dark:text-white"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label 
            htmlFor="date"
            className="text-gray-700 font-bold dark:text-gray-300"
          >Elegir fecha :</label>
          <input 
            type="date"
            id="date"
            placeholder="Elegir Date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md dark:bg-slate-700 dark:text-white"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label 
            htmlFor="symptoms"
            className="text-gray-700 font-bold dark:text-gray-300"
          >Symptoms :</label>
          <textarea 
            id="symptoms"
            placeholder="Describe the symptoms"
            className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md dark:bg-slate-700 dark:text-white"
            value={symptoms}
            onChange={e => setSymtoms(e.target.value)}
          />
        </div>
        <input 
          type="submit"
          className="bg-blue-500 text-white font-bold w-full rounded-md p-2 cursor-pointer hover:bg-blue-700 dark:text-gray-300"
          value={id ? 'Guardar cambios' : 'Agregar paciente'}
        />
      </form>
    </>
  )
}

export  default Form
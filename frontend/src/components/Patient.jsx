import usePatients from "../hooks/usePatients"

const Patient = ({patient}) => {

  const {email, date, name, proprietor, symptoms, _id} = patient
  const {setEdition, setDelete} = usePatients()
  //arreglar las fechas
  const formatDate = (fecha) => {
    let nuevaFecha
    if (fecha.includes('T00:00:00.000Z')) {
      nuevaFecha = new Date(fecha.split('T')[0].split('-'))
    } else {
      nuevaFecha = new Date(fecha)
    }
    const opciones = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return nuevaFecha.toLocaleDateString('es-ES', opciones)
  }
  return (
    <>
      <div className="mx-5 bg-white dark:bg-slate-700 my-5 shadow-md p-7 rounded-xl">
        <p className="font-bold text-gray-600 dark:text-white">
          Name : <span className="font-normal normal-case text-black dark:text-white">{name}</span>
        </p>
        <p className="font-bold text-gray-600 dark:text-white">
          Propietor : <span className="font-normal normal-case text-black dark:text-white">{proprietor}</span>
        </p>
        <p className="font-bold text-gray-600 dark:text-white">
          Email : <span className="font-normal normal-case text-black dark:text-white">{email}</span>
        </p>
        <p className="font-bold text-gray-600 dark:text-white">
          Date : <span className="font-normal normal-case text-black dark:text-white">{formatDate(date)}</span>
        </p>
        <p className="font-bold text-gray-600 dark:text-white">
          Symptoms : <span className="font-normal normal-case text-black dark:text-white">{symptoms}</span>
        </p>

        <div className="flex justify-between my-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 px-7 py-2 rounded-xl text-white"
            onClick={() => setEdition(patient)}
          >
            <i className="fa-solid fa-pencil"></i>
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 px-7 py-2 rounded-xl text-white"
            onClick={() => setDelete(_id)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default Patient
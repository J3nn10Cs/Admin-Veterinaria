import { useState } from "react"
import Form from "../../components/Form"
import PatientList from "../../components/PatientList"

export const AdministratePatients = () => {
  const [showForm, setShowForm] = useState(false)
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <button
          // dependiendiendo del click cambia el state
          onClick={() => setShowForm(!showForm)}
        >
          {/* arreglar el padding de los botones */}
          {showForm ? (<i className="fa-solid fa-xmark bg-blue-400 rounded-full mb-4 text-white p-2 md:hidden"></i>) : (<i className="fa-solid fa-list md:hidden bg-blue-400 rounded-full text-white mb-4 p-2"></i>)}
        </button>
        {/* si mostrar formulario está como tru mostrar el formulario */}
        <div className={`${showForm ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
          <Form/>
        </div>
        <div className="md:w-1/2 lg:w-3/5">
          <PatientList/>
        </div>
      </div>
    </>
  )
}


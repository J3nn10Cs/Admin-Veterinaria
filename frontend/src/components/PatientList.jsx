import usePatients from "../hooks/usePatients"
import Patient from "./Patient"
const PatientList = () => {
  const {patients} = usePatients()
  return (
    <>
      {patients.length ? 
        (<>
          <h2 className="text-center text-blue-600 font-black text-3xl">
            Listado de pacientes
          </h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {''} 
            <span className="font-bold text-blue-700">Pacientes y citas </span>
          </p>

          {/* poner la info en todos los grid */}
          <div className="grid grid-cols-2">
            {patients.map(patient => (
              <Patient
                key={patient._id}
                patient={patient}
              />
            ))}
          </div>
          
        </>) : 
        // en caso no haya pacientes
        (<>
          <h2 className="text-center text-blue-600 font-black text-3xl">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando un paciente
          </p>
        </>)}
    </>
  )
}

export default PatientList
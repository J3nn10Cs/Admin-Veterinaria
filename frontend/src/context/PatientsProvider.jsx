import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/axios";

const PatientsContext =  createContext();

export const PatientsProvider = ({children}) => {
  const [patients,setPatients] = useState([])
  const [patient, setPatient] = useState({})

  //al momento de cargar el componente mandar a llamar la api
  useEffect(() => {
    const getPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const config = {
          headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        const {data} = await clientAxios('/patients', config)
        // console.log(data)
        //lo colocamos en el state
        setPatients(data)

        if(!token) return
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
    getPatients()
  },[])
  
  const setEdition = (patient) => {
    setPatient(patient)
  }

  const setDelete = async (id) => {
    const confirms = confirm('¿Confirmas que deseas eliminar?')
    if(confirms){
      try {
        //configuracion del checkAuth
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        const {data} = await clientAxios.delete(`/patients/${id}`, config)
        const patientUpdate = patients.filter( patientsState => patientsState._id !== id)
        //mostramos de forma asincrona en el front
        setPatients(patientUpdate)
      } catch (error) {
        console.log(error);
      }
    }
  }

  //Funcion que guarda los pacientes
  const savePatient = async (patient) => {
    //configuracion del checkAuth
    const token = localStorage.getItem('token')
        const config = {
          headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
          }
        }

    //evaluar si existe o no el id
    if(patient.id){
      //edita
      try {
        const {data} = await clientAxios.put(`/patients/${patient.id}`, patient, config)
        const patientUpdate = patients.map( patientState => patientState._id === data._id ? data : patientState)
        setPatients(patientUpdate)
      } catch (error) {
        console.log(error.response.data.msg);
      }
      return
    }else{
      //guarda
      try {
        const {data} = await clientAxios.post('/patients', patient, config)
        //valores a quitar
        const {createdAt,updatedAt,__v, ...storedPatient} = data
  
        //agregamos el paciente almacenado y tomamos una copia de lo que hay en paciente
        setPatients([storedPatient, ...patients])
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  }
  return(
    <>
      <PatientsContext.Provider
        value={{
          patients,
          savePatient,
          setEdition,
          setDelete,
          patient 
        }}
      >
        {children}
      </PatientsContext.Provider>
    </>
  )
}


export default PatientsContext
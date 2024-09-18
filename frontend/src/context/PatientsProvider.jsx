import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/axios";

const PatientsContext =  createContext();

export const PatientsProvider = ({children}) => {
  const [patients,setPatients] = useState([])
  
  //Funcion que guarda los pacientes
  const savePatient = async (patient) => {
    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          "Content-Type" : "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
      const {data} = await clientAxios.post('/patients', patient, config)
      //valores a quitar
      const [{createdAt,updatedAt,__v, ...storedPatient}] = data

      console.log(storedPatient);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }
  return(
    <>
      <PatientsContext.Provider
        value={{
          patients,
          savePatient
        }}
      >
        {children}
      </PatientsContext.Provider>
    </>
  )
}


export default PatientsContext
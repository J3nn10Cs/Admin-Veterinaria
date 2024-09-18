//con esto extraemos los datos del context
import { useContext } from "react";
//identficar que context
import PatientsContext from "../context/PatientsProvider";

const usePatients = () => {
  return useContext(PatientsContext)
}

export default usePatients
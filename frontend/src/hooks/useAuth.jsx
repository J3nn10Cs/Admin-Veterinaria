//con esto extraemos los datos del context
import { useContext } from "react";
//identficar que context
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext)
}
export default useAuth
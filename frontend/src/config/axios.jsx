import axios from "axios";

//Crea una url de base
const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default clientAxios
import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios";

//el context de este provider
const AuthContext = createContext();

const AuthProvider = ({children}) => {
    //para poder acceder a la página
    const [loading,setLoading] = useState(true)
    const [auth, setAuth] = useState({})

    useEffect(() => {
      const authUser = async () => {
        const token = localStorage.getItem('token');
        if(!token){
          setLoading(false)
          return
        }

        //autenticar
        const config = {
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        try {
          //data respuesta de axios
          const {data} = await clientAxios('/veterinaries/profile', config)
          setAuth(data)
        } catch (error) {
          console.log(error.response.data.msg);
          setAuth({})
        }
        setLoading(false)
      }
      authUser()
    }, [])

    //cerrar sesión
    const logOut = () => {
      localStorage.removeItem('token')
      setAuth({})
    }

    //actuaizar perfil
    const updateProfile = async (datas) => {
      const token = localStorage.getItem('token');
      if(!token){
        setLoading(false)
        return
      }

      //autenticar
      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    
      try {
        const url = `/veterinaries/profile/${datas._id}`
        const {data} = await clientAxios.put(url, datas, config)
        return{
          msg: data.msg
        }
      }catch (error) {
        return {
          msg: error.response.data.msg,
          type: true
        }
      }
    }

    //guardar password nuevo
    const savePassword = async (datas) => {
      const token = localStorage.getItem('token');
        if(!token){
          setLoading(false)
          return
        }

        //autenticar
        const config = {
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        try {
          const url = '/veterinaries/update-password'
          //respuesta de axios
          const {data} = await clientAxios.put(url, datas, config)
          console.log(data);
          return {
            msg: data.msg
          }
        } catch (error) {
          console.log(error.response.data.msg);
          return{
            msg: error.response.data.msg,
            type : true
          }
        }
    }

  return (
      // retornar el context
      <AuthContext.Provider
        value={{
          auth,
          setAuth,
          loading,
          logOut,
          updateProfile,
          savePassword
        }}
      >
        {children}
      </AuthContext.Provider>
  )
}
export {
  AuthProvider
}

export default AuthContext

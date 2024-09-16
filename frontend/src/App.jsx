import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthLoyaut } from "./layout/AuthLayout"
import { Login } from "./Pages/PublicArea/Login"
import { Register } from "./Pages/PublicArea/Register"
import { ConfirmAccount } from "./Pages/PublicArea/ConfirmAccount"
import { ForgetPassword } from "./Pages/PublicArea/ForgetPassword"
import { AuthProvider } from "./context/AuthProvider"
import {NewPassword} from "./Pages/PublicArea/NewPassword"
import { AdministratePatients } from "./Pages/ProtectedArea/AdministratePatients"
import ProtectedRoute from "./layout/ProtectedRoute"

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          {/* area publica */}
          <Routes>
            {/* elemet diseño para todas las paginas AuthLoyaut */}
            <Route path="/" element={<AuthLoyaut/>}>
              <Route index element={<Login/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="forget-password" element={<ForgetPassword/>}/>
              <Route path="forget-password/:token" element={<NewPassword/>}/>
              <Route path="confirm/:token" element={<ConfirmAccount/>}/>
            </Route>

            {/* area privada */}
            <Route path="/admin" element={<ProtectedRoute/>}>
              <Route index element={<AdministratePatients/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App

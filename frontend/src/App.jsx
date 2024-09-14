import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthLoyaut } from "./layout/AuthLayout"
import { Login } from "./Pages/Login"
import { Register } from "./Pages/Register"
import { ConfirmAccount } from "./Pages/ConfirmAccount"
import { ForgetPassword } from "./Pages/ForgetPassword"
import {NewPassword} from "./Pages/newPassword"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLoyaut/>}>
            <Route index element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="forget-password" element={<ForgetPassword/>}/>
            <Route path="forget-password/:token" element={<NewPassword/>}/>
            <Route path="confirm/:token" element={<ConfirmAccount/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

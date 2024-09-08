import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthLoyaut } from "./layout/AuthLayout"
import { Login } from "./Pages/Login"
import { Register } from "./Pages/Register"
import { ConfirmAccount } from "./Pages/ConfirmAccount"
import { ForgetPassword } from "./Pages/ForgetPassword"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLoyaut/>}>
            <Route index element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="forget-password" element={<ForgetPassword/>}/>
            <Route path="confirm/:id" element={<ConfirmAccount/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

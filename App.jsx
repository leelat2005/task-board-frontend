import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Board from './pages/Board'

const isAuth = () => localStorage.getItem('auth') === 'true'

const Protected = ({children}) => {
  return isAuth() ? children : <Navigate to="/" />
}

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/board" element={
        <Protected>
          <Board/>
        </Protected>
      }/>
    </Routes>
  )
}
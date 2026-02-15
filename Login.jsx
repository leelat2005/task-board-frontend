import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [remember,setRemember]=useState(false)
  const [error,setError]=useState('')
  const navigate = useNavigate()

  const submit = e => {
    e.preventDefault()
    if(email==='intern@demo.com' && password==='intern123'){
      localStorage.setItem('auth','true')
      if(remember) localStorage.setItem('remember','true')
      navigate('/board')
    }else{
      setError('Invalid credentials')
    }
  }

  return (
    <div style={{display:'flex',height:'100vh',justifyContent:'center',alignItems:'center'}}>
      <form onSubmit={submit}>
        <h2>Login</h2>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
        <label>
          <input type="checkbox" onChange={e=>setRemember(e.target.checked)}/> Remember me
        </label><br/>
        <button>Login</button>
        {error && <p style={{color:'red'}}>{error}</p>}
      </form>
    </div>
  )
}
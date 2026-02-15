import { useEffect, useState } from 'react'

const columns = ['Todo','Doing','Done']

export default function Board(){
  const [tasks,setTasks]=useState(()=>{
    return JSON.parse(localStorage.getItem('tasks')||'[]')
  })
  const [title,setTitle]=useState('')

  useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
  },[tasks])

  const addTask = () => {
    if(!title) return
    setTasks([...tasks,{
      id:Date.now(),
      title,
      status:'Todo',
      createdAt:new Date().toISOString()
    }])
    setTitle('')
  }

  const moveTask = (id,dir)=>{
    setTasks(tasks.map(t=>{
      if(t.id!==id) return t
      const idx = columns.indexOf(t.status)+dir
      if(idx<0 || idx>2) return t
      return {...t,status:columns[idx]}
    }))
  }

  const del = id => setTasks(tasks.filter(t=>t.id!==id))

  const logout = ()=>{
    localStorage.removeItem('auth')
    window.location='/'
  }

  const reset = ()=>{
    if(confirm('Reset board?')){
      setTasks([])
      localStorage.removeItem('tasks')
    }
  }

  return (
    <div style={{padding:20}}>
      <h1>Task Board</h1>
      <button onClick={logout}>Logout</button>
      <button onClick={reset}>Reset</button>

      <div>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task title"/>
        <button onClick={addTask}>Add</button>
      </div>

      <div style={{display:'flex',gap:20,marginTop:20}}>
        {columns.map(col=>(
          <div key={col} style={{border:'1px solid #ccc',padding:10,width:250}}>
            <h3>{col}</h3>
            {tasks.filter(t=>t.status===col).map(t=>(
              <div key={t.id} style={{border:'1px solid black',margin:5,padding:5}}>
                <b>{t.title}</b>
                <div>
                  <button onClick={()=>moveTask(t.id,-1)}>←</button>
                  <button onClick={()=>moveTask(t.id,1)}>→</button>
                  <button onClick={()=>del(t.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
import { useEffect, useRef, useState } from "react"

import './App.css';
import Header from "./componet/Header"
import TodoEditor from "./componet/TodoEditor"
import TodoList from "./componet/TodoList"

// const mockTodo = [
//   {
//     id: 1,
//     isDone: false,
//     content: "출근하기",
//     createDate: new Date("2023-02-02").getTime()
//   },
//   {
//     id: 2,
//     isDone: false,
//     content: "퇴근하기",
//     createDate: new Date().getTime()
//   },
//   {
//     id: 3,
//     isDone: false,
//     content: "저녁먹기",
//     createDate: new Date().getTime()
//   }
// ]
const localTodo = (window.localStorage.getItem("todo"))

const mockTodo = (localTodo !== null)?JSON.parse(localTodo):[]

function App() {
  const [todo, setTodo] = useState([mockTodo])

  const idRef = useRef((todo[0].length > 0)? todo[0][todo[0].length-1].id+1 : 1)
  const mountChk = useRef(false)

  useEffect(() => {
    if (!mountChk.current) {
      mountChk.current = true
      return
    } else {
      window.localStorage.setItem("todo", JSON.stringify(todo[0]))
    }
  }, [todo])

  const onCreate = (content) => {
    const newItem = {
      id: idRef.current,
      isDone: false,
      content: content,
      createDate: new Date().getTime()
    }

    const newTodo = [...todo[0]]
    newTodo.push(newItem)

    setTodo([newTodo])
    idRef.current += 1
  }

  const onUpdate = (targetId) => {
    const newTodo = [...todo[0]]
    
    for (const i in newTodo) {
      if (newTodo[i].id === targetId) {
        newTodo[i].isDone = !newTodo[i].isDone
      }
    }

    setTodo([newTodo])
  }

  const onDelete = (targetId) => {
    const newTodo = []
    
    for (const i in todo[0]) {
      if (todo[0][i].id !== targetId) {
        newTodo.push(todo[0][i])
      }
    }

    setTodo([newTodo])
  }

  return (
    <div className="App">
      <Header></Header>
      <TodoEditor onCreate={onCreate}></TodoEditor>
      <TodoList onUpdate={onUpdate} onDelete={onDelete} todo={todo[0]}></TodoList>
    </div>
  );
}

export default App;

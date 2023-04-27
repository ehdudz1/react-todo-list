import { useState } from "react"
import TodoItem from "./TodoItem"

const TodoList = ({todo, onUpdate, onDelete}) => {
    const [search, setSearch] = useState("")
    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }
    const getSearchResult = () => {
        if (search !== "") {
            return todo.filter(
                (e) => e.content.toLowerCase().includes(search)
            )
        } else {
            return todo
        }
    }

    return (
        <div className="TodoList">
            <h4>Todo List 🌱</h4>
            <input className="searchbar" onChange={onChangeSearch} value={search} placeholder="검색어를 입력하세요"></input>
            <div className="list_wrapper">
                {getSearchResult().map((e) => (
                    <TodoItem key={e.id} item={e} onUpdate={onUpdate} onDelete={onDelete}></TodoItem>
                ))}
            </div>
        </div>
    )
}

export default TodoList
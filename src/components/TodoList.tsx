import React, {useEffect, useState} from "react";
import {TodoListTask} from "./TodoListTask.tsx";

interface TodoListInterface {
    title: string;
}

export const TodoList: React.FC = () => {
    const [todolist, setTodoList] = useState<TodoListInterface[]>([])
    const [title, setTitle] = useState('')
    const [localStorageName] = 'db-todolist'

    useEffect(() => {
        const info = JSON.parse(localStorage.getItem(localStorageName) || '[]')
        setTodoList(info || [])
    }, [])

    function handleTodoList() {
        const newTodoList = todolist
        newTodoList.push({title})
        setTodoList(newTodoList)
        setTitle('')
        localStorage.setItem(localStorageName, JSON.stringify(newTodoList))
    }

    function removeTodoListTask(title: string) {
        const newTodoList = todolist.filter((item) => item.title !== title)
        setTodoList(newTodoList)
        localStorage.setItem(localStorageName, JSON.stringify(newTodoList))
    }

    return (
        <div>
            <div className='formAddTask'>
                <form>
                    <div>
                        <label>New Task: </label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='btnSave'>
                        <button type={'button'} onClick={handleTodoList}>Save</button>
                    </div>
                </form>
            </div>
            <div className='listAllTasks'>
                {todolist.length > 0 ? (
                    todolist.map((item, index) => (
                        <React.Fragment key={index}>
                            <TodoListTask index={index} title={item.title} />
                            <button onClick={()=>removeTodoListTask(item.title)}>Remove</button>
                        </React.Fragment>
                    ))
                ) : (
                    <h3>No tasks to show</h3>
                )}
            </div>
        </div>
    )

}
import React, {useState} from "react";
import {TodoListTask} from "./TodoListTask.tsx";

interface TodoListInterface {
    title: string;
}

const localStorageName = 'db-todoList'

export const TodoList: React.FC = () => {
    const [todoList, setTodoList] = useState<TodoListInterface[]>(() => {
        return JSON.parse(localStorage.getItem(localStorageName) || '[]')
    })
    const [title, setTitle] = useState('')

    function handleTodoList() {
        const newTodoList = [...todoList, {title}]
        setTodoList(newTodoList)
        setTitle('')
        localStorage.setItem(localStorageName, JSON.stringify(newTodoList))
    }

    function removeTodoListTask(title: string) {
        const newTodoList = todoList.filter((item) => item.title !== title)
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
                {todoList.length > 0 ? (
                    todoList.map((item, index) => (
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

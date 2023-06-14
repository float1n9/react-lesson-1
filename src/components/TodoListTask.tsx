import React from "react";

interface TodoListTaskInterface {
    index: string;
    title: string;
}

export const TodoListTask: React.FC<TodoListTaskInterface> = ({index, title}) => {
    return (
        <h4>Task {index+1}: {title}</h4>
    )
}
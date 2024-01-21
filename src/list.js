import React from "react";
import Task from "./Task";

const List = ({tasks, onEdit, onDelete, toggleStatus}) => {
    return (
        <div>
            <h3>Task List</h3>
            {tasks.length === 0 ? (
                <p>Great Work! You have no pending tasks.</p>
            ) : (tasks.map((task, index) => (
                <Task 
                    key={index}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    onEdit={() => onEdit(index, task)}
                    onDelete ={() => onDelete(index)}
                    toggleStatus= {() => toggleStatus(index)}
                />
            )))}
        </div>
    )
}

export default List
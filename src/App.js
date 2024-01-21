import React, { useState } from "react";
import "./App.css";
import List from "./list";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [deleteTask, setDeleteTask] = useState(null);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const AddTask = () => {
    if (newTask.title.trim() !== "" && newTask.description.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask({
        title: "",
        description: "",
        status: false,
      });
    }
  };

  const handleEdit = (index, task) => {
    setEditTask({ index, task });
    setIsEditFormVisible(true);
  };

  const handleEditInput = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({
      ...prev,
      task: {
        ...prev.task,
        [name]: value,
      },
    }));
  };

  const saveEdit = () => {
    const updatedTask = [...tasks];
    updatedTask[editTask.index] = editTask.task;
    setTasks(updatedTask);
    setEditTask(null);
    setIsEditFormVisible(false);
  };

  const cancelEdit = () => {
    setEditTask(null);
    setIsEditFormVisible(false);
  };

  const handleDelete = (index) => {
    setDeleteTask(index);
    setIsConfirmationVisible(true);
  };

  const confirmDelete = () => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(deleteTask, 1);
    setTasks(updatedTasks);
    setDeleteTask(null);
    setIsConfirmationVisible(false);
  };

  const cancelDelete = () => {
    setDeleteTask(null);
    setIsConfirmationVisible(false);
  };

  const toggleStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = !updatedTasks[index].status;
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Task Management App</h1>
      <form>
        <label>
          Title :
          <input
            type="text"
            name="title"
            value={newTask.title}
            placeholder="Task Title"
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description :
          <input
            type="text"
            name="description"
            value={newTask.description}
            placeholder="Task Description"
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={AddTask}>
          Add Task
        </button>
      </form>
      <List tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} toggleStatus={toggleStatus} />
      {isEditFormVisible && (
        <div>
          <h3>Edit Task</h3>
          <label>
            Title :
            <input
              type="text"
              name="title"
              value={editTask.task.Title}
              onChange={handleEditInput}
            />
          </label>
          <br />
          <label>
            Description :
            <input
              type="text"
              name="description"
              value={editTask.task.description}
              onChange={handleEditInput}
            />
          </label>
          <br />
          <button type="button" onClick={saveEdit}>
            Save
          </button>
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      )}
      {isConfirmationVisible && (
        <div>
          <p>Are you sure you want to delete this task..?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </div>
  );
}

export default App;

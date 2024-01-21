// App.js

import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./list";
import useTaskService from "./TaskService";

function App() {
  const { getAllTasks, addTask, updateTask, deleteTask } = useTaskService();

  const [tasks, setTasks] = useState(getAllTasks());
  const [editTask, setEditTask] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [deleteTaskIndex, setDeleteTaskIndex] = useState(null);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: false,
  });

  useEffect(() => {
    setTasks(getAllTasks());
  }, [getAllTasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const AddTask = () => {
    if (newTask.title.trim() !== "" && newTask.description.trim() !== "") {
      addTask(newTask);
      setTasks((prevTasks) => [...prevTasks, newTask]);
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
    updateTask(editTask.index, editTask.task);
    setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks[editTask.index] = editTask.task;
        return updatedTasks;
    });
    setEditTask(null);
    setIsEditFormVisible(false);
};

  const cancelEdit = () => {
    setEditTask(null);
    setIsEditFormVisible(false);
  };

  const handleDelete = (index) => {
    setDeleteTaskIndex(index);
    setIsConfirmationVisible(true);
  };

  const confirmDelete = () => {
    if (deleteTaskIndex !== null) {
      deleteTask(deleteTaskIndex);
      setDeleteTaskIndex(null);
      setIsConfirmationVisible(false);
    }
  };

  const cancelDelete = () => {
    setDeleteTaskIndex(null);
    setIsConfirmationVisible(false);
  };

  const toggleStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = !updatedTasks[index].status;
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1 className="brand">Task Management App</h1>
      <div className="content-container">
        <div className="addtaskform">
        <h3 className="addtaskbrand">Add Task</h3>
          <form>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Title</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  placeholder="Task Title"
                  onChange={handleInputChange}
                  className="form-control"
                  id="inputEmail3"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Description</label>
              <div className="col-sm-10">
                <textarea
                  type="text"
                  name="description"
                  value={newTask.description}
                  placeholder="Task Description"
                  onChange={handleInputChange}
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <br />
            <button
              type="button"
              className="btn btn-light btn-lg"
              onClick={AddTask}
            >
              Add Task
            </button>
          </form>
        </div>

        <div className="list-container">
          <List
            tasks={tasks}
            onEdit={(index, task) => handleEdit(index, task)}
            onDelete={(index) => handleDelete(index)}
            toggleStatus={toggleStatus}
          />
        </div>
      </div>

      {isEditFormVisible && (
        <div>
          <h3>Edit Task</h3>
          <label>
            Title:
            <input
              type="text"
              name="title"
              defaultValue={editTask?.task?.title}
              onChange={handleEditInput}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              defaultValue={editTask?.task?.description}
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

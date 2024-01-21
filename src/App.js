import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import List from "./list";
import useTaskService from "./TaskService";
import EditTaskPage from "./editTaskPage";

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
    <Router>
      <div className="App">
        <h1 className="brand">Task Management App</h1>
        <div className="content-container">
          <div className="addtaskform">
            <h3 className="addtaskbrand">Add Task</h3>
            <form>
              <div className="row mb-3">
                <label className="form-label">Title</label>
                <div>
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
                <label className="form-label">Description</label>
                <div>
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

            <Routes>
              <Route
                path="/edit-task"
                element={
                  isEditFormVisible && (
                    <EditTaskPage
                      editTask={editTask}
                      saveEdit={(editedTask) => {
                        updateTask(editTask.index, editedTask);
                        setTasks(getAllTasks());
                        setEditTask(null);
                        setIsEditFormVisible(false);
                      }}
                      cancelEdit={() => {
                        setEditTask(null);
                        setIsEditFormVisible(false);
                      }}
                    />
                  )
                }
              />
            </Routes>

            {isConfirmationVisible && (
              <div>
                <p>Are you sure you want to delete this task..?</p>
                <button onClick={confirmDelete}>Yes</button>
                <button onClick={cancelDelete}>No</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

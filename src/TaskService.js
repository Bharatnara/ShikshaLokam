import { useState } from "react";

const useTaskService = () => {
  const [tasks, setTasks] = useState([]);

  const getAllTasks = () => {
    return tasks;
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (index, updatedTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index] = updatedTask;
      return updatedTasks;
    });
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
};

  return {
    getAllTasks,
    addTask,
    updateTask,
    deleteTask,
  };
};

export default useTaskService;
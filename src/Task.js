import React, { useState } from "react";

const Task = ({
  title,
  description,
  status,
  onEdit,
  onDelete,
  toggleStatus,
}) => {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsConfirmationVisible(true);
  };

  const confirmDelete = () => {
    onDelete();
    setIsConfirmationVisible(false);
  };

  const cancelDelete = () => {
    setIsConfirmationVisible(false);
  };

  const handleToggleStatus = (e) => {
    e.stopPropagation();
    toggleStatus();
  };

  return (
    <div onClick={onEdit} className={status ? 'completed-task' : ''}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Status: {status ? "Completed" : "Pending"}</p>
      <input
        type="checkbox"
        checked={status}
        onChange={handleToggleStatus}
        style={{ marginRight: "5px" }}
      />
      Mark as Completed
      <button onClick={handleDeleteClick}>Delete</button>
      {isConfirmationVisible && (
        <div>
          <p>Are you sure you want to delete this task..?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </div>
  );
};

export default Task;

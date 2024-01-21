import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Task = ({
  title,
  description,
  status,
  onEdit,
  onDelete,
  toggleStatus,
  index,
}) => {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(index);
    setIsConfirmationVisible(true);
  };

  const handleToggleStatus = (e) => {
    e.stopPropagation();
    toggleStatus();
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(index);
    navigate("/edit-task"); // Use navigate to redirect
  };

  return (
    <div className="list-group p-3 m-1 border-1 bd-example m-1 border-0 task ">
      <a
        href="/"
        className="list-group-item list-group-item-action "
        aria-current="true"
      >
        <div className="d-flex w-100 justify-content-between ">
          <h5 className="mb-1">{title || "No Title"}</h5>
          <small>
            <button
              className="btn btn-sm btn-secondary me-2"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </small>
        </div>
        <p className="mb-1">{description}</p>
        <small>Status: {status ? "Completed" : "Pending"}</small>
        <li
          className="list-group-item"
          style={{
            backgroundColor: status ? "#63BC50" : "inherit",
            color: status ? "white" : "inherit",
          }}
        >
          <input
            className="form-check-input me-2"
            type="checkbox"
            checked={status}
            value=""
            id="firstCheckbox"
            onChange={handleToggleStatus}
          />
          <label className="form-check-label" htmlFor="firstCheckbox">
            Mark as completed
          </label>
        </li>
      </a>
    </div>
  );
};

export default Task;

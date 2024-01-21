import React, { useState } from "react";

const Task = ({
  title,
  description,
  status,
  onEdit,
  onDelete,
  toggleStatus,
  index
}) => {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

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
  };

  return (
    <div className="list-group p-3 m-1 border-1 bd-example m-1 border-0 task ">
      <a
        href="/"
        className="list-group-item list-group-item-action "
        aria-current="true"
      >
        <div className="d-flex w-100 justify-content-between ">
          <h5 className="mb-1">{title || 'No Title'}</h5>
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
        <li class="list-group-item">
          <input
            class="form-check-input me-2"
            type="checkbox"
            checked={status}
            value=""
            id="firstCheckbox"
            onChange={handleToggleStatus}
          />
          <label class="form-check-label" for="firstCheckbox">
            Mark as completed
          </label>
        </li>
      </a>
    </div>
  );
};

export default Task;

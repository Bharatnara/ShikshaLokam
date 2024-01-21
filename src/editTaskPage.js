import React, { useState } from "react";

const EditTaskPage = ({ editTask, saveEdit, cancelEdit }) => {
  const [editedTask, setEditedTask] = useState({
    title: editTask.task.title,
    description: editTask.task.description,
  });

  const handleEditInput = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="addtaskform">
      <h3>Edit Task</h3>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={editedTask.title}
          onChange={handleEditInput}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          type="text"
          name="description"
          value={editedTask.description}
          onChange={handleEditInput}
          className="form-control"
          rows="3"
        ></textarea>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between"  }}>
        <button
          type="button"
          onClick={() => saveEdit(editedTask, editTask.index)}
          className="btn btn-primary"
        >
          Save
        </button>
        <button
          type="button"
          onClick={cancelEdit}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTaskPage;

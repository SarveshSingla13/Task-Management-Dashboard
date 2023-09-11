import React from "react";
import "./Taskbar.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Taskbar = ({ onFormSubmit, editingTask, onUpdateTask }) => {
  const navigate = useNavigate();

  const [title, setTtile] = useState("");
  const [Description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("Not Completed");

  useEffect(() => {
    if (editingTask) {
      setTtile(editingTask.title || "");
      setDescription(editingTask.Description);
      setDueDate(editingTask.Date);
      setSelectedOption(editingTask.selectedOption);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      id: editingTask ? editingTask.id : null,
      title: title,
      Description: Description,
      Date: dueDate,
      selectedOption: selectedOption,
    };

    if (title === "" || Description === "" || Date === "") {
      alert("Please Enter All Details");
    } else {
      if (editingTask) {
        onUpdateTask(formData);
      
      } else {
        onFormSubmit(formData);
      }
      navigate("/list");
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="TaskBar">
      <h1>Task Manager</h1>
      <form>
        <div className="input-container">
          <label className="input-title">Add a Title: </label>
          <input
            placeholder="Enter a title for your task"
            type="text"
            value={title}
            onChange={(e) => setTtile(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label className="input-title">Add a Description: </label>
          <input
           placeholder="Enter a description for your task"
            type="text"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label className="input-title">Add a Due Date: </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={getCurrentDate()}
          />
        </div>
        {editingTask && (
          <div className="radio-btn">
            <label>
              <input
                type="radio"
                checked={selectedOption === "Completed"}
                onChange={handleOptionChange}
                name="options"
                value="Completed"
              />{" "}
              Completed
            </label>

            <label>
              <input
                type="radio"
                checked={selectedOption === "Not Completed"}
                onChange={handleOptionChange}
                name="options"
                value="Not Completed"
              />{" "}
              Not Completed
            </label>
          </div>
        )}
        <button className="btn" onClick={handleSubmit}>
          {editingTask ? "Edit a Task" : "Add a Task"}
        </button>
      </form>
    </div>
  );
};

export default Taskbar;

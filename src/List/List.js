import React from "react";
import "./List.css";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const List = ({ formEnteries, setFormEnteries, onDataReceived }) => {
  const navigate = useNavigate();

  formEnteries.length === 0 && navigate("/");

  const createTask = () => {
    navigate("/");
  };

  const handleDelete = (id) => {
    setFormEnteries(formEnteries.filter((entry) => entry.id !== id));
  };

  const handleEditClick = (formData) => {
    onDataReceived(formData);
    navigate("/");
  };

  return (
    <div className="list">
      <table>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formEnteries &&
            formEnteries.map((formData, index) => {
              return (
                <tr key={index}>
                  <td>{formData.id}</td>
                  <td>{formData.title}</td>
                  <td>{formData.Description}</td>
                  <td>{formData.Date}</td>
                  <td>{formData.selectedOption}</td>
                  <td className="table-btns">
                    <button
                      className="table-btn"
                      onClick={() => handleEditClick(formData, formData.id)}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="table-btn"
                      onClick={() => handleDelete(formData.id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <button className="list-btn" onClick={createTask}>
        Create a new Task
      </button>
    </div>
  );
};

export default List;

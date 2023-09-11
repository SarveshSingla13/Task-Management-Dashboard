import "./App.css";
import Taskbar from "./Taskbar/Taskbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./List/List";
import { useState } from "react";

function App() {
  const [formEnteries, setFormEnteries] = useState([]);

  const [editingTask, setEditingTask] = useState(null);

  const handleFormSubmit = (formData) => {
    const newEntry = {
      ...formData,
      id:
        formEnteries.length === 0
          ? 1
          : formEnteries[formEnteries.length - 1].id + 1,
    };

    setFormEnteries((prevEnteries) => [...prevEnteries, newEntry]);
  };

  const handleFormEdit = (taskToEdit, index) => {
    setEditingTask(taskToEdit);
  };

  const handleEdit = (editedtask) => {
    const updatedTasks = formEnteries.map((task) => {
      return task.id === editedtask.id ? editedtask : task;
    });
    setFormEnteries(updatedTasks);
    setEditingTask(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Taskbar
                onFormSubmit={handleFormSubmit}
                editingTask={editingTask}
                onUpdateTask={handleEdit}
              />
            }
          />
          <Route
            path="/list"
            element={
              <List
                formEnteries={formEnteries}
                setFormEnteries={setFormEnteries}
                onDataReceived={handleFormEdit}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

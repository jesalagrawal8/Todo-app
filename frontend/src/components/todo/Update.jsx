import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Update = ({ display, task, onUpdateSuccess }) => {
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (task) {
      setInputs({
        title: task.title || "",
        body: task.body || "",
      });
    }
  }, [task]);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async () => {
    if (!task || !task._id) {
      toast.error("Invalid task ID");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:1000/api/v2/updateTask/${task._id}`,
        inputs
      );
      toast.success(response.data.message);
      onUpdateSuccess();  // Notify parent to refresh the list
      display("none");
    } catch (error) {
      toast.error("Failed to update the task");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h3>Update Your Task</h3>
      <input
        type="text"
        className="todo-inputs my-4 w-100 p-3"
        value={inputs.title}
        name="title"
        onChange={change}
      />
      <textarea
        className="todo-inputs w-100 p-3"
        value={inputs.body}
        name="body"
        onChange={change}
      />
      <div>
        <button className="home-btn px-2 py-1 my-4" onClick={submit}>
          UPDATE
        </button>
        <button
          className="home-btn px-2 py-1 my-4 mx-3 btn-danger"
          onClick={() => display("none")}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;

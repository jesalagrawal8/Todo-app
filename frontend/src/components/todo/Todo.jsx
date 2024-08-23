import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import axios from "axios";

let id = sessionStorage.getItem("id");

const Todo = () => {
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });
  const [array, setArray] = useState([]);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async () => {
    if (inputs.title === "" || inputs.body === "") {
      toast.error("Title Or Body Can't Be Empty");
    } else {
      if (id) {
        try {
          const response = await axios.post(`${window.location.origin}/api/v2/addTask`, {
            title: inputs.title,
            body: inputs.body,
            id: id,
          });
          console.log(response);
          setInputs({ title: "", body: "" });
          toast.success("Your Task Is Added");
          fetchTasks();  // Fetch tasks again after adding a new one
        } catch (error) {
          toast.error("Failed to add task. Please try again.");
          console.error("Error adding task:", error);
        }
      } else {
        toast.error("User not found! Please sign up or log in.");
      }
    }
  };

  const del = async (cardId) => {
    if (id) {
      try {
        await axios.delete(`${window.location.origin}/api/v2/deleteTask/${cardId}`, {
          data: { id: id },
        });
        toast.success("Your Task Is Deleted");
        fetchTasks();  // Fetch tasks again after deleting one
      } catch (error) {
        toast.error("Failed to delete task. Please try again.");
        console.error("Error deleting task:", error);
      }
    } else {
      toast.error("Please SignUp First");
    }
  };

  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  const update = (task) => {
    setTaskToUpdate(task);
    dis("block");
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${window.location.origin}/api/v2/getTasks/${id}`);
      setArray(response.data.list);
    } catch (error) {
      toast.error("Failed to fetch tasks. Please try again.");
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    // Check if user ID is present in session storage when the component mounts
    id = sessionStorage.getItem("id");
    if (!id) {
      toast.error("User ID not found! Please sign up or log in.");
    } else {
      fetchTasks(); // Fetch tasks if the user ID is available
    }
  }, []);

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-lg-50 w-50 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={show}
              name="title"
              value={inputs.title}
              onChange={change}
            />
            <textarea
              id="textarea"
              type="text"
              placeholder="BODY"
              name="body"
              className="p-2 todo-inputs"
              value={inputs.body}
              onChange={change}
            />
          </div>
          <div className="w-50 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {array &&
                array.map((item) => (
                  <div
                    className="col-lg-3 col-11 mx-lg-5 mx-3 my-2"
                    key={item._id}
                  >
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delid={del}
                      display={dis}
                      updateTask={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {taskToUpdate && (
        <div className="todo-update" id="todo-update">
          <div className="container update">
            <Update display={dis} task={taskToUpdate} onUpdateSuccess={fetchTasks} />
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;

import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCards = ({ title, body, id, delid, display, updateTask }) => {
  const handleUpdateClick = () => {
    updateTask({ _id: id, title, body });
  };

  return (
    <div className="todo-card p-3 border rounded">
      <h5>{title}</h5>
      <p>{body}</p>
      <div className="d-flex justify-content-between">
        <button className="home-btn px-2 py-1 d-flex justify-content-center align-items-center card-icon-head " onClick={handleUpdateClick}>
        <GrDocumentUpdate className="card-icons" /> Update
        </button>
        <button className="home-btn px-2 py-1 d-flex justify-content-center align-items-center card-icon-head " onClick={() => delid(id)}>
        <AiFillDelete className="card-icons " /> Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCards;

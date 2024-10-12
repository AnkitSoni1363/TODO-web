import React from "react";
import notecontext from "../context/notes/notecontext";
import { useState, useContext } from "react";

export default function AddTodo() {
  const final = useContext(notecontext);
  const { addnote } = final;

  const [note, setNote] = useState({ todo: "", priority: "" });
  const handleclick = (e) => {
    e.preventDefault();
    addnote(note.todo, note.priority);
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <form className="w-50">
        <div className="mb-3">
          <label htmlFor="todo" className="form-label">
            <h3>
              <strong>Todo</strong>
            </h3>
          </label>
          <input
            type="text"
            className="form-control"
            id="todo"
            name="todo"
            value={note.todo}
            placeholder="Enter your task"
            aria-describedby="todoHelp"
            onChange={onchange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            <h3>
              <strong>Priority</strong>
            </h3>
          </label>
          <div className="mb-1">
            <input
              type="radio"
              id="high"
              name="priority"
              value="High"
              onChange={onchange}
              checked={note.priority === "High"}
            />
            <label className="mx-1 h5" htmlFor="high">
              {" "}
              High
            </label>
          </div>
          <div className="mb-1">
            <input
              type="radio"
              id="medium"
              name="priority"
              value="Medium"
              onChange={onchange}
              checked={note.priority === "Medium"}
            />
            <label className="mx-1 h5" htmlFor="medium">
              {" "}
              Medium
            </label>
          </div>
          <div className="mb-1">
            <input
              type="radio"
              id="low"
              name="priority"
              value="Low"
              onChange={onchange}
              checked={note.priority === "Low"}
            />
            <label className="mx-1 h5" htmlFor="low">
              {" "}
              Low
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleclick}
          disabled={
            note.todo.trim().length === 0 || note.priority.trim().length === 0
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
}

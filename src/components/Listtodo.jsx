import React, { useContext, useEffect } from "react";
import notecontext from "../context/notes/notecontext";
import { useNavigate } from "react-router-dom";

export default function Listtodo() {
  const navigate = useNavigate();
  const final = useContext(notecontext);
  const { notes, deletenote, getnotes } = final;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getnotes();
      // eslint-disable-next-line
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center mt-4"
      style={{ width: "100%" }}
    >
      <h3 className="w-50 text-start">
        <strong>Your Todo's</strong>
      </h3>
      {notes && notes.notes && notes.notes.length > 0 ? (
        notes.notes.map((note) => {
          return (
            <div
              className="card w-50 my-1"
              style={{
                backgroundColor:
                  note.priority === "High"
                    ? "#eaf5d5"
                    : note.priority === "Medium"
                    ? "#dcf7e2"
                    : "#d0e7f5",
              }}
              key={note._id}
            >
              <div
                className="card-header d-flex justify-content-between align-items-center"
                style={{ width: "100%" }}
              >
                <div>{note.priority}</div>
                <button
                  className="btn"
                  onClick={() => {
                    deletenote(note._id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </button>
              </div>

              <div className="card-body">
                <h5 className="card-title">{note.todo}</h5>
              </div>
            </div>
          );
        })
      ) : (
        <p>No todos found.</p>
      )}
    </div>
  );
}

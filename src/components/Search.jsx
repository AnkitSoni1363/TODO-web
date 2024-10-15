import React, { useState, useContext, useEffect } from "react";
import notecontext from "../context/notes/notecontext";
import Listtodo from "./Listtodo";

const Search = () => {
  const { searchnote, getnotes } = useContext(notecontext);
  const [notes, setNotes] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    getnotes().then((allNotes) => setNotes(allNotes));
  }, []);

  const onChange = (e) => {
    const { value } = e.target;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        if (value.trim() === "") {
          getnotes().then((allNotes) => setNotes(allNotes));
        } else {
          searchnote(value).then((searchResults) => setNotes(searchResults));
        }
      }, 500)
    );
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex flex-column align-items-center mt-5 w-75">
        <h3 className="align-self-start ml-5" style={{ marginLeft: "10.25vw" }}>
          <strong>Search</strong>
        </h3>
        <input
          type="text"
          className="form-control"
          id="todo"
          name="todo"
          placeholder="Enter your task"
          aria-describedby="todoHelp"
          onChange={onChange}
          style={{ width: "67%" }}
        />
      </div>
      <div className="mt-3 w-100">
        <Listtodo notes={notes} />
      </div>
    </div>
  );
};

export default Search;

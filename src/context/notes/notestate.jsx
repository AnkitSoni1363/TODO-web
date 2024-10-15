import notecontext from "./notecontext";
import { useState } from "react";

const Notesstate = (props) => {
  const host = process.env.REACT_APP_API_URL;
  const note = [];
  const [notes, setNotes] = useState(note);

  const getnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchtodos`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const responsejson = await response.json();
    console.log(responsejson);
    setNotes(responsejson);
  };

  const addnote = async (todo, priority) => {
    const response = await fetch(`${host}/api/notes/addtodo`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ todo, priority }),
    });
    const addresponsejson = await response.json();
    console.log(addresponsejson);
    console.log("adding a new note");
    setNotes([...notes.notes, addresponsejson]);
    getnotes();
  };

  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletetodo/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    console.log(response);
    const newnotes = notes.notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newnotes);
    getnotes();
  };

  const searchnote = async (text) => {
    const response = await fetch(`${host}/api/notes/search?text=${text}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const searchResponse = await response.json();
    console.log(searchResponse);

    if (response.ok) {
      // Wrap searchResponse in the same structure as the normal notes state
      setNotes({ notes: searchResponse }); // Consistent structure with getnotes
    } else {
      console.log("No todos found");
    }
  };

  return (
    <notecontext.Provider
      value={{ notes, setNotes, addnote, deletenote, getnotes, searchnote }}
    >
      {props.children}
    </notecontext.Provider>
  );
};

export default Notesstate;

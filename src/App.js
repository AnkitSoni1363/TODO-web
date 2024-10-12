import "./App.css";
import About from "./components/About";
import Addtodo from "./components/Addtodo";
import Home from "./components/Home";
import Listtodo from "./components/Listtodo";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notesstate from "./context/notes/notestate";
import First from "./components/First";

function App() {
  return (
    <>
      <Notesstate>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<First />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Listtodo" element={<Listtodo />} />
              <Route
                path="/addtodo"
                element={
                  <>
                    <Addtodo />
                    <Listtodo />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </Notesstate>
    </>
  );
}

export default App;

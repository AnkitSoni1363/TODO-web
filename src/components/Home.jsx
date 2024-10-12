import React from "react";
import AddTodo from "./Addtodo";
import Listtodo from "./Listtodo";

const Home = () => {
  return (
    <div className="mt-5">
      <AddTodo />
      <Listtodo />
    </div>
  );
};

export default Home;

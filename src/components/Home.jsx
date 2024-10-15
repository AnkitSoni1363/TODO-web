import React from "react";
import AddTodo from "./Addtodo";
import Listtodo from "./Listtodo";
import Search from "./Search";

const Home = () => {
  return (
    <div className="mt-5">
      <AddTodo />
      <Search />
      {/* <Listtodo /> */}
    </div>
  );
};

export default Home;

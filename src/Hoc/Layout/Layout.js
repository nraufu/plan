import React from "react";

import Navbar from "../../components/UI/Navbar/Navbar";
import "./Layout.css";

const Layout = (props) => {
  return (
    <div>
      <Navbar tasks={props.tasks} />
      <div className="container my-5 col-md-8 mx-auto">{props.children}</div>
    </div>
  );
};

export default Layout;

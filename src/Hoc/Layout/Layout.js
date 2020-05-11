import React from "react";

import Navbar from "../../components/UI/Navbar/Navbar";
import "./Layout.css";

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <div className="container my-5 md-4 col-md-7 mx-auto">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;

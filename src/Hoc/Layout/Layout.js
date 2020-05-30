import React from "react";

import "./Layout.css";

const Layout = (props) => {
  return (
    <div>
      <div className="container col-md-8 mx-auto">{props.children}</div>
    </div>
  );
};

export default Layout;

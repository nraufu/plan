import React from "react";

const Navbar = (props) => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          <span role="img" aria-label="emoji">
            📅
          </span>{" "}
          Plan It
        </a>
      </nav>
    </div>
  );
};

export default Navbar;

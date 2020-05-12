import React from "react";

const taskDone = (prop) => {
  const done = prop.tasks.filter((task) => task.done === true);
  return done.length;
};

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        <span role="img" aria-label="emoji">
          📅
        </span>{" "}
        Plan It
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-link nav-item active">
            <span className="badge badge-secondary">{taskDone(props)}</span>{" "}
            Done
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

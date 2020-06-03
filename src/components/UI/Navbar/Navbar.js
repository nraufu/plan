import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const taskCompleted = props.tasks.filter((task) => task.body.done === true)
    .length;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <a className="navbar-brand" href="/">
        <span role="img" aria-label="emoji">
          📅
        </span>{" "}
        Plan It
      </a>
      {props.isAuthenticated ? (
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
      ) : null}

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {props.isAuthenticated ? (
          <ul className="navbar-nav ml-auto">
            <Link className="nav-item nav-link active" to="#">
              <span className="badge badge-secondary">{taskCompleted}</span>{" "}
              Done
            </Link>
            <Link className="nav-item nav-link" to="/logout">
              Logout
            </Link>
          </ul>
        ) : (
          <ul className="navbar-nav ml-auto"></ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

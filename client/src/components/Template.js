import React from "react";
import { Link } from "react-router-dom";

const Template = ({ template, index }) => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        width: "100%",
      }}
    >
      <div className="card">
        <h5 className="card-header">Template {index + 1}</h5>
        <div className="card-body">
          <p className="card-text">Update your Email Template</p>
          <Link to={`/t/${template._id}`}>
            <button className="btn btn-primary">Update</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Template;

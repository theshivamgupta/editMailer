import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../Context";
import axios from "axios";
import Template from "./Template";
import { useHistory } from "react-router";

const TemplateList = () => {
  const [templates, setTemplates] = useState([]);
  const history = useHistory();
  const userObject = useContext(myContext);

  useEffect(() => {
    // console.log(userObject?.email);
    if (userObject.email) {
      axios
        .get(`http://localhost:4000/users/all/${userObject._id}`)
        .then((res) => {
          if (res.data) {
            // console.log("data", res.data.templates);
            setTemplates(res.data.templates);
          }
        });
    }
  }, [userObject]);

  return (
    <main style={{ margin: "auto", marginTop: "100px" }}>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => history.push("/new")}
      >
        Create New
      </button>
      {templates?.map((template, index) => (
        <div key={template._id} style={{ margin: "10px" }}>
          <Template template={template} index={index} />
        </div>
      ))}
    </main>
  );
};

export default TemplateList;

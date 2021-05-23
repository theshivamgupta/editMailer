import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import EmailEditor from "react-email-editor";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const Bar = styled.div`
  flex: 1;
  background-color: #61dafb;
  color: #000;
  padding: 30px;
  display: flex;
  max-height: 40px;
  h1 {
    flex: 1;
    font-size: 16px;
    text-align: left;
  }
  span {
    margin-top: -10px;
  }
  button {
    flex: 1;
    padding: 15px;
    padding-bottom: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: #000;
    color: #fff;
    border: 0px;
    padding: 10px;
    max-width: 150px;
    cursor: pointer;
    margin-top: -30px;
  }
  a {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    border: 0px;
    cursor: pointer;
    text-align: right;
    text-decoration: none;
    line-height: 160%;
  }
`;

const TemplateEdit = () => {
  const [template, setTemplate] = useState();
  const { templateId } = useParams();
  const emailEditorRef = useRef(null);
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/template/get/${templateId}`)
      .then((res) => {
        if (res.data) {
          setData(JSON.parse(res?.data?.htmlContent));
          setTemplate(res.data);
        }
      });
  }, [templateId]);

  const saveDesign = () => {
    emailEditorRef.current.editor.saveDesign((design) => {
      axios
        .post("http://localhost:4000/update/template", {
          id: templateId,
          htmlContent: JSON.stringify(design),
        })
        .then(function (response) {
          //   console.log(response);
        })
        .catch(function (error) {
          console.error(error);
        });
      //   history.push("/dashbaord");
    });
  };

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      alert("Look into your console!!");
      console.log(html);
    });
  };

  const onLoad = () => {
    emailEditorRef.current.editor.loadDesign(data);
  };

  return (
    <Container>
      <Bar>
        <h1>Email Editor</h1>

        <Link to={`/dashboard`}>
          <span>Dashboard</span>
        </Link>
        <button onClick={saveDesign}>Save Design</button>
        <button onClick={exportHtml}>Export HTML</button>
      </Bar>

      {data && (
        <EmailEditor
          ref={emailEditorRef}
          onLoad={onLoad}
          style={{ height: "95vh" }}
        />
      )}
    </Container>
  );
};

export default TemplateEdit;

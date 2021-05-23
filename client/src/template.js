import React, { useRef } from "react";
import EmailEditor from "react-email-editor";
import sample from "./sample.json";
function App() {
  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      console.log("exportHtml", html);
    });
  };

  const onLoad = () => {
    // you can load your template here;
    let templateJson = {};
    emailEditorRef.current.editor.loadDesign(sample);
  };

  return (
    <div>
      <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div>

      <EmailEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        style={{ height: "95vh" }}
      />
    </div>
  );
}

export default App;

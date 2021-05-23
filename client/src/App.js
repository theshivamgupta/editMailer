import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import CreateTemplate from "./components/CreateTemplate";
import ShopifyAuth from "./components/ShopifyAuth";
import TemplateEdit from "./components/TemplateEdit";
import TemplateList from "./components/TemplateList";
import { myContext } from "./Context";

function App() {
  const userObject = useContext(myContext);
  return (
    <>
      {userObject && (
        <button type="button" className="btn btn-danger">
          Logout
        </button>
      )}
      <Switch>
        <Route exact path="/" component={ShopifyAuth} />
        <Route exact path="/dashboard" component={TemplateList} />
        <Route exact path="/t/:templateId" component={TemplateEdit} />
        <Route exact path="/new" component={CreateTemplate} />
      </Switch>
    </>
  );
}

export default App;

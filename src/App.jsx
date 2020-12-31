import React from "react";
import { DataContextProvider } from "./component/DataContext/DataProvider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./component/Home";
import SpecificPage from "./component/Specific page/SpecificPage";

const App = () => {
  return (
    <>
      <>
        <DataContextProvider>
          <Router>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/specificPage/:id" exact component={SpecificPage} />
            </Switch>
          </Router>
        </DataContextProvider>
      </>
    </>
  );
};

export default App;

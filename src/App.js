import React from "react";
import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import SaleEntry from "./components/SaleEntry";
import SalesStatement from "./components/SalesStatement";

export default function App() {
  return (
    <Router>
      <div>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/salesEntry" component={SaleEntry} />
          <Route exact path="/salesStatement" component={SalesStatement} />
        </main>
      </div>
    </Router>
  );
}

import React from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import SaleEntry from "./components/SaleEntry";

export default function App() {
  return (
    <div>
      <Router>
        <Link to="/saleEntry">
          <button>Sale Entry </button>
        </Link>
        <div>
          <Route path="/saleEntry" component={SaleEntry} />
        </div>
      </Router>
    </div>
  );
}

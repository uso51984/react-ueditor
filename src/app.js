import React from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import ReactDOM from 'react-dom';
import Page1 from './components/page1.js'

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)


const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Page1</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Page1}/>
      <Route path="/about" component={About}/>
    </div>
  </Router>
)


ReactDOM.render(
  <BasicExample />,
    document.getElementById('container')
);

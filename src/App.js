import React from 'react'
import './index.css'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import MainDrawer from './Components/Organismsm/MainDrawer';

function App() {
  return (
    <div id="main">
      <Router>
        {/* <DrawerPrincipal /> */}
        <MainDrawer />
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Home from './home';
import Customer from './customer';
// All routes define here.
const App = ({ store }) => (<Provider store={store}>
  <Router>
    <Route exact path='/' component={Home} />
    <Route path='/customer' component={Customer} />
  </Router>
</Provider>);

App.propTypes = {
  store: PropTypes.object.isRequired,
};
export default App;

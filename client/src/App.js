import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ItemsList from './components/ItemsList';
import ItemModal from './components/ItemModal';
import Welcome from './components/Welcome'
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <Welcome />
            <ItemModal />
            <ItemsList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;

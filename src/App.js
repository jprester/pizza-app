import React from 'react';

import AppRouter from './router/AppRouter';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

import './App.css';

const App = (props) => {
  return (
    <div className="App">
      <Header />
      <AppRouter />
      <Footer />
    </div>
  );
};

export default App;

import React from 'react';
import HashtagGenerator from './components/HashtagGenerator';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <div className="App">
      <HashtagGenerator />
      <footer className="footer">
        <p>Made with ❤️ for couples everywhere</p>
      </footer>
    </div>
  );
}

export default App;

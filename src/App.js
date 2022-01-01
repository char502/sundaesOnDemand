import './App.css';
// import { useState } from 'react';
// import SummaryForm from './pages/summary/SummaryForm';
import Options from '../src/pages/entry/Options';

function App() {
  return (
    <div className='App'>
      <Options optionType={'scoops'} />
      <Options optionType={'toppings'} />
      {/* <SummaryForm /> */}
    </div>
  );
}

export default App;

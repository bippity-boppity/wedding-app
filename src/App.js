import './App.scss';
import Header from './Components/Header/Header.js'
import RSVPForm from './Components/RSVPForm/RSVPForm.js';

function App() {
  return (
    <>
      <Header />
      <div className='container py-5'>
        <RSVPForm />
      </div>
    </>
  );
}

export default App;

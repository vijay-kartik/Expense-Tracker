import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowForm from './components/ShowForm';
import ShowData from './components/ShowList';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/add" element = {<ShowForm/>} />
          <Route path="/" element = {<ShowData/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

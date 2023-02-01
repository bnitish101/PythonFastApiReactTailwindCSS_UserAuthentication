import './App.css';
import Forgot from './form/Forgot';
import Login from './form/Login';
import Register from './form/Register';

function App() {
  return (
    <div className="min-h-screen bg-yellow-400 flex justify-center items-center">
      <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
        {/* <Login/> */}
        {/* <Register/> */}
        <Forgot/>
      </div>
    </div>
  );
}

export default App;

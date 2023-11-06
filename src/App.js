import logo from './logo.svg';
import './App.scss';
import Uploader from "./components/uploader/Uploader";

function App() {
  return (
    <div className="App">
      <div id={"wrapper"}>
        <nav className="navbar bg-dark">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Zelifcam CSV Parser</span>
          </div>
        </nav>
      </div>
        <Uploader/>
    </div>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";
import Category from './components/Category'
import Pages from "./pages/Pages";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Category/>
        <Pages/>
      </BrowserRouter>
    </div>
  );
}

export default App;

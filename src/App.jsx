import './App.css'
import PetCard from "./components/PetCard/PetCard.jsx";
import CardStack from "./features/Cards/CardStack.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {

  return (
    <div className="app-layout">
        <Navbar/>
        <main className="main-content">
            <CardStack/>
        </main>
    </div>
  );
}

export default App

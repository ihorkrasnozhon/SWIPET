import CardStack from "../../features/Cards/CardStack.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import {useNavigate} from "react-router-dom";

function SwipesPage({ setUser }) {
    const navigate = useNavigate();

    return (
        <div className="swipes-page">
            <header className="swipes-page__header">
                <Navbar setUser={setUser} navigate={navigate}/>
            </header>

            <main className="swipes-page__content">
                <CardStack/>
            </main>
        </div>
    );
}

export default SwipesPage;

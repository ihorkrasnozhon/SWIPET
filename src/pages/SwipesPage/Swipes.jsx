import CardStack from "../../features/Cards/CardStack.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";

function SwipesPage() {
    return (
        <div className="swipes-page">
            <header className="swipes-page__header">
                <Navbar/>
            </header>

            <main className="swipes-page__content">
                <CardStack/>
            </main>
        </div>
    );
}

export default SwipesPage;

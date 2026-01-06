import CardStack from "../../features/Cards/CardStack.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import AddPetModal from "../../features/Modals/AddPet/AddPetModal.jsx";

function SwipesPage({ setUser }) {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshSignal, setRefreshSignal] = useState(0);

    const handlePetAdded = () => {
        setRefreshSignal(prev => prev + 1);
    }

    return (
        <div className="swipes-page">
            <header className="swipes-page__header">
                <Navbar
                    setUser={setUser}
                    navigate={navigate}
                    onAddPet={() => setIsModalOpen(true)}
                />
            </header>

            <main className="swipes-page__content">
                <CardStack key={refreshSignal}/>
            </main>

            <AddPetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onPetAdded = {handlePetAdded}
            />
        </div>
    );
}

export default SwipesPage;

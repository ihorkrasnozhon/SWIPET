import CardStack from "../../features/Cards/CardStack.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import AddPetModal from "../../features/Modals/AddPet/AddPetModal.jsx";

function SwipesPage({ setUser }) {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                <CardStack/>
            </main>

            <AddPetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

export default SwipesPage;

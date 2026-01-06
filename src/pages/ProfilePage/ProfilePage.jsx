import React, {useState, useEffect} from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import PetCard from "../../components/PetCard/PetCard.jsx";
import "./ProfilePage.css";
import AddPetModal from "../../features/Modals/AddPet/AddPetModal.jsx";

const ProfilePage = ({user, setUser}) => {
    const [myPets, setMyPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen]  = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/api/my-pets', {credentials: 'include'})
            .then(res => res.json())
            .then(data => {
                setMyPets(data);
                setLoading(false);
            })
            .catch(err => console.error("Error while fetching pets:", err));
    }, []);

    const handleDeletePet = async (id) => {
        if (!window.confirm("Are you sure you want to delete this pet?")) return;

        const responce = await fetch(`http://localhost:3001/api/pets/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if(responce.ok) {
            setMyPets(myPets.filter(pet => pet.id !== id));
        }
    };

    return (
        <div className="profile-page">
            <Navbar setUser={setUser} onAddPet={() => setIsModalOpen(true)}/>

            <div className="profile-content">
                <header className="profile-header">
                    <div className="profile-avatar">
                        {user?.fullName?.charAt(0).toUpperCase() || "👤"}
                    </div>
                    <h1>
                        {user?.fullName}
                    </h1>
                    <p className="profile-email">
                        {user?.email}
                    </p>
                    <button className="btn-edit">Edit Profile</button>
                </header>

                <hr className="profile-divider"/>

                <section className="my-pets-section">
                    <h2>My Pets:</h2>
                    {
                        loading ? (<p>Loading...</p>) : (
                            <div className="profile-pets-grid">
                                {myPets.length > 0 ? (
                                    myPets.map(pet => (
                                        // TODO do pets edit option
                                        <PetCard
                                            key={pet.id}
                                            id={pet.id}
                                            name={pet.name}
                                            age={pet.age}
                                            bio={pet.bio}
                                            image={pet.image}
                                            isProfile={true}
                                            onDelete={handleDeletePet}
                                        />
                                    ))
                                ) : (
                                    <p className="no-pets-text">No pets found...</p>
                                )}
                            </div>
                        )
                    }
                </section>
            </div>
            <AddPetModal
                isOpen={isModalOpen}
                onClose={()=> setIsModalOpen(false)}
            />
        </div>
    );
};

export default ProfilePage;

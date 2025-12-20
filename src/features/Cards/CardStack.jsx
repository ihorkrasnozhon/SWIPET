import React, {useState, useEffect} from "react";
import PetCard from "../../components/PetCard/PetCard.jsx";
import {fetchPets} from "../../services/api.js";
import {AnimatePresence} from "framer-motion";

const CardStack = () => {
    const [pets, setPets] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    console.log(currentIndex);


    useEffect(() => {
        let isMounted = true;

        fetchPets().then(data => {
            console.log("Данные прилетели:", data);
            const shuffled = data.sort(() => Math.random()-0.5);
            setPets(shuffled);
            setLoading(false);
        });

        return () => {isMounted=false;};

    }, []);

    if(loading) return <div>Loading...</div>;
    if(pets.length===0) return  <div>No more pets...</div>;

    const handleSwipe = (direction) => {
        if(!direction) return;

        const swipedPet = pets[currentIndex];

        if(swipedPet) {
            console.log(`You swiped ${direction} on ${pets[currentIndex].name}`);
        }

        setCurrentIndex((prev) => prev+1);
    }

    if (currentIndex >= pets.length) {
        return (
          <div className="no-more">
              <h2>No more pets</h2>
              <button onClick={() => setCurrentIndex(0)}>Reset</button>
          </div>
        );
    }

    return (
        <div className="card-stack" style={{position: 'relative', width: '320px', height: '480px'}}>
            <AnimatePresence mode="wait">
                    <PetCard
                        key={pets[currentIndex].id}
                        {...pets[currentIndex]}
                        onSwipe={handleSwipe}
                    />
            </AnimatePresence>

        </div>
    );
};

export default CardStack;
import React, {useState, useEffect} from "react";
import PetCard from "../../components/PetCard/PetCard.jsx";
import {fetchPets} from "../../services/api.js";
import {motion, AnimatePresence, useMotionValue, useTransform} from "framer-motion";
import "./CardStack.css";

const CardStack = () => {
    const [pets, setPets] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const x = useMotionValue(0);
    const opacitySad = useTransform(x, [-150, -50], [1,0]);
    const opacityHappy = useTransform(x, [50, 150], [0,1]);
    console.log(currentIndex);


    useEffect(() => {
        const controller = new AbortController();

        fetchPets(controller.signal).then(data => {
            console.log("Data received:", data);
            const shuffled = data.sort(() => Math.random()-0.5);
            setPets(shuffled);
            setLoading(false);
        })
            .catch(err => {
                if(err.name === 'AbortError') {
                    console.log("StrictMode cancelled the q");
                } else {
                    console.error("Loading err: ", err);
                    setLoading(false);
                }
            });

        return () => {controller.abort()};

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
        <div className="card-stack-container"
            // style={{position: 'relative', width: '320px', height: '480px'}}
        >
            <div className="card-placeholder">
                <motion.img src="/sadcat.png"
                            style={{opacity: opacitySad}}
                            className="reaction-emoji"
                />
            </div>
            <div className="card-placeholder">
                <motion.img src="/happycat.png"
                            style={{opacity: opacityHappy}}
                            className="reaction-emoji"
                />
            </div>
            <AnimatePresence mode="wait">
                <PetCard
                    key={pets[currentIndex].id}
                    dragX={x}
                    {...pets[currentIndex]}
                    onSwipe={handleSwipe}
                />
            </AnimatePresence>

        </div>
    );
};

export default CardStack;
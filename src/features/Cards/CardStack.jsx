import React, {useState, useEffect} from "react";
import PetCard from "../../components/PetCard/PetCard.jsx";
import {fetchPets} from "../../services/api.js";
import {motion, AnimatePresence, useMotionValue, useTransform} from "framer-motion";
import "./CardStack.css";

const CardStack = () => {
    const [pets, setPets] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const x = useMotionValue(0);
    const opacitySad = useTransform(x, [-150, -50, 0], [1,0,0]);
    const opacityHappy = useTransform(x, [0,50, 150], [0,0,1]);

    const opacityLoading = useMotionValue(0);


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

    if(loading) return (
        <div className="card-stack-container">
            <div className="card-placeholder">
                <motion.img src="/loadingcat.png"
                            style={{ width: "320px", height: "480px"}}
                            className="reaction-emoji"
                />
            </div>
        </div>);
    if(pets.length===0) return  <div>No more pets...</div>;

    const handleSwipe = (direction) => {
        if(!direction) return;
        setIsTransitioning(true);
        opacityLoading.set(1);

        const swipedPet = pets[currentIndex];

        if(swipedPet) {
            console.log(`You swiped ${direction} on ${pets[currentIndex].name}`);
        }

        setTimeout(() => {
            setCurrentIndex((prev) => prev+1);
            setIsTransitioning(false);
            setTimeout(()=>{
                opacityLoading.set(0);
            },400);
        }, 600);

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
        <div className="card-stack-container">
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
            <div className="card-placeholder">
                <motion.img src="/loadingcat.png"
                            style={{opacity: opacityLoading}}
                            className="reaction-emoji"
                />
            </div>

            <AnimatePresence mode="wait">
                {isTransitioning ? (
                    <motion.div
                        key="transition-loader"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="card-placeholder"
                    >
                        <img src="/loadingcat.png"/>
                    </motion.div>
                ) : (
                    <PetCard
                        key={pets[currentIndex].id}
                        dragX={x}
                        {...pets[currentIndex]}
                        onSwipe={handleSwipe}
                    />
                )}
            </AnimatePresence>

        </div>
    );
};

export default CardStack;
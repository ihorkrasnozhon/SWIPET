import React from 'react';
import {motion, scale, useMotionValue, useTransform} from 'framer-motion';
import "./PetCard.css"

const PetCard = ({name, age, bio, image, onSwipe}) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25,25]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (event, info) => {
        if(info.offset.x > 100) {
            onSwipe('right');
        } else if(info.offset.x < -100) {
            onSwipe('left');
        }
    };

    return (
        <motion.div
            className="pet-card"
            style={{x, rotate, opacity}}
            drag = "x"
            dragConstraints={{left: 0, right: 0}}
            onDragEnd={handleDragEnd}
            whileDrag={{scale:1.1}}
            whileTap={{scale: 1.05}}
            initial={{scale: 0.5, opacity:0}}
            animate={{scale:1, opacity:1}}
            exit={{ x: x.get() < 0 ? -500 : 500, opacity: 0 }}
        >
            <img src={image} alt={name}/>
            <div className="pet-info">
                <h2>{name}, {age} y.o.</h2>
                <p>{bio}</p>
            </div>
        </motion.div>
    );
};

export default PetCard;
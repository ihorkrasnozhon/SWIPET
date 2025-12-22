import React from 'react';
import {motion, scale, useMotionValue, useTransform} from 'framer-motion';
import "./PetCard.css";

const PetCard = ({name, age, bio, image, onSwipe, dragX}) => {
    const x = useMotionValue(0);
    const rotate = useTransform(dragX, [-400, 400], [-10,10]);
    const opacity = useTransform(dragX, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);

    const handleDragEnd = (event, info) => {
        if(info.offset.x > 700) {
            onSwipe('right');
        } else if(info.offset.x < -700) {
            onSwipe('left');
        }
    };

    return (
        <motion.div
            className="pet-card"
            style={{
                x: dragX,
                rotate,
                opacity,
            }}
            drag = "x"
            dragConstraints={{left: 0, right: 0}}
            onDragEnd={handleDragEnd}
            whileDrag={{scale:1.05}}
            whileTap={{scale: 1.05}}
            initial={{x:0,rotate: 0, scale: 0.5, opacity:0}}
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
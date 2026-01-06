import React from 'react';
import {motion, scale, useMotionValue, useTransform} from 'framer-motion';
import "./PetCard.css";

const PetCard = ({name, age, bio, image, onSwipe, dragX, isProfile, onDelete, onEdit, id}) => {
    const fallbackDragX = useMotionValue(0);
    const activeDragX = dragX || fallbackDragX;
    const rotate = useTransform(activeDragX, [-400, 400], [-10,10]);
    const opacity = useTransform(activeDragX, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);

    const handleDragEnd = (event, info) => {
        if(isProfile) return;
        if(info.offset.x > 700) {
            onSwipe('right');
        } else if(info.offset.x < -700) {
            onSwipe('left');
        }
    };

    return (
        <motion.div
            className={`pet-card ${isProfile ? 'profile-mode' : ''}`}
            style={!isProfile ? {
                x: activeDragX,
                rotate,
                opacity,
            } : {}}
            drag ={ isProfile ? false : "x"}
            dragConstraints={{left: 0, right: 0}}
            onDragEnd={handleDragEnd}
            whileDrag={{scale:1.05}}
            whileTap={{scale: 1.05}}
            initial={!isProfile ? {x:0,rotate: 0, scale: 0.5, opacity:0} : {opacity: 1}}
            animate={{scale:1, opacity:1}}
            exit={{ x: activeDragX.get() < 0 ? -500 : 500, opacity: 0 }}
        >
            <img src={image || 'https://via.placeholder.com/400x600?text=No+Photo+Available'} alt={name}/>
            <div className="pet-info">
                <h2>{name}, {age} y.o.</h2>
                <p>{bio}</p>

                {
                    isProfile && (
                        <div className="profile-controls">
                            <button onClick={() => onEdit()} className="btn-edit">Edit ✏️</button>
                            <button onClick={() => onDelete(id)} className="btn-delete">Delete 🗑️</button>
                        </div>
                    )
                }
            </div>
        </motion.div>
    );
};

export default PetCard;

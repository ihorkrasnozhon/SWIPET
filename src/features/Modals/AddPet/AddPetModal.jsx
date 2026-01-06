import React, { useState } from "react";
import {motion,  AnimatePresence} from 'framer-motion';
import "./AddPetModal.css";

const AddPetModal = ({isOpen, onClose, onPetAdded}) => {
    const [formData, setFormData] = useState({name: '', age: '', bio: '', image: ''});

    const handeSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/api/pets', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(formData)
        });

        if(response.ok) {
            alert("Pet succesfully added!");
            onPetAdded();
            onClose();
        }
    };

    if(!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="modal-overlay" onClick={onClose}>
                <motion.div
                    className="modal-content"
                    initial={{y: 50, opacity: 0}}
                    animate={{ y: 0, opacity: 1}}
                    exit={{y: 50, opacity: 1}}
                    onClick={e => e.stopPropagation()}
                >
                    <button className="modal-close" onClick={onClose}>X</button>
                    <h2>Add a new pet 🐾</h2>
                    <form onSubmit={handeSubmit}>
                        <input placeholder="Pet`s name" onChange={e => setFormData({...formData, name: e.target.value})} required />
                        <input placeholder="Age" type="number" onChange={e => setFormData({...formData, age: e.target.value})} required />
                        <textarea placeholder="Tell us something about your pet:" onChange={e => setFormData({...formData, bio: e.target.value})} />
                        <input placeholder="Image URL" onChange={e => setFormData({...formData, image: e.target.value})} />
                        {/*TODO change to drag&drop*/}
                        <button type="submit" className="auth-card__button">Create Post</button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AddPetModal;

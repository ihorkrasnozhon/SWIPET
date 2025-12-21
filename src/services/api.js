const API_URL = 'http://localhost:3001/api';

export const fetchPets = async (signal) => {
    try {
        const response = await fetch(`${API_URL}/pets`, {signal});

        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();
    } catch (error) {
        if(error.name === "AbortError") {
            throw error;
        }

        console.error("API error: ", error);
        return [];
    }
};
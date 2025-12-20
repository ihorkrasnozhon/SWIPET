const API_URL = 'http://localhost:3001/api';

export const fetchPets = async () => {
    try {
        const response = await fetch(`${API_URL}/pets`);

        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();
    } catch (error) {
        console.error("API error: ", error);
        return [];
    }
};
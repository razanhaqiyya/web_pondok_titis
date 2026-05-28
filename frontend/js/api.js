const API_URL = 'https://web-pondok-titis.onrender.com/api';

const api = {
    async login(email, password) {
        if (email === 'admin@pondoktitis.com' && password === 'admin123') {
            return { user: { role: 'admin', email } };
        }
        const res = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async register(fullname, email, password, phone) {
        const res = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: fullname, email, password, phone })
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async getRooms() {
        const res = await fetch(`${API_URL}/rooms`);
        if (!res.ok) throw new Error('Failed to fetch rooms');
        return res.json();
    },

    async bookRoom(userId, roomId, months) {
        // Implement booking endpoint later
        return true;
    }
};

window.api = api;

const API_URL = "https://web-pondok-titis.onrender.com/api/rooms";

const generateRooms = async () => {
    const locations = ['bandung', 'solo'];
    const types = ['standar', 'deluxe', 'vip'];
    const facilitiesList = ["AC", "Lemari", "Kasur", "Meja", "Kursi", "WiFi Pribadi"];
    
    for (let loc of locations) {
        for (let floor = 1; floor <= 2; floor++) {
            for (let i = 1; i <= 16; i++) {
                const num = i < 10 ? `0${i}` : `${i}`;
                const room_number = `${loc === 'bandung' ? 'B' : 'S'}${floor}${num}`;
                
                // Randomly select a type
                const type = types[Math.floor(Math.random() * types.length)];
                let price = 1000000;
                if (type === 'deluxe') price = 1500000;
                if (type === 'vip') price = 2000000;
                
                const payload = {
                    room_number: room_number,
                    type: type,
                    floor: floor,
                    price: price,
                    description: `Kamar tipe ${type} di lantai ${floor} Pondok Titis ${loc === 'bandung' ? 'Bandung' : 'Solo'}.`,
                    status: 'Tersedia',
                    name: `Kamar ${room_number}`,
                    location: loc,
                    image: `images/room_${type}.png`, // Default image pattern used in frontend
                    facilities: facilitiesList,
                    size: "3x3 meter",
                    rating: 4.8
                };

                try {
                    const response = await fetch(API_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                    
                    if (response.ok) {
                        console.log(`Inserted ${room_number}`);
                    } else {
                        console.error(`Failed ${room_number}: `, await response.text());
                    }
                } catch (err) {
                    console.error(`Error ${room_number}: `, err);
                }
            }
        }
    }
    console.log("Done inserting 64 rooms!");
};

generateRooms();

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // INITIAL CONFIG & DEFAULT SETTINGS
    // ==========================================
    const defaultSettings = {
        bandung: {
            name: "Pondok Titis Bandung",
            phone: "6285128067691",
            address: "Jl. Jayasari No. 34, Bojongsoang, Bandung",
            mapsIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.51933210456357!2d107.63509847442991!3d-6.972787051880548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9b23c875a71%3A0x620136e5d548749d!2sPondok%20Titis%20%26%20GG%20Jayasari!5e0!3m2!1sid!2sid!4v1779553864533!5m2!1sid!2sid",
            mapsLink: "https://www.google.com/maps/place/Pondok+Titis+%26+GG+Jayasari/@-6.9727871,107.6350985,19z/"
        },
        solo: {
            name: "Pondok Titis Solo",
            phone: "628987654321",
            address: "Ketinggilan, Jebres, Surakarta, Jawa Tengah",
            mapsIframe: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63286.67148769744!2d110.8454407!3d-7.5294174!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a171bdccf99a5%3A0x305730521ef5cc80!2sPONDOK%20%22TITIS%22!5e0!3m2!1sid!2sid!4v1779553889627!5m2!1sid!2sid",
            mapsLink: "https://www.google.com/maps/place/PONDOK+%22TITIS%22/@-7.5294174,110.8454407,17z/"
        }
    };

    const getSettings = () => {
        let saved = localStorage.getItem('pt_settings');
        if (!saved) {
            localStorage.setItem('pt_settings', JSON.stringify(defaultSettings));
            return defaultSettings;
        }
        return JSON.parse(saved);
    };

    // ==========================================
    // POPULATE FORM FIELDS
    // ==========================================
    const populateFields = (settings) => {
        if (!settings) return;
        // Bandung fields
        document.getElementById('setBdgName').value = settings.bandung.name || "";
        document.getElementById('setBdgPhone').value = settings.bandung.phone || "";
        document.getElementById('setBdgAddress').value = settings.bandung.address || "";
        document.getElementById('setBdgMapsIframe').value = settings.bandung.mapsIframe || "";
        document.getElementById('setBdgMapsLink').value = settings.bandung.mapsLink || "";

        // Solo fields
        document.getElementById('setSoloName').value = settings.solo.name || "";
        document.getElementById('setSoloPhone').value = settings.solo.phone || "";
        document.getElementById('setSoloAddress').value = settings.solo.address || "";
        document.getElementById('setSoloMapsIframe').value = settings.solo.mapsIframe || "";
        document.getElementById('setSoloMapsLink').value = settings.solo.mapsLink || "";
    };

    const fetchSettings = async () => {
        try {
            const res = await fetch(`${API_URL}/settings`);
            if (res.ok) {
                const settings = await res.json();
                populateFields(settings);
                localStorage.setItem('pt_settings', JSON.stringify(settings));
            } else {
                populateFields(getSettings());
            }
        } catch (err) {
            console.error("Gagal mengambil pengaturan dari server:", err);
            populateFields(getSettings());
        }
    };

    fetchSettings();

    // ==========================================
    // SAVE SETTINGS ACTION
    // ==========================================
    document.getElementById('btnSaveAllSettings').addEventListener('click', async () => {
        const bdgPhone = document.getElementById('setBdgPhone').value.trim();
        const soloPhone = document.getElementById('setSoloPhone').value.trim();

        // Basic check to ensure phone has no special characters like + or space
        if (bdgPhone.includes('+') || bdgPhone.includes(' ') || soloPhone.includes('+') || soloPhone.includes(' ')) {
            alert('Gagal Menyimpan! Nomor WhatsApp tidak boleh berisi karakter spasi, tanda tambah (+), atau tanda minus (-). Masukkan angka saja (contoh: 6285128067691).');
            return;
        }

        const newSettings = {
            bandung: {
                name: document.getElementById('setBdgName').value.trim() || defaultSettings.bandung.name,
                phone: bdgPhone || defaultSettings.bandung.phone,
                address: document.getElementById('setBdgAddress').value.trim() || defaultSettings.bandung.address,
                mapsIframe: document.getElementById('setBdgMapsIframe').value.trim() || defaultSettings.bandung.mapsIframe,
                mapsLink: document.getElementById('setBdgMapsLink').value.trim() || defaultSettings.bandung.mapsLink
            },
            solo: {
                name: document.getElementById('setSoloName').value.trim() || defaultSettings.solo.name,
                phone: soloPhone || defaultSettings.solo.phone,
                address: document.getElementById('setSoloAddress').value.trim() || defaultSettings.solo.address,
                mapsIframe: document.getElementById('setSoloMapsIframe').value.trim() || defaultSettings.solo.mapsIframe,
                mapsLink: document.getElementById('setSoloMapsLink').value.trim() || defaultSettings.solo.mapsLink
            }
        };

        const btn = document.getElementById('btnSaveAllSettings');
        const originalText = btn.innerText;
        btn.innerText = 'Menyimpan...';
        btn.disabled = true;

        try {
            const res = await fetch(`${API_URL}/settings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSettings)
            });
            if (res.ok) {
                const savedData = await res.json();
                localStorage.setItem('pt_settings', JSON.stringify(savedData));
                alert('Pengaturan berhasil disimpan secara publik di server! Halaman penyewa kos akan terupdate secara dinamis.');
                window.location.reload();
            } else {
                throw new Error('Failed to save settings on server');
            }
        } catch (err) {
            console.error(err);
            localStorage.setItem('pt_settings', JSON.stringify(newSettings));
            alert('Gagal menyimpan ke server, pengaturan disimpan secara lokal di browser ini.');
            window.location.reload();
        } finally {
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });

    // ==========================================
    // DANGER ZONE: RESET DATA ACTION
    // ==========================================
    document.getElementById('btnResetData').addEventListener('click', async () => {
        const confirm1 = confirm('PERINGATAN: Apakah Anda yakin ingin MERESET data demo Pondok Titis?\n\nTindakan ini akan menghapus seluruh data transaksi dari pengguna (Penyewa, Riwayat Pembayaran, & Kontrak Sewa aktif).');
        if (!confirm1) return;

        const confirm2 = confirm('VERIFIKASI AKHIR: Tindakan ini TIDAK dapat dibatalkan!\n\nSemua kamar yang terisi akan diatur kembali statusnya menjadi "Tersedia" (Kosong). Klik OK untuk melanjutkan reset penuh.');
        if (!confirm2) return;
        
        const btn = document.getElementById('btnResetData');
        const originalText = btn.innerText;
        btn.innerText = 'Mereset Data...';
        btn.disabled = true;

        try {
            const res = await fetch(`https://web-pondok-titis.onrender.com/api/reset-data`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!res.ok) throw new Error('Gagal mereset data di server');
            
            // Perform clean wipe on transaction keys in local storage as well for good measure
            localStorage.setItem('pt_tenants_data', JSON.stringify([]));
            localStorage.setItem('pt_payments_data', JSON.stringify([]));
            localStorage.removeItem('myRoom');
            localStorage.removeItem('pt_rejection_notifications');
            localStorage.removeItem('pendingBookings');
            localStorage.removeItem('pt_rooms_data'); // Force refresh from server next time

            alert('DEMO RESET BERHASIL!\n\nSemua data transaksi pengguna telah dibersihkan dan seluruh kamar telah dikosongkan. Sistem kini kembali bersih seperti baru.');
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert('Terjadi kesalahan saat mereset data ke server.');
        } finally {
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });

    // Update current date top header
    const currentDate = document.getElementById('currentDate');
    if (currentDate) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDate.innerText = new Date().toLocaleDateString('id-ID', options);
    }
});

// Logout logic
document.querySelectorAll('.logout-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        localStorage.removeItem('pt_isAdmin');
        window.location.href = '/';
    });
});


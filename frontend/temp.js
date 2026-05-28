
        (function () {
            const darkMode = localStorage.getItem('pt_dark_mode');
            if (darkMode === 'enabled') {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        })();
    
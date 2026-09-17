document.querySelectorAll('.mobile-menu-toggle').forEach((button) => {
    const menu = document.getElementById(button.dataset.menu);
    if (!menu) return;

    button.addEventListener('click', () => {
        const container = menu.closest('header, aside') || menu;
        const isOpen = container.classList.toggle('mobile-menu-open');
        button.setAttribute('aria-expanded', String(isOpen));
        button.classList.toggle('is-open', isOpen);
    });

    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            const container = menu.closest('header, aside') || menu;
            container.classList.remove('mobile-menu-open');
            button.classList.remove('is-open');
            button.setAttribute('aria-expanded', 'false');
        });
    });
});

// Theme toggle
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sne-vault-theme', theme);
    document.querySelectorAll('[data-theme-toggle]').forEach(function(btn) {
        var icon = btn.querySelector('i');
        if (icon) icon.className = theme === 'dark' ? 'bi bi-moon-stars' : 'bi bi-sun';
        var label = btn.querySelector('.theme-label');
        if (label) label.textContent = theme === 'dark' ? 'Dark' : 'Light';
    });
    var settingsToggle = document.getElementById('dark-mode-toggle');
    if (settingsToggle) settingsToggle.checked = theme === 'dark';
}

var savedTheme = localStorage.getItem('sne-vault-theme');
applyTheme(savedTheme || 'dark');

document.querySelectorAll('[data-theme-toggle]').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
});

// for the search bar in the main of my dashboard

const searchInput = document.getElementById("productSearch"); const suggestionsBox = document.getElementById("searchSuggestions");
const categories = [ "Facebook", "Instagram", "TikTok", "X / Twitter", "Google Voice", "Gmail", "Discord", "Threads", "VPN", "CODM", "Free Fire" ];

if (searchInput) {
    searchInput.addEventListener("input", function () { const query = this.value.trim().toLowerCase();
    suggestionsBox.innerHTML = "";

    if (query === "") {
        suggestionsBox.style.display = "none";
        return;
    }

    const matches = categories.filter(category =>
        category.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    matches.forEach(category => {
        const item = document.createElement("div");

        item.classList.add("suggestion-item");
        item.innerHTML = `<strong>${category}</strong>`;

        item.addEventListener("click", function () {
            searchInput.value = category;
            suggestionsBox.style.display = "none";

            // You can later connect this to your category pages
            console.log("Searching for:", category);
        });

        suggestionsBox.appendChild(item);
    });

    suggestionsBox.style.display = "block";
    });
}
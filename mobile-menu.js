const whatsappButton = document.querySelector('.whatsapp-float');
if (!whatsappButton) {
    const supportLink = document.createElement('a');
    supportLink.className = 'whatsapp-float';
    supportLink.href = 'https://wa.me/237652717609?text=Hello%20SNE%20VAULT%20support%2C%20I%20need%20help%20accessing%20an%20account%20I%20purchased.';
    supportLink.target = '_blank';
    supportLink.rel = 'noopener';
    supportLink.setAttribute('aria-label', 'Contact WhatsApp support');
    supportLink.innerHTML = '<span class="whatsapp-icon"><i class="bi bi-whatsapp" aria-hidden="true"></i></span><span class="whatsapp-label">WhatsApp</span>';
    document.body.appendChild(supportLink);
}

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

const profileMenuButton = document.querySelector('.profile-menu-button');
const profileMenu = document.querySelector('.profile-menu');
const passwordSubmenu = document.getElementById('password-submenu');
const passwordToggle = document.querySelector('[data-action="password"]');

if (profileMenuButton && profileMenu) {
    profileMenuButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = profileMenu.classList.toggle('open');
        profileMenuButton.setAttribute('aria-expanded', String(isOpen));
    });

    if (passwordToggle && passwordSubmenu) {
        passwordToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            passwordSubmenu.classList.toggle('open');
        });
    }

    document.addEventListener('click', (event) => {
        const menuWrap = profileMenuButton.closest('.profile-menu-wrap');
        if (menuWrap && !menuWrap.contains(event.target)) {
            profileMenu.classList.remove('open');
            passwordSubmenu && passwordSubmenu.classList.remove('open');
            profileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
}


// for the search bar in the main of my dashboard

const searchInput = document.getElementById("productSearch"); const suggestionsBox = document.getElementById("searchSuggestions");
const categories = [ "Facebook", "Instagram", "TikTok", "X / Twitter", "Google Voice", "Gmail", "Discord", "Threads", "VPN", "CODM", "Free Fire" ];
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
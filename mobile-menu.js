document.querySelectorAll('.mobile-menu-toggle').forEach((button) => {
    button.addEventListener('click', () => {
        const menu = document.getElementById(button.dataset.menu);
        const container = menu.closest('header, aside') || menu;
        const isOpen = container.classList.toggle('mobile-menu-open');
        button.setAttribute('aria-expanded', String(isOpen));
        button.classList.toggle('is-open', isOpen);
    });

    const menu = document.getElementById(button.dataset.menu);
    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            const container = menu.closest('header, aside') || menu;
            container.classList.remove('mobile-menu-open');
            button.classList.remove('is-open');
            button.setAttribute('aria-expanded', 'false');
        });
    });
});

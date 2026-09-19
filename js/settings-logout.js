import { supabase } from './supabase.js';

const logoutButton = document.getElementById('settings-logout-button');

logoutButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const { error } = await supabase.auth.signOut();

    if (error) {
        alert('Logout failed: ' + error.message);
        return;
    }

    window.location.href = 'index.html';
});
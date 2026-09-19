import { supabase } from './supabase.js';

const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-password-confirm').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                username: username
            }
        }
    });

   if (error) {
    if (error.message.toLowerCase().includes('already registered')) {
        alert('This email is already registered. Please log in instead.');
    } else {
        alert(error.message);
    }

    return;
}

    console.log('Registration successful:', data);
    alert('Account created! Please check your email to confirm your account.');
});
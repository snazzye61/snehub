import { supabase } from './supabase.js';

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
    alert('Invalid email or password. Please check your credentials and try again.');
    return;
}

    const user = data.user;

    // Check if the user already has a profile
    const { data: existingProfile, error: profileCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

    // Stop if we cannot check the profile
    if (profileCheckError) {
        console.error('Profile check error:', profileCheckError);
        alert('Login successful, but we could not check your profile.');
        return;
    }

    // Create profile only if one does not exist
    if (!existingProfile) {
        const username = user.user_metadata?.username || email.split('@')[0];

        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                user_id: user.id,
                username: username
            });

        if (profileError) {
            console.error('Profile creation error:', profileError);
            alert('Login successful, but your profile could not be created.');
            return;
        }
    }

    console.log('Login successful:', data);
    window.location.href = 'dashboard.html';
});
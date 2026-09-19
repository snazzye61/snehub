import { supabase } from './supabase.js';

const { data: { user } } = await supabase.auth.getUser();

if (!user) {
    window.location.href = 'login.html';
} else {
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('username, full_name')
        .eq('user_id', user.id)
        .maybeSingle();

    if (error) {
        console.error('Profile loading error:', error);
    } else if (profile) {
        const profileName = document.getElementById('profile-name');
        const profileAvatar = document.getElementById('profile-avatar');

        const name = profile.full_name || profile.username || 'User';

        if (profileName) {
            profileName.textContent = name;
        }

        if (profileAvatar) {
            const initials = name
                .trim()
                .split(/\s+/)
                .map(word => word[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

            profileAvatar.textContent = initials;
        }
    }
}
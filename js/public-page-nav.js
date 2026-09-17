import { supabase } from './supabase.js';

const dashboardLink = document.querySelector('.dashboard-home-link');

const {
    data: { session }
} = await supabase.auth.getSession();

if (!session && dashboardLink) {
    dashboardLink.remove();
}
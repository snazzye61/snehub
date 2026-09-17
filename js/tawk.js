import { supabase } from './supabase.js';

const { data: { session } } = await supabase.auth.getSession();

if (session) {
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    (function () {
        var s1 = document.createElement('script');
        var s0 = document.getElementsByTagName('script')[0];

        s1.async = true;
        s1.src = 'https://embed.tawk.to/6aa9c08bd07e5e34429203c2/default';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');

        s0.parentNode.insertBefore(s1, s0);
    })();
}
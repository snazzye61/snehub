import { supabase } from './supabase.js';

const ordersList = document.getElementById('orders-list');

async function loadOrders() {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        ordersList.innerHTML = '<p>Please log in to view your orders.</p>';
        return;
    }

    const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Orders loading error:', error);
        ordersList.innerHTML = '<p>We could not load your orders.</p>';
        return;
    }

    if (!orders || orders.length === 0) {
        ordersList.innerHTML = '<p>You have no orders yet.</p>';
        return;
    }

    ordersList.innerHTML = '';

    orders.forEach(order => {
        const article = document.createElement('article');

        article.className = 'order-record';

        const orderDate = new Date(order.created_at).toLocaleDateString(
            'en-US',
            {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }
        );

        const total = Number(order.price) * Number(order.quantity);

        article.innerHTML = `
            <div class="order-record-heading">
                <div>
                    <span class="order-number">ORDER #${order.order_number}</span>
                    <h2>${order.product_name}</h2>
                </div>

                <span class="status ${order.status}">
                    ${order.status}
                </span>
            </div>

            <div class="order-record-meta">
                <span>
                    <i class="bi bi-calendar3" aria-hidden="true"></i>
                    ${orderDate}
                </span>

                <span>
                    <i class="bi bi-box-seam" aria-hidden="true"></i>
                    Quantity: ${order.quantity}
                </span>

                <strong>$${total.toFixed(2)}</strong>
            </div>

            <p>
                Order placed successfully. Your order is currently
                ${order.status}.
            </p>

            <div class="order-record-actions">
                <a
                    class="download-order-button"
                    href="contact.html"
                >
                    <i class="bi bi-file-earmark-arrow-down" aria-hidden="true"></i>
                    Download order as TXT
                </a>

                <a class="order-support-link" href="contact.html">
                    Need help?
                </a>
            </div>
        `;

        ordersList.appendChild(article);
    });
}

loadOrders();
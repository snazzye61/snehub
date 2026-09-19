import { supabase } from './supabase.js';

const productGrid = document.getElementById('facebook-aged-products');

async function loadProducts() {
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'facebook-aged')
        .eq('status', 'active');

    if (error) {
        console.error('Products loading error:', error);
        productGrid.innerHTML = '<p>We could not load products.</p>';
        return;
    }

    if (!products || products.length === 0) {
        productGrid.innerHTML = '<p>No products available.</p>';
        return;
    }

    productGrid.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('article');

        card.className = 'account-listing';

        const available = Number(product.stock) > 0;

        card.innerHTML = `
            <div class="listing-top">
                <span class="listing-icon facebook-listing-icon">FB</span>
                <span class="listing-status">
                    ${available ? 'Available' : 'Out of stock'}
                </span>
            </div>

            <h4>${product.name}</h4>

            <p>${product.description || ''}</p>

            <div class="listing-specs">
                <span><b>${product.stock}</b> Available</span>
                <span><b>${product.currency}</b> Currency</span>
                <span><b>${product.status}</b> Status</span>
            </div>

            <div class="listing-bottom">
                <strong>$${Number(product.price).toFixed(2)}</strong>

                <span class="listing-actions">
                    ${
                        available
                            ? `
                                <a class="buy-account-button" href="purchase.html?id=${product.id}">
                                    Buy now
                                </a>
                              `
                            : `
                                <span class="buy-account-button" aria-disabled="true">
                                    Out of stock
                                </span>
                              `
                    }

                    <a href="contact.html">
                        View details
                        <i class="bi bi-arrow-right" aria-hidden="true"></i>
                    </a>
                </span>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

loadProducts();
import { supabase } from './supabase.js';

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const productNameElement = document.getElementById('product-name');
const unitPriceElement = document.getElementById('unit-price');
const summaryUnitPrice = document.getElementById('summary-unit-price');
const summaryQuantity = document.getElementById('summary-quantity');
const totalPrice = document.getElementById('total-price');

const quantityInput = document.getElementById('quantity');
const decreaseButton = document.getElementById('decrease-quantity');
const increaseButton = document.getElementById('increase-quantity');

let currentPrice = 0;

async function loadProduct() {
    console.log('Product ID:', productId);

    if (!productId) {
        console.error('No product ID in URL.');
        alert('No product selected.');
        window.location.href = 'category.html';
        return;
    }

    const { data: product, error } = await supabase
        .from('products')
        .select('id, name, price, currency, stock, status')
        .eq('id', productId)
        .eq('status', 'active')
        .maybeSingle();

    if (error) {
        console.error('Product loading error:', error);
        alert('Product could not be loaded.');
        return;
    }

    if (!product) {
        console.error('No matching product found.');
        alert('Product could not be found.');
        return;
    }

    console.log('Selected product:', product);

    currentPrice = Number(product.price);

    productNameElement.textContent = product.name;
    unitPriceElement.textContent = currentPrice.toFixed(2);
    summaryUnitPrice.textContent = currentPrice.toFixed(2);

    updateTotal();
}

function updateTotal() {
    let quantity = Number(quantityInput.value);

    if (!Number.isFinite(quantity) || quantity < 1) {
        quantity = 1;
    }

    if (quantity > 20) {
        quantity = 20;
    }

    quantityInput.value = quantity;
    summaryQuantity.textContent = quantity;

    totalPrice.textContent = (currentPrice * quantity).toFixed(2);
}

decreaseButton.addEventListener('click', () => {
    const currentQuantity = Number(quantityInput.value) || 1;

    quantityInput.value = Math.max(1, currentQuantity - 1);

    updateTotal();
});

increaseButton.addEventListener('click', () => {
    const currentQuantity = Number(quantityInput.value) || 1;

    quantityInput.value = Math.min(20, currentQuantity + 1);

    updateTotal();
});

quantityInput.addEventListener('input', () => {
    if (quantityInput.value === '') {
        summaryQuantity.textContent = '0';
        totalPrice.textContent = '0.00';
        return;
    }

    updateTotal();
});

quantityInput.addEventListener('blur', updateTotal);

loadProduct();

const purchaseForm = document.getElementById('purchase-form');
const confirmation = document.getElementById('purchase-confirmation');

purchaseForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const quantity = Number(quantityInput.value);

    if (quantity < 1 || quantity > 20) {
        alert('Quantity must be between 1 and 20.');
        return;
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        alert('Please log in to continue.');
        window.location.href = 'login.html';
        return;
    }

    const { data: product, error: productError } = await supabase
        .from('products')
        .select('id, name, price, status')
        .eq('id', productId)
        .eq('status', 'active')
        .single();

    if (productError || !product) {
        alert('Product is no longer available.');
        return;
    }



    const { data: order, error: orderError } = await supabase
    .rpc('create_order', {
        p_product_id: product.id,
        p_quantity: quantity
    });
    if (orderError) {
        console.error('Order creation error:', orderError);
        alert('We could not create your order. Please try again.');
        return;
    }

    const total = Number(product.price) * quantity;

    confirmation.hidden = false;
    confirmation.textContent =
        `Order ${order.order_number} created successfully. ` +
        `Quantity: ${quantity}. Total: $${total.toFixed(2)}. ` +
        `Your order is pending payment confirmation.`;

    console.log('Created order:', order);
});
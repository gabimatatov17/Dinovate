function personalizeCard() {
    alert("Personalization page coming soon!");
}

function addAnotherCard() {
    alert("Another card added for personalization!");
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartTotal();
});

function updateCartTotal() {
    let total = 0;
    const cartItems = document.getElementsByClassName('cart-item');
    
    for (let i = 0; i < cartItems.length; i++) {
        const priceElement = cartItems[i].getElementsByClassName('cart-price')[0];
        const price = parseFloat(priceElement.innerText.replace('₪', ''));
        total += price;
    }

    total = Math.round(total * 100) / 100;
    document.getElementById('items-total').innerText = total.toFixed(2);
}

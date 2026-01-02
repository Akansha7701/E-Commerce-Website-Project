const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// ================= CART LOGIC =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart
function addToCart(product) {
    let existing = cart.find(
        item => item.name === product.name && item.image === product.image
    );

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
    showPopup("Item added to cart!");
}

// Attach cart button click
document.querySelectorAll(".cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        let productCard = btn.closest(".pro");

        let product = {
    name: productCard.querySelector("h5").innerText,
    price: parseInt(
        productCard.querySelector("h4").innerText.replace(/[^0-9]/g, "")
    ),
    image: productCard.querySelector("img").src,
    quantity: 1,
};


        addToCart(product);
    });
});

// Display cart
function updateCartDisplay() {
    let cartBody = document.getElementById("cart-body");
    if (!cartBody) return;

    cartBody.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        cartBody.innerHTML += `
            <tr>
                <td>
                    <button onclick="removeItem(${index})">
                        <i class="far fa-times-circle"></i>
                    </button>
                </td>
                <td><img src="${item.image}" width="50"></td>
                <td>${item.name}</td>
                <td>Rs. ${item.price}</td>
                <td>
                    <input type="number"
                           value="${item.quantity}"
                           min="1"
                           onchange="updateQuantity(${index}, this.value)">
                </td>
                <td>Rs. ${itemTotal}</td>
            </tr>
        `;
    });

    document.getElementById("cart-subtotal").innerText = `Rs. ${subtotal}`;
    document.getElementById("total").innerText = `Rs. ${subtotal}`;
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Update quantity
function updateQuantity(index, newQty) {
    cart[index].quantity = Math.max(1, parseInt(newQty));
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Popup
function showPopup(message) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerText = message;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 2000);
}

// Initial load
updateCartDisplay();

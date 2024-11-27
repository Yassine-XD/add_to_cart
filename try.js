let cart = [];
let cartCount = 0;
let cartTotal = 0;

// Gestion des clics sur le bouton Add to Cart
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const productName =
      this.closest(".product-card").querySelector("h2").textContent;
    const productPrice = parseFloat(this.dataset.price);

    // Transformer le bouton en interface de quantité
    createQuantityControls(this, productPrice, productName);
  });
});

function createQuantityControls(button, price, name) {
  // Remplacer le bouton par les contrôles de quantité
  button.outerHTML = `
        <div class="quantity-controls" data-price="${price}" data-name="${name}">
            <button class="minus">-</button>
            <span class="qty">1</span>
            <button class="plus">+</button>
        </div>
    `;

  const controls = document.querySelector(".quantity-controls");

  // Ajouter les événements pour les boutons + et -
  controls.querySelector(".plus").addEventListener("click", function () {
    let qtyElem = controls.querySelector(".qty");
    let qty = parseInt(qtyElem.textContent);
    qty++;
    qtyElem.textContent = qty;

    updateCart(name, price, qty);
  });

  controls.querySelector(".minus").addEventListener("click", function () {
    let qtyElem = controls.querySelector(".qty");
    let qty = parseInt(qtyElem.textContent);

    if (qty > 1) {
      qty--;
      qtyElem.textContent = qty;

      updateCart(name, price, qty);
    } else {
      console.log("remove the controls");
    }
  });

  // Ajouter le produit au panier avec quantité 1
  updateCart(name, price, 1);
}

// Ajouter au panier et mettre à jour le total
function updateCart(productName, productPrice, qty) {
  const existingProductIndex = cart.findIndex(
    (item) => item.name === productName
  );

  if (existingProductIndex !== -1) {
    // Si le produit existe déjà dans le panier, mettre à jour la quantité
    cart[existingProductIndex].quantity = qty;
  } else {
    // Ajouter un nouveau produit au panier
    cart.push({ name: productName, price: productPrice, quantity: qty });
  }

  // Recalculer le nombre total d'articles et le total du panier
  cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Mettre à jour l'affichage du panier
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  const cartCountElem = document.getElementById("cart-count");
  const cartTotalElem = document.getElementById("cart-total");

  // Vider la liste des articles dans le panier
  cartItems.innerHTML = "";

  // Ajouter les articles du panier
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.quantity}x ${item.name} - $${(
      item.price * item.quantity
    ).toFixed(2)}`;
    cartItems.appendChild(li);
  });

  // Mettre à jour le nombre d'articles et le total
  cartCountElem.textContent = cartCount;
  cartTotalElem.textContent = cartTotal.toFixed(2);
}
